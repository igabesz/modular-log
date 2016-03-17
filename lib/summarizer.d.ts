import * as winston from 'winston';
export interface SummarizerOptions {
    level?: string;
    allowed?: {
        [level: string]: number;
    };
    [param: string]: any;
}
export declare class Summarizer extends winston.Transport {
    name: string;
    level: string;
    allowed: {
        [level: string]: number;
    };
    cnt: {
        [level: string]: number;
    };
    constructor(options: SummarizerOptions);
    log(level: any, msg: any, meta: any, callback: any): void;
    canContinue(): boolean;
    tryContinue(): void;
}
