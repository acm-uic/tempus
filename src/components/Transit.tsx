import React, { PureComponent } from 'react';
import Bus from './Bus';
import Train from './Train';
import { GetPredictions } from '../util/CtaBus';
import { GetArrivals } from '../util/CtaTrain';
import { TransitConfig } from '../util/Config';
import { GetUserConfig } from '../util/UserConfig';
import * as CtaBusApi from '../models/CtaBusApi';
import * as CtaTrainApi from '../models/CtaTrainApi';

interface TransitState {
    Buses: CtaBusApi.Response | undefined;
    Trains: CtaTrainApi.Response | undefined;
};

class Transit extends PureComponent<{}, TransitState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            Buses: undefined,
            Trains: undefined
        };
    }

    componentDidMount() {
        this.update();
        setInterval(this.update, TransitConfig.UpdateInterval);
    }

    update = async () => {
        const stops = GetUserConfig({ name: TransitConfig.CtaBus.StopsName });
        const busApiKey = GetUserConfig({ name: TransitConfig.CtaBus.ApiKeyName });
        const stations = GetUserConfig({ name: TransitConfig.CtaTrain.StationsName });
        const trainApiKey = GetUserConfig({ name: TransitConfig.CtaTrain.ApiKeyName });

        if (stops && busApiKey && stations && trainApiKey) {
            this.setState({
                Buses: await GetPredictions({ stops, apiKey: busApiKey }),
                Trains: await GetArrivals({ stations, apiKey: trainApiKey })
            });
        } else {
            this.setState({ Buses: undefined, Trains: undefined });
        }
    }

    render = () => (
        <>
            {(this.state.Buses && this.state.Buses['bustime-response'].prd)
                ? this.state.Buses['bustime-response'].prd.map((bus, key) =>
                    <Bus key={key} arrival={new Date(`${bus.prdtm.slice(0, 4)}-${bus.prdtm.slice(4, 6)}-${bus.prdtm.slice(6)}`)} route={bus.rt} direction={bus.rtdir} />)
                : (<></>)}
            {(this.state.Trains && this.state.Trains.ctatt.eta)
                ? this.state.Trains.ctatt.eta.map((train, key) =>
                    <Train key={key} arrival={new Date(train.arrT)} route={train.rt} destination={train.destNm} />)
                : (<></>)}
        </>
    );
}

export default Transit;
