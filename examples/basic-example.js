"use strict";
var Log = require('../lib/index');
// Create project level console log
Log.setupConsoleLogger({
    level: 'trace',
});
// Cretate project level file log
Log.setupFileLogger({
    filename: 'outfile.log',
    level: 'warn',
});
Log.setupSummarizer({
    level: 'warn',
    allowed: { fatal: 0 }
});
var cnt = 0; // Helper variable
// First logger object
var logger = Log.createLogger('App');
logger.error('Testing', { cnt: cnt++ });
logger.warn('Testing', { cnt: cnt++ });
logger.success('Testing', { cnt: cnt++ });
logger.info('Testing', { cnt: cnt++ });
logger.debug('Testing', { cnt: cnt++ });
logger.trace('Testing', { cnt: cnt++ });
logger.trace('canContinue', Log.canContinue());
// Preparing delayed log
setTimeout(function () {
    logger.fatal('Testing', { cnt: cnt++ });
    logger.warn('CanContinue', Log.canContinue());
}, 1000);
// Second logger object
var logger2 = Log.createLogger('Another');
logger2.warn('Another guy here');
var sum = Log.sumLog();
logger2.debug('Sum without this message', sum);
