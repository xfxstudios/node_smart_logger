# Node Smart Logger #

### A library that allows you to keep better control of your daily logs in Node
<br/>

## Install
```cmd
npm i node_smart_logger
```
<br/>

## Start it
```javascript
import { SmartLogger } from 'node_smart_logger';

const _logger = new SmartLogger();

```
### By default logger will create a logs folder in the root of your project, but you can also indicate the path and name of the logs folder when you initialize it:

```javascript
const config = {
    logs_folder_path: "./someDir/anotherDir",
    logs_folder_name: "anotherLogsFolderName"
}
const _logger = new SmartLogger(config);
```
Opciones de Configuración:

- logs_folder_path : String - [Ruta donde se generará el archivo de logs] [defaul: "./"]
- logs_folder_name : String - [Nombre del directorio donde se guardaran los logs] [default: "logs"]
- show_terminal : Boolean - [Habilita o inhabilita mostrar logs en el terminal] [default: "true"]
- write_file : Boolean - [Habilita o inhabilita escribir los logs en el archivo] [default: "true"]

<br/>

### Disable logs for terminal during test, set environment variable
```
SET TEST_LOGS=false
```

# logs

### These logs are saved to a file in your directory

```javascript
// normal log
_logger.setLog("message");
_logger.terminalLog("message");// only terminal output
//[2022-5-28 9:21:6] - message | [data]: {}

// Info log
_logger.setInfo("message");
_logger.terminalInfo("message");// only terminal output
//[2022-5-28 9:21:6] - [INFO] - message | [data]: {}

// Error log
_logger.setError("message");
_logger.terminalError("message");// only terminal output
//[2022-5-28 9:21:6] - [ERROR] - message | [data]: {}

// Alert log
_logger.setAlert("message");
_logger.terminalAlert("message");// only terminal output
//[2022-5-28 9:21:6] - [ALERT] - message | [data]: {}

// Debug log
_logger.setDebug("message");
_logger.terminalDebug("message");// only terminal output
//[2022-5-28 9:21:6] - [DEBUG] - message | [data]: {}

// Critical log
_logger.setCritical("message");
_logger.terminalCritical("message");// only terminal output
//[2022-5-28 9:21:6] - [CRITICAL] - message | [data]: {}

// Warning log
_logger.setWarning("message");
_logger.terminalWarning("message");// only terminal output
//[2022-5-28 9:21:6] - [WARNING] - message | [data]: {}

// Success log
_logger.setSuccess("message");
_logger.terminalSuccess("message");// only terminal output
//[2022-5-28 9:21:6] - [SUCCESS] - message | [data]: {}

// Trace log [return a trace of route]
_logger.setTrace("message");
_logger.terminalTrace("message");// only terminal output
//[2022-5-28 9:21:6] - [TRACE] - message | [data]: {}
/*
    myOtherFUnction
    myFunction
    onclick
*/

```
<br/>

## Logs agree to receive a data object
```javascript

const dataToLog = {
    error: false,
    message: 'some message'
}

_logger.setCritical("log message", dataToLog);
//[2022-5-28 9:21:6] - [critical]  - log message | [data]: {"error":false,"message":"some message"}

```

<br/>

# Logs only for terminal

## Steep
```javascript
_logger.setSteep({message: 'some message',number: 5});
//[ steep 5 ] :::: some message
```


## Cantity
```javascript
_logger.setCantity({message: 'Total Records', total: 100});
//Total Records [100]
```


## Interval
```javascript
_logger.setInterval({message: 'Record Processed', actual: 5, total: 100});
//Record Processed [5] of [100]
```

<br/>

# You can create titles with background according to the level of the log

## Title
```javascript
_logger.setTitle({message: "This is a error tittle", level: "error"});

```

<br/>

## Title levels available
<ul>
    <li>info</li>
    <li>warning</li>
    <li>error</li>
    <li>alert</li>
    <li>critical</li>
    <li>success</li>
    <li>degub</li>
</ul>

<br/>