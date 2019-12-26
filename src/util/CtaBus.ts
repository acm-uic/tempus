import { CtaBusConfig } from './Config';
import * as CtaBusApi from '../models/CtaBusApi';

interface GetPredictionsParams {
    routes: string;
    apiKey: string;
    position: Position;
};

export const GetPredictions = async ({ routes, apiKey }: GetPredictionsParams): Promise<CtaBusApi.Response | undefined> => {
    return new Promise((resolve, reject) => {
        fetch(`${CtaBusConfig.ApiHost}/bustime/api/v2/getpredictions?key=${apiKey}&stpid=${stops}&format=json`)
            .then(res => resolve(res.json()))
            .catch(reject);
    });
}
