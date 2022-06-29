# Node Smart Logguer #

### A library that allows you to keep better control of your daily logs in Node
<br/>

## Install
```cmd
npm i node_smart_logger
```
<br/>

## Start it
```javascript
import SmartLogger from 'node_smart_logger';

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

<br/>

# logs

### These logs are saved to a file in your directory

```javascript
// Info log
_logger.setInfo("message");
//[2022-5-28 9:21:6] - [info] - message | [data]: {}

// Error log
_logger.setError("message");
//[2022-5-28 9:21:6] - [error] - message | [data]: {}

// Alert log
_logger.setAlert("message");
//[2022-5-28 9:21:6] - [alert] - message | [data]: {}

// Debug log
_logger.setDebug("message");
//[2022-5-28 9:21:6] - [debug] - message | [data]: {}

// Critical log
_logger.setCritical("message");
//[2022-5-28 9:21:6] - [critical] - message | [data]: {}

// Warning log
_logger.setWarning("message");
//[2022-5-28 9:21:6] - [warning] - message | [data]: {}

// Success log
_logger.setSuccess("message");
//[2022-5-28 9:21:6] - [success] - message | [data]: {}

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