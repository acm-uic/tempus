import  { FC, useEffect, useState } from 'react';
import { GetForecast } from '../util/Weather';
import { DarkSkyConfig } from '../util/Config';
import * as DarkSkyApi from '../models/DarkSkyApi';
import { GetUserConfig } from '../util/UserConfig';

interface WeatherProps {
    position: GeolocationPosition | undefined;
}

const Weather: FC<WeatherProps> = ({ position }: WeatherProps) => {

    const [forecast, setForecast] = useState<DarkSkyApi.Response>();

    useEffect(() => {
        const update = async () => {
            const weatherLatLong = position ? `${position.coords.latitude},${position.coords.longitude}` : GetUserConfig({ name: DarkSkyConfig.LatLongName });
            const apiKey = GetUserConfig({ name: DarkSkyConfig.ApiKeyName });
            if (weatherLatLong && apiKey)
                setForecast(await GetForecast({ weatherLatLong, apiKey }));
        }
        update();
        const updateInterval = setInterval(update, DarkSkyConfig.UpdateInterval);
        return (() => {
            clearInterval(updateInterval);
        });
    }, [position]);

    if (forecast && forecast.currently) {
        const { summary, apparentTemperature } = forecast.currently;
        return (
            <>
                <h1>
                    {summary}
                </h1>
                <h2>
                    {Math.trunc(apparentTemperature)}°C {Math.trunc((apparentTemperature * 9 / 5) + 32)}°F
                </h2>
            </>
        )
    }
    else return (<></>);
}

export default Weather;
