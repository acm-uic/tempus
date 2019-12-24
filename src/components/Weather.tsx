import React, { PureComponent } from 'react';
import { GetForecast } from '../util/Weather';
import { DarkSkyConfig } from '../util/Config';
import * as DarkSkyApi from '../models/DarkSkyApi';
import { GetUserConfig } from '../util/UserConfig';

interface WeatherState {
    forecast: DarkSkyApi.Response | undefined;
}

class Weather extends PureComponent<{}, WeatherState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            forecast: undefined
        };
    }

    componentDidMount() {
        this.update();
        setInterval(this.update, DarkSkyConfig.UpdateInterval);
    }

    update = async () => {
        const weatherLatLong = GetUserConfig({ name: DarkSkyConfig.LatLongName });
        const apiKey = GetUserConfig({ name: DarkSkyConfig.ApiKeyName });
        if (weatherLatLong && apiKey)
            this.setState({
                forecast: await GetForecast({ weatherLatLong, apiKey }),
            });
    }


    render = () => {
        if (this.state.forecast && this.state.forecast.currently) {
            const { currently } = this.state.forecast;
            return (
                <>
                    <div>
                        {currently.summary} | {currently.apparentTemperature}°C | {(currently.apparentTemperature * 9 / 5) + 32}°F
                    </div>
                </>
            )
        }
        else return (<></>);
    };
}

export default Weather;
