"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartLogger = void 0;
const fs = require('fs');
const path_1 = __importDefault(require("path"));
const cliProgress = require('cli-progress');
var LogType;
(function (LogType) {
    LogType["reset"] = "\u001B[0m";
    LogType["bright"] = "\u001B[1m";
    LogType["dim"] = "\u001B[2m";
    LogType["underscore"] = "\u001B[4m";
    LogType["blink"] = "\u001B[5m";
    LogType["reverse"] = "\u001B[7m";
    LogType["hidden"] = "\u001B[8m";
})(LogType || (LogType = {}));
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
})(LogForegroundColor || (LogForegroundColor = {}));
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
})(LogBackgroundColor || (LogBackgroundColor = {}));
const Levels = {
    info: "INFO",
    error: "ERROR",
    warning: "WARNING",
    debug: "DEBUG",
    alert: "ALERT",
    critical: "CRITICAL",
    success: "SUCCESS",
    trace: "TRACE"
};
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
            test_logs: this.test_logs,
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
        _msgDate = `${_msgDate.getFullYear()}-${_msgDate.getMonth()}-${_msgDate.getDate()} ${_msgDate.getHours()}:${_msgDate.getMinutes()}:${_msgDate.getSeconds()}`;
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
    async _writeFile({ message, level, data }) {
        await this._createFile();
        let _nDate = this._getDate();
        let _data = (Object.keys(data).length > 0) ? `| ${JSON.stringify(data)}` : ``;
        let _logMessage = `${this._getMsgDate()} | ${this.getSpaces(`${level}`)} | ${message} ${_data}`;
        fs.appendFile(path_1.default.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date', _nDate)}`), `${_logMessage}\n`, (err) => {
            if (err)
                throw err;
        });
    }
    ;
    async terminalLog(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalInfo(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['cyan']}${Levels['info']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalError(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['red']}${Levels['error']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalWarning(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['orange']}${Levels['warning']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalSuccess(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['green']}${Levels['success']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalCritical(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['blue']}${Levels['critical']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalDebug(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['yellow']}${Levels['debug']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalAlert(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['yellow']}${Levels['alert']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async terminalTrace(message = '', data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['magenta']}${Levels['trace']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        console.trace(`${_logMessage}\n`);
        return true;
    }
    ;
    async setLog(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${message} | ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setInfo(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['cyan']}${Levels['info']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['info'], data });
        }
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setError(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['red']}${Levels['error']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['error'], data });
        }
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setWarning(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['orange']}${Levels['warning']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['warning'], data });
        }
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setDebug(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['magenta']}${Levels['debug']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['debug'], data });
        }
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setAlert(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['yellow']}${Levels['alert']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['alert'], data });
        }
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setSuccess(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['green']}${Levels['success']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['success'], data });
        }
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setCritical(message, data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['blue']}${Levels['critical']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['critical'], data });
        }
        console.log(`${_logMessage}\n`);
        return true;
    }
    ;
    async setTrace(message = '', data = {}) {
        let _logMessage = `${this._getMsgDate()} | ${LogForegroundColor['magenta']}${Levels['trace']}${LogType['reset']} | ${message} | ${JSON.stringify(data)}`;
        if (this.options.write_file) {
            await this._writeFile({ message, level: Levels['trace'], data });
        }
        console.trace(`${_logMessage}\n`);
        return true;
    }
    ;
    async setSteep(data) {
        const { message, number } = data;
        console.log(`${LogForegroundColor.yellow}[ steep ${(number) ? number + ' ]' : ']'}\x1b[0m ${message}\n`);
        return true;
    }
    async setSteepStatus(data) {
        const { message, number } = data;
        console.log(`${LogForegroundColor.yellow}[ steep ${(number) ? number + ' ]' : ']'}\x1b[0m ${message}\n`);
        return true;
    }
    async setCantity(data) {
        const { message, total } = data;
        console.log(`${LogForegroundColor.green}${message}${LogType.reset} ${LogForegroundColor.yellow}[${total}]${LogType.reset}\n`);
        return true;
    }
    async setInterval(data) {
        const { message, actual, total } = data;
        console.log(`${LogForegroundColor.green}${message}${LogType.reset} ${LogForegroundColor.yellow}[${actual}]${LogType.reset} of ${LogForegroundColor.yellow}[${total}]${LogType.reset}`);
        return true;
    }
    async setTitle(data) {
        const { message, level } = data;
        switch (level) {
            case 'info':
                console.log(`${LogBackgroundColor.cyan}${LogForegroundColor.white}${message}${LogType.reset}`);
                break;
            case 'error':
                console.log(`${LogBackgroundColor.red}${LogForegroundColor.white}${message}${LogType.reset}`);
                break;
            case 'warning':
                console.log(`${LogBackgroundColor.orange}${LogForegroundColor.white}${message}${LogType.reset}`);
                break;
            case 'debug':
                console.log(`${LogBackgroundColor.magenta}${LogForegroundColor.white}${message}${LogType.reset}`);
                break;
            case 'alert':
                console.log(`${LogBackgroundColor.yellow}${LogForegroundColor.black}${message}${LogType.reset}`);
                break;
            case 'critical':
                console.log(`${LogBackgroundColor.blue}${LogForegroundColor.white}${message}${LogType.reset}`);
                break;
            case 'success':
                console.log(`${LogBackgroundColor.green}${LogForegroundColor.white}${message}${LogType.reset}`);
                break;
            default:
                console.log(`${LogBackgroundColor.white}${LogForegroundColor.black}${message}${LogType.reset}`);
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
}
exports.SmartLogger = SmartLogger;
