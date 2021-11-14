import { createLogger, transports } from 'winston';

export const defaultLogger = () => createLogger({
  transports: [ new transports.Console()]
});

