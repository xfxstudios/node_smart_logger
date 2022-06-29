
const fs = require('fs');
import path from 'path';
import {Levels, LogBackgroundColor, LogForegroundColor, LogType} from './enums';
import {ICantity, IInterval, IOptions, ISteep, ISteepStatus, ITitle} from './interfaces';
const cliProgress = require('cli-progress');

class SmartLogger {
    
    private options:IOptions;
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

    async _writeFile(message:any, level:any, data={}){
        await this._createFile();

        let _nDate = this._getDate();

        let _logMessage = `${this._getMsgDate()} - ${this.getSpaces(`[${Levels[level]}]`)}- ${message} | [data]: ${JSON.stringify(data)}`;

        fs.appendFile(path.resolve(`${this.options.logs_folder_path}/${this.options.logs_folder_name}/${this.options.logs_general_file_name.replace(':date',_nDate)}`), `${_logMessage}\n`, (err:any) => {
            if (err) throw err;
        });
    };

    async setLog(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - ${message} | [data]: ${JSON.stringify(data)}`;
        
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

        return true;
    };

    async setInfo(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['cyan']}${Levels['info']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        await this._writeFile(message, 'info', data);
        
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

        return true;
    };

    async setError(message:String, data={}){

        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['red']}${Levels['error']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;

        await this._writeFile(message, 'error', data);
                
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

        return true;
    };

    async setWarning(message:String, data={}){
        
        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['orange']}${Levels['warning']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        
        await this._writeFile(message, 'warning', data);
                
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

        return true;

    };

    async setDebug(message:String, data={}){
        
        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['magenta']}${Levels['debug']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        
        await this._writeFile(message, 'debug', data);
                
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

        return true;

    };

    async setAlert(message:String, data={}){
        
        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['yellow']}${Levels['alert']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        
        await this._writeFile(message, 'alert', data);
                
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

        return true;
    };

    async setSuccess(message:String, data={}){
        
        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['green']}${Levels['success']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        
        await this._writeFile(message, 'alert', data);
                
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

        return true;
    };

    async setCritical(message:String, data={}){
        
        let _logMessage = `${this._getMsgDate()} - [${LogForegroundColor['blue']}${Levels['critical']}${LogType['reset']}] - ${message} | [data]: ${JSON.stringify(data)}`;
        
        await this._writeFile(message, 'critical', data);
                
        if(this.options.show_terminal){
            console.log(`${_logMessage}\n`);
        }

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

export default SmartLogger;