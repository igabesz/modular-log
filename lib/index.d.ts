import * as winston from 'winston';
export interface Logger extends winston.LoggerInstance {
    fatal(msg: string, meta?: any, callback?: () => void): Logger;
    error(msg: string, meta?: any, callback?: () => void): Logger;
    warn(msg: string, meta?: any, callback?: () => void): Logger;
    info(msg: string, meta?: any, callback?: () => void): Logger;
    debug(msg: string, meta?: any, callback?: () => void): Logger;
    trace(msg: string, meta?: any, callback?: () => void): Logger;
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
