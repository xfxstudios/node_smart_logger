import {LogForegroundColor} from "../enums";
import { Levels, LogType } from '../enums/index';

export const logExpressRequest = (req,res,next) => {

  let _msgDate:any = new Date();
  _msgDate = `[${_msgDate.getFullYear()}-${_msgDate.getMonth()}-${_msgDate.getDate()} ${_msgDate.getHours()}:${_msgDate.getMinutes()}:${_msgDate.getSeconds()}]`;
  
  const {method, url, headers, body, params} = req;

  let _data = {endpoint:`[${method}] ${url}`, headers:JSON.stringify(headers), url_params:JSON.stringify(params), body:JSON.stringify(body)}

  let _logMessage = `${_msgDate} - [${LogForegroundColor['cyan']}${Levels['info']}${LogType['reset']}] - [express] | [data]: ${JSON.stringify(_data)}`;
          
  
  console.log(`${_logMessage}\n`);
  

  next();
}