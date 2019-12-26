import React, { FC, useState, useEffect } from 'react';
import { loadAsync as jszip_loadAsync } from 'jszip';
import Bus from './Bus';
import Train from './Train';
import { GetPredictions } from '../util/CtaBus';
import { GetArrivals } from '../util/CtaTrain';
import { TransitConfig } from '../util/Config';
import { GetUserConfig } from '../util/UserConfig';
import * as CtaBusApi from '../models/CtaBusApi';
import * as CtaTrainApi from '../models/CtaTrainApi';

interface TransitProps {
    position: Position;
}

const Transit: FC<TransitProps> = ({position}: TransitProps) => {

    const [buses, setBuses] = useState<CtaBusApi.Response>();
    const [trains, setTrains] = useState<CtaTrainApi.Response>();

    useEffect(() => {
        const file_url = `${TransitConfig.GTFSHost}/downloads/sch_data/google_transit.zip`;
        const download = async () => {
            const parseCsv = (data: string) => {
                const lines = data.split('\r\n');
                const schema = lines[0].split(',');
                return lines.splice(1).map(line =>
                    line.length === 0 ? undefined : line.split(',').reduce((res, field, index) => {
                        return { ...res, [schema[index]]: field.replace(/"/g, '') }
                    }, {}));
            };
            return new Promise((resolve, reject) => {
                fetch(file_url)
                    .then((response) => {
                        if (response.status === 200 || response.status === 0) {
                            return Promise.resolve(response.arrayBuffer());
                        } else {
                            return Promise.reject(new Error(response.statusText));
                        }
                    })
                    .then(jszip_loadAsync)
                    .then(async (zip) => {
                        return {
                            stops: parseCsv(await zip.file('stops.txt').async('text')),
                            routes: parseCsv(await zip.file('routes.txt').async('text'))
                        };
                    })
                    .then(resolve)
                    .catch(reject);
            });
        };

        download().then(console.log).catch(console.error);


        update();
        const updateInterval = setInterval(update, TransitConfig.UpdateInterval);
        return (() => {
            clearInterval(updateInterval);
        });
    }, []);

    const update = async () => {
        const busRoutes = GetUserConfig({ name: TransitConfig.CtaBus.Routes });
        const busApiKey = GetUserConfig({ name: TransitConfig.CtaBus.ApiKeyName });
        const trainRoutes = GetUserConfig({ name: TransitConfig.CtaTrain.Routes });
        const trainApiKey = GetUserConfig({ name: TransitConfig.CtaTrain.ApiKeyName });

        if (busRoutes && busApiKey && trainRoutes && trainApiKey) {
            setBuses(await GetPredictions({ routes: busRoutes, apiKey: busApiKey, position }));
            setTrains(await GetArrivals({ routes: trainRoutes, apiKey: trainApiKey, position }));
        }
    }

    return (
        <>
            {(buses && buses['bustime-response'].prd)
                ? buses['bustime-response'].prd.sort((b1, b2) => parseInt(b1.rt) - parseInt(b2.rt)).map((bus, key) =>
                    <Bus key={key} arrival={new Date(`${bus.prdtm.slice(0, 4)}-${bus.prdtm.slice(4, 6)}-${bus.prdtm.slice(6)}`)} route={bus.rt} direction={bus.rtdir} />)
                : (<></>)}
            {(trains && trains.ctatt.eta)
                ? trains.ctatt.eta.map((train, key) =>
                    <Train key={key} arrival={new Date(train.arrT)} route={train.rt} destination={train.destNm} />)
                : (<></>)}
        </>
    );
}

export default Transit;
