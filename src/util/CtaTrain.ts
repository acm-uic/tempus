import { CtaTrainConfig } from './Config';
import * as CtaTrainApi from '../models/CtaTrainApi';

interface GetArrivalsParams {
    routes: string;
    apiKey: string;
    position: Position;
}

export const GetArrivals = async ({ routes, apiKey, position }: GetArrivalsParams): Promise<any> => {
    if (routes) {
        const { latitude, longitude } = position.coords;
        const routesRes = await (await fetch(`${CtaTrainConfig.ApiHost}/api/1.0/ttpositions.aspx?key=${apiKey}&rt=${routes}&outputType=JSON`)).json()
        routesRes
    }
}
