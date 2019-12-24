import { DarkSkyConfig } from './Config';
import * as DarkSkyApi from '../models/DarkSkyApi';

interface GetForecastParams {
    weatherLatLong: string;
    apiKey: string;
}

export const GetForecast = async ({ weatherLatLong, apiKey }: GetForecastParams): Promise<DarkSkyApi.Response | undefined> => {
    return new Promise((resolve, reject) => {
        fetch(`${DarkSkyConfig.ApiHost}/forecast/${apiKey}/${weatherLatLong}?exclude=minutely,hourly,daily,alerts,flags&units=si`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}
