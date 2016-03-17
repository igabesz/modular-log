import * as winston from 'winston';
import { SummarizerOptions } from './summarizer';
import { LogLevels } from './definitions.d';
export { LogLevels } from './definitions.d';
export interface Logger extends winston.LoggerInstance {
    fatal(msg: string, meta?: any, callback?: () => void): Logger;
    error(msg: string, meta?: any, callback?: () => void): Logger;
    warn(msg: string, meta?: any, callback?: () => void): Logger;
    info(msg: string, meta?: any, callback?: () => void): Logger;
    debug(msg: string, meta?: any, callback?: () => void): Logger;
    trace(msg: string, meta?: any, callback?: () => void): Logger;
    log(level: LogLevels, msg: string, meta?: any, callback?: () => void): Logger;
}
export declare const levels: {
    fatal: number;
    error: number;
    warn: number;
    info: number;
    debug: number;
    trace: number;
};
export interface ConsoleLoggerOptions extends winston.ConsoleTransportOptions {
}
export declare function setupConsoleLogger(options?: ConsoleLoggerOptions): void;
export interface FileLoggerOptions extends winston.FileTransportOptions {
}
export declare function setupFileLogger(options?: FileLoggerOptions): void;
export declare function setupSummarizer(options?: SummarizerOptions): void;
export declare function sumLog(): {
    [level: string]: number;
};
export declare function canContinue(): boolean;
export declare function tryContinue(): void;
export declare function createLogger(module: string): Logger;
