"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Levels = exports.LogBackgroundColor = exports.LogForegroundColor = exports.LogType = void 0;
var LogType;
(function (LogType) {
    LogType["reset"] = "\u001B[0m";
    LogType["bright"] = "\u001B[1m";
    LogType["dim"] = "\u001B[2m";
    LogType["underscore"] = "\u001B[4m";
    LogType["blink"] = "\u001B[5m";
    LogType["reverse"] = "\u001B[7m";
    LogType["hidden"] = "\u001B[8m";
})(LogType = exports.LogType || (exports.LogType = {}));
var LogForegroundColor;
(function (LogForegroundColor) {
    LogForegroundColor["black"] = "\u001B[30m";
    LogForegroundColor["red"] = "\u001B[31m";
    LogForegroundColor["green"] = "\u001B[32m";
    LogForegroundColor["yellow"] = "\u001B[33m";
    LogForegroundColor["blue"] = "\u001B[34m";
    LogForegroundColor["magenta"] = "\u001B[35m";
    LogForegroundColor["cyan"] = "\u001B[36m";
    LogForegroundColor["white"] = "\u001B[37m";
    LogForegroundColor["crimson"] = "\u001B[38m";
    LogForegroundColor["orange"] = "\u001B[38;5;214m";
})(LogForegroundColor = exports.LogForegroundColor || (exports.LogForegroundColor = {}));
var LogBackgroundColor;
(function (LogBackgroundColor) {
    LogBackgroundColor["black"] = "\u001B[40m";
    LogBackgroundColor["red"] = "\u001B[41m";
    LogBackgroundColor["green"] = "\u001B[42m";
    LogBackgroundColor["yellow"] = "\u001B[43m";
    LogBackgroundColor["blue"] = "\u001B[44m";
    LogBackgroundColor["magenta"] = "\u001B[45m";
    LogBackgroundColor["cyan"] = "\u001B[46m";
    LogBackgroundColor["white"] = "\u001B[47m";
    LogBackgroundColor["crimson"] = "\u001B[48m";
    LogBackgroundColor["orange"] = "\u001B[48;5;214m";
})(LogBackgroundColor = exports.LogBackgroundColor || (exports.LogBackgroundColor = {}));
var Levels;
(function (Levels) {
    Levels["info"] = "info";
    Levels["error"] = "error";
    Levels["warning"] = "warning";
    Levels["debug"] = "debug";
    Levels["alert"] = "alert";
    Levels["critical"] = "critical";
    Levels["success"] = "success";
})(Levels = exports.Levels || (exports.Levels = {}));
