import * as winston from 'winston';


export class Summarizer extends winston.Transport {
	name = 'summarizer';
	level: string;
	cnt: { [index: string]: number } = {};

	constructor(options: any = {}) {
		super(options);
		this.level = options.level || 'warn';
	}

	log(level, msg, meta, callback) {
		if (!this.cnt[level]) { this.cnt[level] = 0; }
		this.cnt[level]++;
		callback(null, true);
	}
}
