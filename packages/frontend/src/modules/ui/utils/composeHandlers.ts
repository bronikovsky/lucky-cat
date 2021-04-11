import * as React from 'react';
import Logger from './Logger';

const logger = new Logger('composeHandlers');

type Handler<Args extends any[] = [React.SyntheticEvent], ReturnType = void> = (...args: Args) => ReturnType;

export default function composeHandlers<T extends any[], S>(
  ...handlers: (Handler<T, S> | undefined)[]
): Handler<T> {
  return (...args: T) => {
    handlers.filter(Boolean).forEach((_fn, index) => {
      const fn = (_fn as Handler<T, S>);

      try {
        (fn as Handler<T, S>)(...args);
      } catch (e) {
        logger.warn(`Uncaught exception in [${fn.name || 'anonymous function'}(${index})]`);
      }
    });
  };
}
