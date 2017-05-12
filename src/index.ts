import * as winston from 'winston';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as colors from 'colors/safe';
import { Summarizer, SummarizerOptions } from './summarizer';

/**
* Requiring `winston-mongodb` will expose
* `winston.transports.MongoDB`
*/
require('winston-mongodb').MongoDB;


//------------------------------------------------------------------------------
// Definitions

export type LogLevels = 'fatal' | 'error' | 'warn' | 'success' | 'info' | 'debug' | 'trace';
export const levels = { fatal: 0, error: 1, warn: 2, success: 3, info: 4, debug: 5, trace: 6 };

//------------------------------------------------------------------------------
// Internal helpers

const levelColors = { fatal: 'bgRed', error: 'red', warn: 'yellow', success: 'bgGreen', info: 'cyan', debug: 'blue', trace: 'blue' };

function createFormatter(useColors?: boolean) {
	return (options: any) => {
		//console.log(options);
		let atStr = moment(options.meta.at).format('YYYY-MM-DD HH:mm:ss');
		useColors && (atStr = colors.gray(atStr));
		let levelStr = options.level.toUpperCase();
		useColors && (levelStr = colors[levelColors[options.level]](levelStr));
		let pureMeta = _.omit(options.meta, ['at', 'module']);
		let dataStr = '';
		if (options.meta.params !== undefined) {
			dataStr = '\t' + JSON.stringify(options.meta.params);
			useColors && (dataStr = colors.gray(dataStr));
		}
		return `[${atStr}] ${levelStr} ${options.meta.module}: ${options.message}` + dataStr;
	};
}

//------------------------------------------------------------------------------
// Transport layers

let transports: winston.TransportInstance[] = [];
let summarizer: Summarizer = null;

export interface ConsoleLoggerOptions extends winston.ConsoleTransportOptions {
	level?: string;
	formatter?: Function;
}

export function setupConsoleLogger(options?: ConsoleLoggerOptions) {
	options = options || {};
	options.formatter = createFormatter(true);
	transports.push(new winston.transports.Console(options));
}

export interface FileLoggerOptions extends winston.FileTransportOptions {
	filename?: string;
	dirname?: string;
	stream?: any;
	tailable?: boolean;
	json?: boolean;
	formatter?: Function;
	level?: string;
}

export function setupFileLogger(options?: FileLoggerOptions) {
	options = options || {};
	options.formatter = createFormatter();
	options.json = false;
	transports.push(new winston.transports.File(options));
}

export interface MongoDBLoggerOptions extends winston.ConsoleTransportOptions {
	level?: string;
	// formatter?: Function;
	silent?: boolean;
	db: string;
	options?: any;
	collection?: string;
	storeHost?: boolean;
	username?: string;
	password?: string;
	label?: string;
	name?: string;
	capped?: boolean;
	cappedSize?: number;
	cappedMax?: number;
	tryReconnect?: boolean;
	decolorize?: boolean;
	expireAfterSeconds?: number;
}

export function setupMongoDBLogger(options?: MongoDBLoggerOptions) {
	if (!options.db) throw new Error('Parameter `db` is missing in options.');
	options.formatter = createFormatter();
	// @TODO: type definition for MongoDB transport is missing
	transports.push(new (<any>winston).transports.MongoDB(options));
}

export function setupSummarizer(options?: SummarizerOptions) {
	options = options || {};
	summarizer = new Summarizer(options);
	transports.push(<any>summarizer);
}

export function sumLog() { return summarizer ? summarizer.cnt : {}; }
export function canContinue() { return summarizer ? summarizer.canContinue() : true; }
export function tryContinue() { return summarizer && summarizer.tryContinue(); }

//------------------------------------------------------------------------------
// Logger instances

export function createLogger(module: string): Logger { return new LoggerImplementation(module); }

export interface Logger {
	module: string;
	fatal(msg: string, params?: any): Logger;
	error(msg: string, params?: any): Logger;
	warn(msg: string, params?: any): Logger;
	success(msg: string, params?: any): Logger;
	info(msg: string, params?: any): Logger;
	debug(msg: string, params?: any): Logger;
	trace(msg: string, params?: any): Logger;
	log(level: LogLevels, msg: string, params?: any): Logger;
}

class LoggerImplementation implements Logger {
	private logger: any;

	constructor(public module: string) {
		this.logger = new winston.Logger({
			levels,
			transports,
		});
	}

	private getMeta(params?: any) {
		return {
			at: Date.now(),
			module: this.module,
			params,
		};
	}

	fatal(msg: string, params?: any): Logger { this.logger.log('fatal', msg, this.getMeta(params)); return this; }
	error(msg: string, params?: any): Logger { this.logger.log('error', msg, this.getMeta(params)); return this; }
	warn(msg: string, params?: any): Logger { this.logger.log('warn', msg, this.getMeta(params)); return this; }
	success(msg: string, params?: any): Logger { this.logger.log('success', msg, this.getMeta(params)); return this; }
	info(msg: string, params?: any): Logger { this.logger.log('info', msg, this.getMeta(params)); return this; }
	debug(msg: string, params?: any): Logger { this.logger.log('debug', msg, this.getMeta(params)); return this; }
	trace(msg: string, params?: any): Logger { this.logger.log('trace', msg, this.getMeta(params)); return this; }
	log(level: LogLevels, msg: string, params?: any): Logger { this.logger.log(level, msg, this.getMeta(params)); return this; }
}
