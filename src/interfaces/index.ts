export interface IOptions {
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
}

export interface ISteep {
    message: String;
    number?: Number;
}

export interface ISteepStatus {
    message: String;
    number?: Number;
    status?: String;
}

export interface ICantity {
    message: String;
    total: Number;
}

export interface IInterval {
    message: String;
    actual: Number;
    total: Number;
}

export interface ITitle {
    message: String;
    level?: String;
}