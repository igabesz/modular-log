"use strict";
var log = require('../lib/index');
// Create project level console log
log.setupConsoleLogger({
    level: 'trace',
});
// Cretate project level file log
log.setupFileLogger({
    filename: 'outfile.log',
    level: 'warn',
});
log.setupSummarizer({
    level: 'warn',
    allowed: { fatal: 0 }
});
var cnt = 0; // Helper variable
// First logger object
var logger = log.createLogger('App');
logger.error('Testing', { cnt: cnt++ });
logger.warn('Testing', { cnt: cnt++ });
logger.info('Testing', { cnt: cnt++ });
logger.debug('Testing', { cnt: cnt++ });
logger.trace('Testing', { cnt: cnt++ });
logger.trace('canContinue', log.canContinue());
// Preparing delayed log
setTimeout(function () {
    logger.fatal('Testing', { cnt: cnt++ });
    logger.warn('CanContinue', log.canContinue());
}, 1000);
// Second logger object
var logger2 = log.createLogger('Another');
logger2.warn('Another guy here');
var sum = log.sumLog();
logger2.debug('Sum without this message', sum);
