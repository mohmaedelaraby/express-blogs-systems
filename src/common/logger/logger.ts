type LogLevel = 'info' | 'error' | 'warn' | 'debug';
type LogMetadata = Record<string, unknown>;

class Logger {
    private static instance: Logger;

    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance;
    }

    log(level: LogLevel, message: string, metadata: LogMetadata = {}) {
        const logObject = {
            level: level,
            message: message,
            timestamp: Date.now(),
            ...metadata
        }
        // This could call datadog logger
        console.log(JSON.stringify(logObject));
    }

    info(message: string, metadata: LogMetadata = {}) {
        this.log('info', message, metadata);
    }

    error(message: string, metadata: LogMetadata = {}) {
        this.log('error', message, metadata);
    }

    warn(message: string, metadata: LogMetadata = {}) {
        this.log('warn', message, metadata);
    }

    debug(message: string, metadata: LogMetadata = {}) {
        this.log('debug', message, metadata);
    }
}

const logger = new Logger();
export default logger;
