"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../src/app");
const config_stubs_1 = require("../stubs/config.stubs");
const app = new app_1.SmartLogger();
afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.disableAutomock();
});
describe('Smart Logger Service', () => {
    describe("Init Config", () => {
        it("should init config", () => {
            expect(app._optionsInit({})).toBeTruthy();
            expect(app._optionsInit({})).toEqual(config_stubs_1.prevOptionsStubs);
        });
        it("should customize config", () => {
            expect(app._optionsInit({})).toBeTruthy();
            expect(app._optionsInit({
                logs_folder_path: "./testpath",
            })).toEqual(config_stubs_1.customOptionsStubs);
        });
        it('should create a log file', async () => {
            let _createFile = await app._createFile();
            expect(_createFile).toBeTruthy();
        });
        it("should create file on a custom path", async () => {
            expect(app._optionsInit({})).toBeTruthy();
            expect(app._optionsInit({
                logs_folder_path: "./testpath",
            })).toEqual(config_stubs_1.customOptionsStubs);
            let _createFile = await app._createFile();
            expect(_createFile).toBeTruthy();
        });
    });
    describe("Log data into file", () => {
        it('should info message log', async () => {
            const logMsg = await app.setInfo('test info message', {});
            expect(logMsg).toBeTruthy();
        });
        it('should error message log', async () => {
            const errorMsg = await app.setError('test error message', {});
            expect(errorMsg).toBeTruthy();
        });
        it('should warning message log', async () => {
            const warningMsg = await app.setWarning('test warning message', {});
            expect(warningMsg).toBeTruthy();
        });
        it('should debug message log', async () => {
            const debugMsg = await app.setDebug('test debug message', {});
            expect(debugMsg).toBeTruthy();
        });
        it('should alert message log', async () => {
            const alertMsg = await app.setAlert('test alert message', {});
            expect(alertMsg).toBeTruthy();
        });
        it('should critical message log', async () => {
            const criticalMsg = await app.setCritical('test critical message', {});
            expect(criticalMsg).toBeTruthy();
        });
        it('should success message log', async () => {
            const successMsg = await app.setSuccess('test success message', {});
            expect(successMsg).toBeTruthy();
        });
        it('should info message log with data', async () => {
            const criticalMsg = await app.setCritical('test critical message', { error: false, message: 'some message' });
            expect(criticalMsg).toBeTruthy();
        });
    });
    describe("Log data into console", () => {
        it('should steep log with number', async () => {
            const logMsg = await app.setSteep({ message: 'test steep message', number: 5 });
            expect(logMsg).toBeTruthy();
        });
        it('should steep log without number', async () => {
            const logMsg = await app.setSteep({ message: 'test steep message' });
            expect(logMsg).toBeTruthy();
        });
        it('should cantity log without total', async () => {
            const logMsg = await app.setCantity({ message: 'Total Records', total: 100 });
            expect(logMsg).toBeTruthy();
        });
        it('should progress bar', async () => {
            const _progress = await app.setProgressBar(100);
            for (let i = 1; i <= 100; i++) {
                setTimeout(() => {
                    _progress.update(i);
                }, 500);
            }
            expect(_progress.stop()).toBeTruthy();
        });
        it('should interval log', async () => {
            const logMsg = await app.setInterval({ message: 'Record Processed', actual: 5, total: 100 });
            expect(logMsg).toBeTruthy();
        });
        it('should title log', async () => {
            ['info', 'error', 'warning', 'debug', 'alert', 'critical', 'success'].forEach(async (level) => {
                const logMsg = await app.setTitle({ message: `This is a ${level} title`, level });
                expect(logMsg).toBeTruthy();
            });
            const logMsg = await app.setTitle({ message: `This is a default title` });
            expect(logMsg).toBeTruthy();
        });
    });
});
