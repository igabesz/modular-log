"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var winston = require('winston');
var Summarizer = (function (_super) {
    __extends(Summarizer, _super);
    function Summarizer(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.name = 'summarizer';
        this.level = options.level || 'warn';
        this.allowed = options.allowed || {};
        this.cnt = {};
    }
    Summarizer.prototype.log = function (level, msg, meta, callback) {
        if (!this.cnt[level]) {
            this.cnt[level] = 0;
        }
        this.cnt[level]++;
        callback(null, true);
    };
    Summarizer.prototype.canContinue = function () {
        for (var key in this.allowed) {
            if (this.allowed[key] >= 0 && this.allowed[key] < this.cnt[key])
                return false;
        }
        return true;
    };
    Summarizer.prototype.tryContinue = function () {
        if (!this.canContinue())
            throw new Error('Too many erroreous logs');
    };
    return Summarizer;
}(winston.Transport));
exports.Summarizer = Summarizer;
//# sourceMappingURL=summarizer.js.map