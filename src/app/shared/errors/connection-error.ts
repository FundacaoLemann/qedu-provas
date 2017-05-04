import MESSAGES from '../../core/shared/messages/messages';

export class ConnectionError extends Error {
  constructor(message?: string) {
    const msg = message ? message : MESSAGES.SYSTEM_NOT_AVAILABLE;
    const err: any = super(msg);
    (<any> this).name = err.name = 'ConnectionError';
    (<any> this).stack = err.stack;
    (<any> this).message = err.message;
  }
}
