import * as Log from '../lib/index';


Log.setupConsoleLogger({ level: 'trace'});

let logger = Log.createLogger('TestApp');

logger.trace('Test Msg');
logger.debug('Test Msg');
logger.info('Test Msg');
logger.success('Test Msg');
logger.warn('Test Msg');
logger.error('Test Msg');
logger.fatal('Test Msg');
