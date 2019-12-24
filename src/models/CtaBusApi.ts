export interface Response {
    'bustime-response': {
        prd?: Prediction[];
        error?: Error[];
    }
}

export interface Prediction {
    tmstmp: string;
    typ: string;
    stpnm: string;
    stpid: string;
    vid: string;
    dstp: number;
    rt: string;
    rtdd: string;
    rtdir: string;
    des: string;
    prdtm: string;
    tablockid: string;
    tatripid: string;
    dly: boolean;
    prdctdn: string;
    zone: string;
}

export interface Error {
    stpid: string;
    msg: string;
}
