import * as winston from 'winston';
export interface Logger extends winston.LoggerInstance {
    fatal(...params: any[]): void;
    trace(...params: any[]): void;
}
export declare const levels: {
    fatal: number;
    error: number;
    warn: number;
    info: number;
    debug: number;
    trace: number;
};
export declare function createConsoleLogger(options: any): void;
export declare function createFileLogger(options: any): void;
export declare function createLogger(module: string): Logger;
