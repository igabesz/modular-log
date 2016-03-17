"use strict";
var winston = require('winston');
var _ = require('lodash');
var moment = require('moment');
var colors = require('colors/safe');
var summarizer_1 = require('./summarizer');
exports.levels = { fatal: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 };
var levelColors = { fatal: 'bgRed', error: 'red', warn: 'yellow', info: 'cyan', debug: 'blue', trace: 'blue' };
function createRewriter(module) {
    return function (level, msg, meta) {
        meta.at = Date.now();
        meta.module = module;
        return meta;
    };
}
;
function createFormatter(useColors) {
    return function (options) {
        console.log(options);
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
var summarizer = null;
function setupConsoleLogger(options) {
    options.formatter = createFormatter(true);
    transports.push(new winston.transports.Console(options));
}
exports.setupConsoleLogger = setupConsoleLogger;
function setupFileLogger(options) {
    options.formatter = createFormatter();
    options.json = false;
    transports.push(new winston.transports.File(options));
}
exports.setupFileLogger = setupFileLogger;
function setupSummarizer(options) {
    summarizer = new summarizer_1.Summarizer(options || {});
    transports.push(summarizer);
}
exports.setupSummarizer = setupSummarizer;
function sumLog() { return summarizer ? summarizer.cnt : {}; }
exports.sumLog = sumLog;
function canContinue() { return summarizer ? summarizer.canContinue() : true; }
exports.canContinue = canContinue;
function tryContinue() { return summarizer && summarizer.tryContinue(); }
exports.tryContinue = tryContinue;
function createLogger(module) {
    return new winston.Logger({
        levels: exports.levels,
        transports: transports,
        rewriters: [createRewriter(module)],
    });
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map