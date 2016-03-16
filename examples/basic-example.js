"use strict";
var log = require('../index');
log.createConsoleLogger({
    level: 'trace',
});
log.createFileLogger({
    filename: 'outfile.log',
    level: 'warn',
});
var cnt = 0;
var logger = log.createLogger('App');
logger.fatal('Testing', { cnt: cnt++ });
logger.error('Testing', { cnt: cnt++ });
logger.warn('Testing', { cnt: cnt++ });
logger.info('Testing', { cnt: cnt++ });
logger.debug('Testing', { cnt: cnt++ });
logger.trace('Testing', { cnt: cnt++ });
setTimeout(function () { return logger.fatal('Testing', { cnt: cnt++ }); }, 1000);
var logger2 = log.createLogger('Another');
logger2.warn('Another guy here');
//# sourceMappingURL=basic-example.js.map