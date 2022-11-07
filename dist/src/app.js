"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path_1 = __importDefault(require("path"));
const enums_1 = require("./enums");
const cliProgress = require('cli-progress');
class SmartLogger {
    constructor(optionsParams = {}) {
        this.logs_folder_path = "./";
        this.logs_folder_name = "logs";
        this.create_general_file = false;
        this.create_info_file = false;
        this.create_error_file = false;
        this.create_warning_file = false;
        this.create_debug_file = false;
        this.logs_general_file_name = "logs_:date.txt";
        this.logs_info_file_name = "logs_info_:date.txt";
        this.logs_error_file_name = "logs_error_:date.txt";
        this.logs_warning_file_name = "logs_warning_:date.txt";
        this.logs_debug_file_name = "logs_debug_:date.txt";
        this.error_level = "error";
        this.warning_level = "warning";
        this.info_level = "info";
        this.debug_level = "debug";
        this.general_level = "general";
        this.show_terminal = true;
        this.write_file = true;
        this.options = this._optionsInit(optionsParams);
    } //
    _optionsInit(options) {
        let _prevOptions = {
            logs_folder_path: this.logs_folder_path,
            logs_folder_name: this.logs_folder_name,
            create_general_file: this.create_general_file,
            create_info_file: this.create_info_file,
            create_error_file: this.create_error_file,
            create_warning_file: this.create_warning_file,
            create_debug_file: this.create_debug_file,
            logs_general_file_name: this.logs_general_file_name,
            logs_info_file_name: this.logs_info_file_name,
            logs_error_file_name: this.logs_error_file_name,
            logs_warning_file_name: this.logs_warning_file_name,
            logs_debug_file_name: this.logs_debug_file_name,
            error_level: this.error_level,
            warning_level: this.warning_level,
            info_level: this.info_level,
            debug_level: this.debug_level,
            general_level: this.general_level,
            show_terminal: this.show_terminal,
            write_file: this.write_file,
        };
        if (Object.keys(options).length > 0) {
            Object.keys(options).forEach(key => {
                _prevOptions[key] = options[key];
            });
            return _prevOptions;
        }
        else {
            return _prevOptions;
        }
    } //
    _getDate() {
        let _nDate = new Date();
        return `${_nDate.getFullYear()}_${_nDate.getMonth() + 1}_${_nDate.getDate()}`;
    }
    _getMsgDate() {
        let _msgDate = new Date();
        _msgDate = `[${_msgDate.getFullYear()}-${_msgDate.getMonth()}-${_msgDate.getDate()} ${_msgDate.getHours()}:${_msgDate.getMinutes()}:${_msgDate.getSeconds()}]`;
        return _msgDate;
    }
    async _createFile() {
        if (fs.existsSync(path_1.default.resolve(`${String(this.options.logs_folder_path)}/${this.options.logs_folder_name}`))) {
            if (!fs.existsSync(path_1.default.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date', this._getDate())}`))) {
                fs.writeFile((path_1.default.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date', this._getDate())}`)), '', (err) => {
                    if (err)
                        throw err;
                });
                return true;
            }
            else {
                return true;
            }
        }
        else {
            fs.mkdirSync(path_1.default.resolve(`${String(this.options.logs_folder_path)}${this.options.logs_folder_name}`));
            fs.writeFile((path_1.default.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date', this._getDate())}`)), '', (err) => {
                if (err)
                    throw err;
            });
            return true;
        }
    }
    getSpaces(value) {
        let out;
        let defaultSpaces = 12;
        out = value.substr(0, 20);
        let totalSpaces = defaultSpaces - out.length;
        for (let i = 0; i < totalSpaces; i++) {
            out += " ";
        }
        return out;
    }
    async _writeFile(message, level, data = {}) {
        await this._createFile();
        let _nDate = this._getDate();
        let _logMessage = `${this._getMsgDate()} - ${this.getSpaces(`[${enums_1.Levels[level]}]`)}- ${message} | [data]: ${JSON.stringify(data)}`;
        fs.appendFile(path_1.default.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date', _nDate)}`), `${_logMessage}\n`, (err) => {
            if (err)
                throw err;
        });
    }
    ;
    async terminalLog(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalInfo(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['cyan']}${enums_1.Levels['info']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalError(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['red']}${enums_1.Levels['error']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalWarning(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['orange']}${enums_1.Levels['warning']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalSuccess(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['green']}${enums_1.Levels['success']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalCritical(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['blue']}${enums_1.Levels['critical']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setLog(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setInfo(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['cyan']}${enums_1.Levels['info']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile(message, 'info', data);
        }
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        return true;
    }
    ;
    async setError(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['red']}${enums_1.Levels['error']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile(message, 'error', data);
        }
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        return true;
    }
    ;
    async setWarning(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['orange']}${enums_1.Levels['warning']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile(message, 'warning', data);
        }
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        return true;
    }
    ;
    async setDebug(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['magenta']}${enums_1.Levels['debug']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile(message, 'debug', data);
        }
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        return true;
    }
    ;
    async setAlert(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['yellow']}${enums_1.Levels['alert']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile(message, 'alert', data);
        }
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        return true;
    }
    ;
    async setSuccess(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['green']}${enums_1.Levels['success']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile(message, 'alert', data);
        }
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        return true;
    }
    ;
    async setCritical(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['blue']}${enums_1.Levels['critical']}${enums_1.LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile(message, 'critical', data);
        }
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        return true;
    }
    ;
    async setSteep(data) {
        const { message, number } = data;
        console.log(`${enums_1.LogForegroundColor.yellow}[ steep ${(number) ? number + ' ]' : ']'}\x1b[0m ${message}\n`);
        return true;
    }
    async setSteepStatus(data) {
        const { message, number } = data;
        console.log(`${enums_1.LogForegroundColor.yellow}[ steep ${(number) ? number + ' ]' : ']'}\x1b[0m ${message}\n`);
        return true;
    }
    async setCantity(data) {
        const { message, total } = data;
        console.log(`${enums_1.LogForegroundColor.green}${message}${enums_1.LogType.reset} ${enums_1.LogForegroundColor.yellow}[${total}]${enums_1.LogType.reset}\n`);
        return true;
    }
    async setInterval(data) {
        const { message, actual, total } = data;
        console.log(`${enums_1.LogForegroundColor.green}${message}${enums_1.LogType.reset} ${enums_1.LogForegroundColor.yellow}[${actual}]${enums_1.LogType.reset} of ${enums_1.LogForegroundColor.yellow}[${total}]${enums_1.LogType.reset}`);
        return true;
    }
    async setTitle(data) {
        const { message, level } = data;
        switch (level) {
            case 'info':
                console.log(`${enums_1.LogBackgroundColor.cyan}${enums_1.LogForegroundColor.white}${message}${enums_1.LogType.reset}`);
                break;
            case 'error':
                console.log(`${enums_1.LogBackgroundColor.red}${enums_1.LogForegroundColor.white}${message}${enums_1.LogType.reset}`);
                break;
            case 'warning':
                console.log(`${enums_1.LogBackgroundColor.orange}${enums_1.LogForegroundColor.white}${message}${enums_1.LogType.reset}`);
                break;
            case 'debug':
                console.log(`${enums_1.LogBackgroundColor.magenta}${enums_1.LogForegroundColor.white}${message}${enums_1.LogType.reset}`);
                break;
            case 'alert':
                console.log(`${enums_1.LogBackgroundColor.yellow}${enums_1.LogForegroundColor.black}${message}${enums_1.LogType.reset}`);
                break;
            case 'critical':
                console.log(`${enums_1.LogBackgroundColor.blue}${enums_1.LogForegroundColor.white}${message}${enums_1.LogType.reset}`);
                break;
            case 'success':
                console.log(`${enums_1.LogBackgroundColor.green}${enums_1.LogForegroundColor.white}${message}${enums_1.LogType.reset}`);
                break;
            default:
                console.log(`${enums_1.LogBackgroundColor.white}${enums_1.LogForegroundColor.black}${message}${enums_1.LogType.reset}`);
        }
        return true;
    }
    async setProgressBar(initialValue) {
        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar1.start(initialValue, 0);
        return {
            update: (value) => {
                bar1.update(value);
            },
            stop: () => {
                bar1.stop();
                return true;
            }
        };
    }
    async logExpressRequest(req, res, next) {
        const { method, url, headers, body, params } = req;
        let _nDate = this._getDate();
        let _logMessage = `${this._getMsgDate()} - [${enums_1.LogForegroundColor['cyan']}${enums_1.Levels['info']}${enums_1.LogType['reset']}]-[express] | [endpoint] [${method}] ${url} |  [headers] ${JSON.stringify(headers)} | [params] ${JSON.stringify(params)} | [body] ${JSON.stringify(body)}`;
        let _logWriteMessage = `${this._getMsgDate()} - [${enums_1.Levels['info']}]-[${enums_1.LogForegroundColor['yellow']}express${enums_1.LogType['reset']}] | [endpoint] [${method}] ${url} |  [headers] ${JSON.stringify(headers)} | [params] ${JSON.stringify(params)} | [body] ${JSON.stringify(body)}`;
        fs.appendFile(path_1.default.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date', _nDate)}`), `${_logWriteMessage}\n`, (err) => {
            if (err)
                throw err;
        });
        if (this.options.show_terminal) {
            console.log(`${_logMessage}\n`);
        }
        next();
    }
}
exports.default = SmartLogger;
