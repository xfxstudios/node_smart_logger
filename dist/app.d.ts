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
declare class SmartLogger {
    private options;
    private readonly logs_folder_path;
    private readonly logs_folder_name;
    private readonly create_general_file;
    private readonly create_info_file;
    private readonly create_error_file;
    private readonly create_warning_file;
    private readonly create_debug_file;
    private readonly logs_general_file_name;
    private readonly logs_info_file_name;
    private readonly logs_error_file_name;
    private readonly logs_warning_file_name;
    private readonly logs_debug_file_name;
    private readonly error_level;
    private readonly warning_level;
    private readonly info_level;
    private readonly debug_level;
    private readonly general_level;
    private readonly show_terminal;
    private readonly write_file;
    private readonly test_logs;
    constructor(optionsParams?: {});
    _optionsInit(options: any): any;
    _getDate(): string;
    _getMsgDate(): any;
    _createFile(): Promise<boolean>;
    getSpaces(value: any): any;
    _writeFile({ message, level, data }: {
        message: any;
        level: string;
        data?: any;
    }): Promise<void>;
    terminalLog(message: String, data?: {}): Promise<boolean>;
    terminalInfo(message: String, data?: {}): Promise<boolean>;
    terminalError(message: String, data?: {}): Promise<boolean>;
    terminalWarning(message: String, data?: {}): Promise<boolean>;
    terminalSuccess(message: String, data?: {}): Promise<boolean>;
    terminalCritical(message: String, data?: {}): Promise<boolean>;
    terminalDebug(message: String, data?: {}): Promise<boolean>;
    terminalAlert(message: String, data?: {}): Promise<boolean>;
    terminalTrace(message?: String, data?: {}): Promise<boolean>;
    setLog(message: String, data?: {}): Promise<boolean>;
    setInfo(message: String, data?: {}): Promise<boolean>;
    setError(message: String, data?: {}): Promise<boolean>;
    setWarning(message: String, data?: {}): Promise<boolean>;
    setDebug(message: String, data?: {}): Promise<boolean>;
    setAlert(message: String, data?: {}): Promise<boolean>;
    setSuccess(message: String, data?: {}): Promise<boolean>;
    setCritical(message: String, data?: {}): Promise<boolean>;
    setTrace(message?: String, data?: {}): Promise<boolean>;
    setSteep(data: ISteep): Promise<boolean>;
    setSteepStatus(data: ISteepStatus): Promise<boolean>;
    setCantity(data: ICantity): Promise<boolean>;
    setInterval(data: IInterval): Promise<boolean>;
    setTitle(data: ITitle): Promise<boolean>;
    setProgressBar(initialValue: number): Promise<{
        update: (value: number) => void;
        stop: () => boolean;
    }>;
}
export { SmartLogger };
