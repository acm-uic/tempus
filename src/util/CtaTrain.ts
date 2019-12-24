import { CtaTrainConfig } from './Config';
import * as CtaTrainApi from '../models/CtaTrainApi';
interface GetArrivalsParams {
    stations: string;
    apiKey: string;
}

export const GetArrivals = async ({ stations, apiKey }: GetArrivalsParams): Promise<CtaTrainApi.Response> => {
    return new Promise((resolve, reject) => {
        fetch(`${CtaTrainConfig.ApiHost}/api/1.0/ttarrivals.aspx?key=${apiKey}&mapid=${stations}&max=10&outputType=JSON`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}
