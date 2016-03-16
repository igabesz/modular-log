"use strict";
var log = require('../lib/index');
// Create project level console log
log.createConsoleLogger({
    level: 'trace',
});
// Cretate project level file log
log.createFileLogger({
    filename: 'outfile.log',
    level: 'warn',
});
var cnt = 0; // Helper variable
// First logger object
var logger = log.createLogger('App');
logger.fatal('Testing', { cnt: cnt++ });
logger.error('Testing', { cnt: cnt++ });
logger.warn('Testing', { cnt: cnt++ });
logger.info('Testing', { cnt: cnt++ });
logger.debug('Testing', { cnt: cnt++ });
logger.trace('Testing', { cnt: cnt++ });
// Preparing delayed log
setTimeout(function () { return logger.fatal('Testing', { cnt: cnt++ }); }, 1000);
// Second logger object
var logger2 = log.createLogger('Another');
logger2.warn('Another guy here');
