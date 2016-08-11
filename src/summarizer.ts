///<reference path="../includes"/>
import * as winston from 'winston';


export interface SummarizerOptions {
	level?: string;
	allowed?: { [level: string]: number };
	[param: string]: any;
}

export class Summarizer {
	name = 'summarizer';
	level: string;
	allowed: { [level: string]: number };
	cnt: { [level: string]: number };
	transport: winston.Transport;

	constructor(options: SummarizerOptions) {
		this.transport = new (<any>winston).Transport(options);
		this.transport.log = (level, msg, meta, callback) => this.log(level, msg, meta, callback);
		this.level = options.level || 'warn';
		this.allowed = options.allowed || {};
		this.cnt = {};
	}

	private log(level, msg, meta, callback) {
		if (!this.cnt[level]) { this.cnt[level] = 0; }
		this.cnt[level]++;
		callback(null, true);
	}

	canContinue() {
		for (let key in this.allowed) {
			if (this.allowed[key] >= 0 && this.allowed[key] < this.cnt[key])
				return false;
		}
		return true;
	}

	tryContinue() {
		if (!this.canContinue()) throw new Error('Too many erroreous logs');
	}

}
