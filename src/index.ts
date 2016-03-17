import * as winston from 'winston';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as colors from 'colors/safe';
import { Summarizer, SummarizerOptions } from './summarizer';
import { LogLevels } from './definitions.d';

//------------------------------------------------------------------------------
// Definitions

export interface Logger extends winston.LoggerInstance {
	fatal(msg: string, meta?: any, callback?: () => void): Logger;
	error(msg: string, meta?: any, callback?: () => void): Logger;
	warn(msg: string, meta?: any, callback?: () => void): Logger;
	info(msg: string, meta?: any, callback?: () => void): Logger;
	debug(msg: string, meta?: any, callback?: () => void): Logger;
	trace(msg: string, meta?: any, callback?: () => void): Logger;
	log(level: LogLevels, msg: string, meta?: any, callback?: () => void): Logger;
}

export const levels = { fatal: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 };

//------------------------------------------------------------------------------
// Internal helpers

const levelColors = { fatal: 'bgRed', error: 'red', warn: 'yellow', info: 'cyan', debug: 'blue', trace: 'blue' };

function createRewriter(module: string) {
	return (level: string, msg: string, meta: any): any => {
		meta.at = Date.now();
		meta.module = module;
		return meta;
	};
};

function createFormatter(useColors?: boolean) {
	return (options: any) => {
		console.log(options);
		let atStr = moment(options.meta.at).format('YYYY-MM-DD hh:mm:ss');
		useColors && (atStr = colors.gray(atStr));
		let levelStr = options.level.toUpperCase();
		useColors && (levelStr = colors[levelColors[options.level]](levelStr));
		let pureMeta = _.omit(options.meta, ['at', 'module']);
		let dataStr = '';
		if (!_.isEmpty(pureMeta)) {
			dataStr = '\t' + JSON.stringify(pureMeta);
			useColors && (dataStr = colors.gray(dataStr));
		}
		return `[${atStr}] ${levelStr} ${options.meta.module}: ${options.message}` + dataStr;
	};
};

//------------------------------------------------------------------------------
// Transport layers

let transports: winston.TransportInstance[] = [];
let summarizer: Summarizer = null;

export function setupConsoleLogger(options: any) {
	options.formatter = createFormatter(true);
	transports.push(new winston.transports.Console(options));
}

export function setupFileLogger(options: any) {
	options.formatter = createFormatter();
	options.json = false;
	transports.push(new winston.transports.File(options));
}

export function setupSummarizer(options?: SummarizerOptions) {
	summarizer = new Summarizer(options || {});
	transports.push(summarizer);
}

export function sumLog() { return summarizer ? summarizer.cnt : {}; }
export function canContinue() { return summarizer ? summarizer.canContinue() : true; }
export function tryContinue() { return summarizer && summarizer.tryContinue(); }

//------------------------------------------------------------------------------
// Logger instances

export function createLogger(module: string): Logger {
	return <any>new winston.Logger(<any>{
		levels,
		transports,
		rewriters: [ createRewriter(module) ],
	});
}
