///<reference path="../includes"/>
import * as winston from 'winston';


export interface SummarizerOptions {
	level?: string;
	allowed?: { [level: string]: number };
	[param: string]: any;
}

export class Summarizer extends winston.Transport {
	name = 'summarizer';
	level: string;
	allowed: { [level: string]: number };
	cnt: { [level: string]: number };

	constructor(options: SummarizerOptions) {
		super(options);
		this.level = options.level || 'warn';
		this.allowed = options.allowed || {};
		this.cnt = {};
	}

	log(level, msg, meta, callback) {
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
