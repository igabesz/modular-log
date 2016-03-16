import * as log from '../index';

log.createConsoleLogger({
	level: 'trace',
});

log.createFileLogger({
	filename: 'outfile.log',
	level: 'warn',
});

let cnt = 0;
let logger = log.createLogger('App');
logger.fatal('Testing', { cnt: cnt++ });
logger.error('Testing', { cnt: cnt++ });
logger.warn('Testing', { cnt: cnt++ });
logger.info('Testing', { cnt: cnt++ });
logger.debug('Testing', { cnt: cnt++ });
logger.trace('Testing', { cnt: cnt++ });

setTimeout(() => logger.fatal('Testing', { cnt: cnt++ }), 1000);

let logger2 = log.createLogger('Another');
logger2.warn('Another guy here');
