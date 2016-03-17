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
        this.cnt = {};
        this.level = options.level || 'warn';
    }
    Summarizer.prototype.log = function (level, msg, meta, callback) {
        if (!this.cnt[level]) {
            this.cnt[level] = 0;
        }
        this.cnt[level]++;
        callback(null, true);
    };
    return Summarizer;
}(winston.Transport));
exports.Summarizer = Summarizer;
//# sourceMappingURL=summarizer.js.map