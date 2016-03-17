import * as winston from 'winston';
export interface SummarizerOptions {
    level?: string;
    allowed?: {
        [level: string]: number;
    };
    [index: string]: any;
}
export declare class Summarizer extends winston.Transport {
    name: string;
    level: string;
    allowed: {
        [level: string]: number;
    };
    cnt: {
        [index: string]: number;
    };
    constructor(options?: any);
    log(level: any, msg: any, meta: any, callback: any): void;
    canContinue(): boolean;
    tryContinue(): void;
}
