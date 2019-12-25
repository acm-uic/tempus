import React, { FC, useState, useEffect } from 'react';
import Bus from './Bus';
import Train from './Train';
import { GetPredictions } from '../util/CtaBus';
import { GetArrivals } from '../util/CtaTrain';
import { TransitConfig } from '../util/Config';
import { GetUserConfig } from '../util/UserConfig';
import * as CtaBusApi from '../models/CtaBusApi';
import * as CtaTrainApi from '../models/CtaTrainApi';

interface TransitProps {
    position: Position | undefined;
}

const Transit: FC<TransitProps> = () => {

    const [buses, setBuses] = useState<CtaBusApi.Response>();
    const [trains, setTrains] = useState<CtaTrainApi.Response>();

    useEffect(() => {
        update();
        const updateInterval = setInterval(update, TransitConfig.UpdateInterval);
        return (() => {
            clearInterval(updateInterval);
        });
    }, []);

    const update = async () => {
        const stops = GetUserConfig({ name: TransitConfig.CtaBus.StopsName });
        const busApiKey = GetUserConfig({ name: TransitConfig.CtaBus.ApiKeyName });
        const stations = GetUserConfig({ name: TransitConfig.CtaTrain.StationsName });
        const trainApiKey = GetUserConfig({ name: TransitConfig.CtaTrain.ApiKeyName });

        if (stops && busApiKey && stations && trainApiKey) {
            setBuses(await GetPredictions({ stops, apiKey: busApiKey }));
            setTrains(await GetArrivals({ stations, apiKey: trainApiKey }));
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
