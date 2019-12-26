export interface CtaTrainPrediction {
    staId: string;
    stpId: string;
    staNm: string;
    stpDe: string;
    rn: string;
    rt: Routes;
    destSt: string;
    destNm: string;
    trDr: string;
    prdt: Date;
    arrT: Date;
    isApp: string;
    isSch: string;
    isDly: string;
    isFlt: string;
    flags: boolean;
    lat: string;
    lon: string;
    heading: string;
};

export interface Response {
    ctatt: {
        tmst: string;
        errCd: string;
        errNm: number;
        eta: CtaTrainPrediction[];
    }
};

export enum Routes {
    Red,
    Blue,
    Brown,
    Green,
    Orange,
    Purple,
    Pink,
    Yellow,
};
