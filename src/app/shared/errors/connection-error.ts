import MESSAGES from '../../core/shared/messages/messages';

export class ConnectionError extends Error {
  constructor(message?: string) {
    const msg = message ? message : MESSAGES.SYSTEM_NOT_AVAILABLE;
    super(msg);
  }
}
