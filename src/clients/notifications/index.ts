import { EventEmitter } from 'events';

let instance: NotificationsService | null = null;

class NotificationsService extends EventEmitter {
  constructor() {
    super();
    if (!instance) {
      // eslint-disable-next-line consistent-this
      instance = this;
    }
    return instance;
  }
}

export const notifications = new NotificationsService();

export enum AppEvents {
  AUTH_SIGN_IN = 'auth.sign_in',
  AUTH_SIGN_OUT = 'auth.sign_out',
  LEARN_PLAY = 'learn.play',
}
