enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(`[${LogLevel.DEBUG}] ${message}`, data);
    }
  }

  info(message: string, data?: any): void {
    console.log(`[${LogLevel.INFO}] ${message}`, data);
  }

  warn(message: string, data?: any): void {
    console.warn(`[${LogLevel.WARN}] ${message}`, data);
  }

  error(message: string, error?: any): void {
    console.error(`[${LogLevel.ERROR}] ${message}`, error);
    
    if (!this.isDevelopment && error) {
      this.sendToLoggingService(message, error);
    }
  }

  private sendToLoggingService(message: string, error: any): void {
    console.log('Enviando error a servicio de logging...', { message, error });
  }

  performance(label: string, startTime: number, endTime: number): void {
    const duration = endTime - startTime;
    this.debug(`Performance [${label}]: ${duration}ms`);
  }

  apiCall(method: string, url: string, status?: number, duration?: number): void {
    const logMessage = `API ${method} ${url}${status ? ` - Status: ${status}` : ''}${
      duration ? ` - ${duration}ms` : ''
    }`;
    
    if (status && status >= 400) {
      this.warn(logMessage);
    } else {
      this.debug(logMessage);
    }
  }
}

export const logger = new Logger();

export default logger;
