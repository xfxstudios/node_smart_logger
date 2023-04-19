
const fs = require('fs');
import path from 'path';
const cliProgress = require('cli-progress');

interface IOptions {
    logs_folder_path: String;
    logs_folder_name: String;
    create_general_file: Boolean;
    create_info_file: Boolean;
    create_error_file: Boolean;
    create_warning_file: Boolean;
    create_debug_file: Boolean;
    logs_general_file_name: String;
    logs_info_file_name: String;
    logs_error_file_name: String;
    logs_warning_file_name: String;
    logs_debug_file_name: String;
    error_level: String;
    warning_level: String;
    info_level: String;
    debug_level: String;
    general_level: String;
    show_terminal: Boolean;
    write_file: Boolean;
}

interface ISteep {
    message: String;
    number?: Number;
}

interface ISteepStatus {
    message: String;
    number?: Number;
    status?: String;
}

interface ICantity {
    message: String;
    total: Number;
}

interface IInterval {
    message: String;
    actual: Number;
    total: Number;
}

interface ITitle {
    message: String;
    level?: String;
}

enum LogType {
    reset      = "\x1b[0m",
    bright     = "\x1b[1m",
    dim        = "\x1b[2m",
    underscore = "\x1b[4m",
    blink      = "\x1b[5m",
    reverse    = "\x1b[7m",
    hidden     = "\x1b[8m",
}

enum LogForegroundColor {
    black   = "\x1b[30m",
    red     = "\x1b[31m",
    green   = "\x1b[32m",
    yellow  = "\x1b[33m",
    blue    = "\x1b[34m",
    magenta = "\x1b[35m",
    cyan    = "\x1b[36m",
    white   = "\x1b[37m",
    crimson = "\x1b[38m",
    orange  = "\x1b[38;5;214m",

}

enum LogBackgroundColor {
    black   = "\x1b[40m",
    red     = "\x1b[41m",
    green   = "\x1b[42m",
    yellow  = "\x1b[43m",
    blue    = "\x1b[44m",
    magenta = "\x1b[45m",
    cyan    = "\x1b[46m",
    white   = "\x1b[47m",
    crimson = "\x1b[48m",
    orange  = "\x1b[48;5;214m",
}

const Levels = {
    info:"INFO",
    error: "ERROR",
    warning: "WARNING",
    debug: "DEBUG",
    alert: "ALERT",
    critical: "CRITICAL",
    success: "SUCCESS",
    trace: "TRACE"
}

class SmartLogger {

    private options                         : IOptions;
    private readonly logs_folder_path       = "./";
    private readonly logs_folder_name       = "logs";
    private readonly create_general_file    = false;
    private readonly create_info_file       = false;
    private readonly create_error_file      = false;
    private readonly create_warning_file    = false;
    private readonly create_debug_file      = false;
    private readonly logs_general_file_name = "logs_:date.txt";
    private readonly logs_info_file_name    = "logs_info_:date.txt";
    private readonly logs_error_file_name   = "logs_error_:date.txt";
    private readonly logs_warning_file_name = "logs_warning_:date.txt";
    private readonly logs_debug_file_name   = "logs_debug_:date.txt";
    private readonly error_level            = "error";
    private readonly warning_level          = "warning";
    private readonly info_level             = "info";
    private readonly debug_level            = "debug";
    private readonly general_level          = "general";
    private readonly show_terminal          = true;
    private readonly write_file             = true;
    private readonly test_logs;

    constructor(optionsParams={}) {
        this.options = this._optionsInit(optionsParams)
    }//

    _optionsInit(options:any){
        let _prevOptions:any = {
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

        if(Object.keys(options).length > 0){
            Object.keys(options).forEach(key => {
                _prevOptions[key] = options[key];
            });
            return _prevOptions;
        }else{
            return _prevOptions
        }
    }//

    _getDate(){
        let _nDate = new Date();
        return `${_nDate.getFullYear()}_${_nDate.getMonth()+1}_${_nDate.getDate()}`;
    }

    _getMsgDate(){
        let _msgDate:any = new Date();
        _msgDate = `[${_msgDate.getFullYear()}-${_msgDate.getMonth()}-${_msgDate.getDate()} ${_msgDate.getHours()}:${_msgDate.getMinutes()}:${_msgDate.getSeconds()}]`;
        return _msgDate;
    }

    async _createFile(){

        if (fs.existsSync(path.resolve(`${String(this.options.logs_folder_path)}/${this.options.logs_folder_name}`))) {

            if(!fs.existsSync(path.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date',this._getDate())}`))){

                fs.writeFile((path.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date',this._getDate())}`)), '', (err:any) => {
                    if (err) throw err;
                });

                return true;

            }else{

                return true;

            }

        }else{

            fs.mkdirSync(path.resolve(`${String(this.options.logs_folder_path)}${this.options.logs_folder_name}`));

            fs.writeFile((path.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date',this._getDate())}`)), '', (err:any) => {
                if (err) throw err;
            });

            return true;

        }

    }

    getSpaces(value){
        let out;
        let defaultSpaces = 12;

        out = value.substr(0,20);
        let totalSpaces = defaultSpaces - out.length

        for(let i = 0; i < totalSpaces; i++){
            out += " "
        }
        return out;
    }

    async _writeFile({message, level, data}:{message:any, level:string, data?:any}){
        await this._createFile();

        let _nDate = this._getDate();
        let _data = (Object.keys(data).length > 0) ?  `| [data]: ${JSON.stringify(data)}`:``
        let _logMessage = `${this._getMsgDate()} - ${this.getSpaces(`[${level}]`)}- ${message} ${_data}`;

        fs.appendFile(path.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date',_nDate)}`), `${_logMessage}\n`, (err:any) => {
            if (err) throw err;
        });
    };

    async terminalLog(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - ${message} | [data]: ${JSON.stringify(data)}`;
        console.log(`${_logMessage}\n`);

        return true;
    };

    async terminalInfo(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['cyan']}${Levels['info']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);


        return true;
    };

    async terminalError(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['red']}${Levels['error']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);

        return true;
    };

    async terminalWarning(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['orange']}${Levels['warning']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);

        return true;

    };

    async terminalSuccess(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['green']}${Levels['success']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);

        return true;
    };

    async terminalCritical(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['blue']}${Levels['critical']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);

        return true;

    };

    async terminalDebug(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['yellow']}${Levels['debug']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);

        return true;

    };

    async terminalAlert(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['yellow']}${Levels['alert']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);

        return true;
    };

    async terminalTrace(message:String='', data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['magenta']}${Levels['trace']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        console.trace(`${_logMessage}\n`);

        return true;
    };

    async setLog(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - ${message} | [data]: ${JSON.stringify(data)}`;

        console.log(`${_logMessage}\n`);

        return true;
    };

    async setInfo(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['cyan']}${Levels['info']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level: Levels['info'], data});
        }

        console.log(`${_logMessage}\n`);

        return true;
    };

    async setError(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['red']}${Levels['error']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level:Levels['error'], data});
        }

        console.log(`${_logMessage}\n`);

        return true;
    };

    async setWarning(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['orange']}${Levels['warning']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level:Levels['warning'], data});
        }

        console.log(`${_logMessage}\n`);

        return true;

    };

    async setDebug(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['magenta']}${Levels['debug']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level:Levels['debug'], data});
        }

        console.log(`${_logMessage}\n`);

        return true;

    };

    async setAlert(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['yellow']}${Levels['alert']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level:Levels['alert'], data});
        }

        console.log(`${_logMessage}\n`);

        return true;
    };

    async setSuccess(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['green']}${Levels['success']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level:Levels['success'], data});
        }

        console.log(`${_logMessage}\n`);

        return true;
    };

    async setCritical(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['blue']}${Levels['critical']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level:Levels['critical'], data});
        }

        console.log(`${_logMessage}\n`);

        return true;

    };

    async setTrace(message:String='', data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['magenta']}${Levels['trace']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        if(this.options.write_file){
            await this._writeFile({message, level:Levels['trace'], data});
        }

        console.trace(`${_logMessage}\n`);

        return true;

    };

    async setSteep(data:ISteep){
        const {message, number} = data;
        console.log(`${LogForegroundColor.yellow}[ steep ${(number)?number+' ]':']'}\x1b[0m ${message}\n`);

        return true;
    }

    async setSteepStatus(data:ISteepStatus){
        const {message, number} = data;
        console.log(`${LogForegroundColor.yellow}[ steep ${(number)?number+' ]':']'}\x1b[0m ${message}\n`);
        return true;
    }

    async setCantity(data:ICantity){
        const {message, total} = data;
        console.log(`${LogForegroundColor.green}${message}${LogType.reset} ${LogForegroundColor.yellow}[${total}]${LogType.reset}\n`);
        return true;
    }

    async setInterval(data:IInterval){
        const {message, actual, total} = data;
        console.log(`${LogForegroundColor.green}${message}${LogType.reset} ${LogForegroundColor.yellow}[${actual}]${LogType.reset} of ${LogForegroundColor.yellow}[${total}]${LogType.reset}`);
        return true;
    }

    async setTitle(data:ITitle){
        const {message, level} = data;

        switch(level){
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

    async setProgressBar(initialValue:number){
        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar1.start(initialValue, 0);
        return {
            update: (value:number) => {
                bar1.update(value);
            },
            stop: () => {
                bar1.stop();
                return true;
            }
        }
    }

}

export {SmartLogger};