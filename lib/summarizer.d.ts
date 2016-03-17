import * as winston from 'winston';
export declare class Summarizer extends winston.Transport {
    name: string;
    level: string;
    cnt: {
        [index: string]: number;
    };
    constructor(options?: any);
    log(level: any, msg: any, meta: any, callback: any): void;
}
