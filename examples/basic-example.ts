import * as log from '../lib/index';

// Create project level console log
log.createConsoleLogger({
	level: 'trace',
});

// Cretate project level file log
log.createFileLogger({
	filename: 'outfile.log',
	level: 'warn',
});

let cnt = 0; // Helper variable

// First logger object
let logger = log.createLogger('App');
logger.fatal('Testing', { cnt: cnt++ });
logger.error('Testing', { cnt: cnt++ });
logger.warn('Testing', { cnt: cnt++ });
logger.info('Testing', { cnt: cnt++ });
logger.debug('Testing', { cnt: cnt++ });
logger.trace('Testing', { cnt: cnt++ });

// Preparing delayed log
setTimeout(() => logger.fatal('Testing', { cnt: cnt++ }), 1000);

// Second logger object
let logger2 = log.createLogger('Another');
logger2.warn('Another guy here');
