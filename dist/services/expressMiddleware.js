"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logExpressRequest = void 0;
const enums_1 = require("../enums");
const index_1 = require("../enums/index");
const logExpressRequest = (req, res, next) => {
    let _msgDate = new Date();
    _msgDate = `[${_msgDate.getFullYear()}-${_msgDate.getMonth()}-${_msgDate.getDate()} ${_msgDate.getHours()}:${_msgDate.getMinutes()}:${_msgDate.getSeconds()}]`;
    const { method, url, headers, body, params } = req;
    let _data = { endpoint: `[${method}] ${url}`, headers: headers, url_params: params, body: body };
    let _logMessage = `${_msgDate} - [${enums_1.LogForegroundColor['cyan']}${index_1.Levels['info']}${index_1.LogType['reset']}] - [express] | [data]: ${JSON.stringify(_data)}`;
    console.log(`${_logMessage}\n`);
    next();
};
exports.logExpressRequest = logExpressRequest;
