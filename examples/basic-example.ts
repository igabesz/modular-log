import * as Log from '../lib/index';

// Create project level console log
Log.setupConsoleLogger({
	level: 'trace',
});

// Cretate project level file log
Log.setupFileLogger({
	filename: 'outfile.log',
	level: 'warn',
});

// Log.setupMongoDBLogger({
// 	level: 'warn',
// 	db: 'mongodb://localhost:27017/test',
// 	storeHost: true,
// 	// name: 'test'
// });

Log.setupSummarizer({
	level: 'warn',
	allowed: { fatal: 0 }
});

let cnt = 0; // Helper variable

// First logger object
let logger = Log.createLogger('App');
logger.error('Testing', { cnt: cnt++ });
logger.warn('Testing', { cnt: cnt++ });
logger.success('Testing', { cnt: cnt++ });
logger.info('Testing', { cnt: cnt++ });
logger.debug('Testing', [ cnt++, cnt++, cnt++]);
logger.trace('Testing', { cnt: cnt++ });
logger.trace('canContinue', Log.canContinue());

// Preparing delayed log
setTimeout(() => {
	logger.fatal('Testing', { cnt: cnt++ });
	logger.warn('CanContinue', Log.canContinue());
}, 1000);

// Second logger object
let logger2 = Log.createLogger('Another');
logger2.warn('Another guy here');
let sum = Log.sumLog();
logger2.debug('Sum without this message', sum);
