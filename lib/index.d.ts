/// <reference types="node" />
/**
 * The default port.
 */
export declare const DEFAULT_PORT: number;
/**
 * The default timeout.
 */
export declare const DEFAULT_TIMEOUT: number;
/**
 * A condition.
 */
export declare type Condition = (data: EventData) => boolean;
/**
 * A function that provides data.
 */
export declare type DataProvider<T> = (obj: RemoteDebugger, data: EventData, step: number, maxSteps: number) => T | DataProvider<T>;
/**
 * A function that transforms data into another format.
 */
export declare type DataTransformer = (input: Buffer) => Buffer;
/**
 * A function for handling an error.
 */
export declare type ErrorHandler = (category: string, ctx: ErrorContext, data: EventData) => void;
/**
 * A function that provides data of a target host.
 */
export declare type HostProvider = (obj: RemoteDebugger) => HostData;
/**
 * A handler for sending a debugger entry.
 */
export declare type Sender = (buffer: Buffer, data: EventData, errHandler: ErrorHandler) => void;
/**
 * An error context.
 */
export interface ErrorContext {
    /**
     * The code.
     */
    code?: number;
    /**
     * The message.
     */
    message?: string;
}
export interface EventData {
    backtrace: StackFrame[];
    condition?: boolean;
    debugger: RemoteDebugger;
    host: HostData;
    me: RemoteDebugger;
    provider: HostProvider;
    time: Date;
    vars?: any[];
}
/**
 * Stores data for a target host.
 */
export interface HostData {
    /**
     * The remote address.
     */
    addr?: string;
    /**
     * The TCP port.
     */
    port?: number;
    /**
     * The timeout.
     */
    timeout?: number;
}
/**
 * Describes a debugger entry.
 */
export interface RemoteDebuggerEntry {
    /**
     * The name of the app the entry is for.
     */
    a?: string;
    /**
     * The name of the client the entry is for.
     */
    c?: string;
    /**
     * The name of the file.
     */
    f?: string;
    /**
     * Notes
     */
    n?: string;
    /**
     * The stacktrace.
     */
    s?: RemoteDebuggerStackFrame[];
    /**
     * The list of threads.
     */
    t?: RemoteDebuggerThread[];
    /**
     * The list of variables.
     */
    v?: RemoteDebuggerVariable[];
}
/**
 * A scope.
 */
export interface RemoteDebuggerScope {
    /**
     * The name.
     */
    n?: string;
    /**
     * The reference number.
     */
    r?: number;
    /**
     * The list of debugger variables.
     */
    v?: RemoteDebuggerVariable[];
}
/**
 * A frame of a stacktrace.
 */
export interface RemoteDebuggerStackFrame {
    /**
     * The file path.
     */
    f?: string;
    /**
     * The file name.
     */
    fn?: string;
    /**
     * The ID.
     */
    i?: number;
    /**
     * The line in the file.
     */
    l?: number;
    /**
     * The full path of the file on the running machine.
     */
    ln?: string;
    /**
     * The name.
     */
    n?: string;
    /**
     * The list of scopes.
     */
    s?: RemoteDebuggerScope[];
    /**
     * The list of variables.
     */
    v?: RemoteDebuggerVariable[];
}
/**
 * A thread.
 */
export interface RemoteDebuggerThread {
    /**
     * The ID.
     */
    i?: number;
    /**
     * The name.
     */
    n?: string;
}
/**
 * A variable.
 */
export interface RemoteDebuggerVariable {
    /**
     * If type is 'function' this is the function name.
     */
    fn?: string;
    /**
     * The name.
     */
    n?: string;
    /**
     * If type is 'object' this is the object name.
     */
    on?: string;
    /**
     * The reference.
     */
    r?: number;
    /**
     * The data type.
     */
    t?: string;
    /**
     * The value.
     */
    v?: any;
}
/**
 * A frame of a stack trace.
 */
export interface StackFrame {
    /**
     * The column.
     */
    column?: number;
    /**
     * The file path.
     */
    file?: string;
    /**
     * The name of the underlying function.
     */
    func?: string;
    /**
     * The line.
     */
    line?: number;
}
/**
 * A remote debugger.
 *
 * @author Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
 */
export declare class RemoteDebugger {
    /**
     * Stores the list of provides that return the host address
     * and port of the remote debugger host.
     */
    protected _hostProviders: HostProvider[];
    addHost(addressOrProvider?: string | HostProvider, port?: number, timeout?: number): RemoteDebugger;
    /**
     * The name of the app or a function that provides it.
     */
    app: string | DataProvider<string>;
    /**
     * Sends a debugger message.
     *
     * @param {Object} [vars] The custom variables to send.
     * @param {number} [skipFrames] The number of stack frames to skip.
     */
    dbg(vars?: any, skipFrames?: number): void;
    /**
     * Sends a debugger message if a condition matches.
     *
     * @param {Condition|boolean} condition The condition (value) to use.
     * @param {Object} [vars] The custom variables to send.
     * @param {number} [skipFrames] The number of stack frames to skip.
     */
    dbgIf(condition: Condition | boolean, vars?: any, skipFrames?: number): void;
    /**
     * The default sender logic.
     */
    defaultSender(buffer: Buffer): void;
    /**
     * Stores the error handler.
     */
    errorHandler: ErrorHandler;
    /**
     * Returns the stack trace.
     *
     * @param {number} [skipFrames] The optional number of frames to skip.
     */
    protected getStackTrace(skipFrames?: number): StackFrame[];
    /**
     * Checks if a value is a function.
     *
     * @param {any} val The value to check.
     *
     * @return {boolean} Is function or not.
     */
    protected isCallable(val: any): boolean;
    /**
     * Transforms JSON data into a new format.
     */
    jsonTransformer: DataTransformer;
    /**
     * A function that is used to send the data.
     */
    sender: Sender;
    /**
     * The name of the target client or a function that provides it.
     */
    targetClient: string | DataProvider<string>;
    /**
     * Unwarps a value.
     *
     * @param {T} val The value to unwrap.
     * @param {EventData} [args] Additional arguments if a value is a function.
     * @param {Number} [step] The current step (only for internal use).
     * @param {Number} maxSteps Maximum steps (only for internal use).
     *
     * @return {T} The unwrapped value.
     */
    unwrapValue<T>(val: T | DataProvider<T>, args?: EventData, step?: number, maxSteps?: number): T | DataProvider<T>;
}
