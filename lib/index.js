"use strict";
var winston = require('winston');
var _ = require('lodash');
var moment = require('moment');
var colors = require('colors/safe');
exports.levels = { fatal: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 };
var levelColors = { fatal: 'bgRed', error: 'red', warn: 'yellow', info: 'cyan', debug: 'blue', trace: 'blue' };
var createRewriter = function (module) {
    return function (level, msg, meta) {
        meta.at = Date.now();
        meta.module = module;
        return meta;
    };
};
function createFormatter(useColors) {
    return function (options) {
        var atStr = moment(options.meta.at).format('YYYY-MM-DD hh:mm:ss');
        useColors && (atStr = colors.gray(atStr));
        var levelStr = options.level.toUpperCase();
        useColors && (levelStr = colors[levelColors[options.level]](levelStr));
        var pureMeta = _.omit(options.meta, ['at', 'module']);
        var dataStr = '';
        if (!_.isEmpty(pureMeta)) {
            dataStr = '\t' + JSON.stringify(pureMeta);
            useColors && (dataStr = colors.gray(dataStr));
        }
        return ("[" + atStr + "] " + levelStr + " " + options.meta.module + ": " + options.message) + dataStr;
    };
}
;
var transports = [];
function createConsoleLogger(options) {
    options.formatter = createFormatter(true);
    transports.push(new winston.transports.Console(options));
}
exports.createConsoleLogger = createConsoleLogger;
function createFileLogger(options) {
    options.formatter = createFormatter();
    options.json = false;
    transports.push(new winston.transports.File(options));
}
exports.createFileLogger = createFileLogger;
function createLogger(module) {
    return new winston.Logger({
        levels: exports.levels,
        transports: transports,
        rewriters: [createRewriter(module)],
    });
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map