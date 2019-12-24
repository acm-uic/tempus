import { CtaBusConfig } from './Config';
import * as CtaBusApi from '../models/CtaBusApi';

interface GetPredictionsParams {
    stops: string;
    apiKey: string;
};

export const GetPredictions = async ({ stops, apiKey }: GetPredictionsParams): Promise<CtaBusApi.Response | undefined> => {
    return new Promise((resolve, reject) => {
        fetch(`${CtaBusConfig.ApiHost}/bustime/api/v2/getpredictions?key=${apiKey}&stpid=${stops}&format=json`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}
