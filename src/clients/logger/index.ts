import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
// import functions from '@react-native-firebase/functions';

// const functionInstance = functions().httpsCallable('logger');

const convertArgsToString = (...args: any[]): string =>
  args.reduce(
    (total, currentValue) => (total += `${JSON.stringify(currentValue)}\n`),
    '',
  );

/**
 * Logger
 */
class Logger {
  private logs: object[] = [];
  private context?: object = {};
  private timer?: NodeJS.Timeout;

  constructor() {
    if (!instance) {
      // eslint-disable-next-line consistent-this
      instance = this;
      // if (!this.timer) {
      //   this.timer = setInterval(this.send.bind(this), 10000);
      // }
    }
    return instance;
  }

  setContext(context: object): void {
    if (this.context) {
      this.context = { ...this.context, ...context };
    } else {
      this.context = { context };
    }
  }

  debug(...args: any[]): void {
    crashlytics().log(convertArgsToString(args));
    // try {
    //   this.logs.push({
    //     logType: 'debug',
    //     logArgs: args,
    //     logContext: this.context,
    //     logCreated: new Date().toLocaleString('en-US', {
    //       timeZone: 'America/New_York',
    //     }),
    //   });
    // } catch (error) {
    //   console.log('Logger - debug error: ', error);
    // }
  }

  info(...args: any[]): void {
    crashlytics().log(convertArgsToString(args));
    // try {
    //   this.logs.push({
    //     logType: 'info',
    //     logArgs: args,
    //     logContext: this.context,
    //     logCreated: new Date().toLocaleString('en-US', {
    //       timeZone: 'America/New_York',
    //     }),
    //   });
    // } catch (error) {
    //   console.log('Logger - info error: ', error);
    // }
  }

  warn(...args: any[]): void {
    crashlytics().log(convertArgsToString(args));
    // try {
    //   this.logs.push({
    //     logType: 'warn',
    //     logArgs: args,
    //     logContext: this.context,
    //     logCreated: new Date().toLocaleString('en-US', {
    //       timeZone: 'America/New_York',
    //     }),
    //   });
    // } catch (error) {
    //   console.log('Logger - warn error: ', error);
    // }
  }

  error(...args: any[]): void {
    crashlytics().recordError(new Error(convertArgsToString(args)));
    // try {
    //   this.logs.push({
    //     logType: 'error',
    //     logArgs: args,
    //     logContext: this.context,
    //     logCreated: new Date().toLocaleString('en-US', {
    //       timeZone: 'America/New_York',
    //     }),
    //   });
    // } catch (error) {
    //   console.log('Logger - error: ', error);
    // }
  }

  event(eventName: string, eventParams?: object): void {
    try {
      analytics().logEvent(eventName, {
        ...this.context,
        ...eventParams,
      });
    } catch (error) {
      console.log('Logger - event error: ', error);
    }
  }

  // async send(): Promise<void> {
  //   console.log(`Sending ${this.logs.length} logs...`);
  //   if (this.logs.length > 0) {
  //     try {
  //       functionInstance({ logs: this.logs });
  //     } catch (error) {
  //       console.log('Logger - send error', error);
  //     } finally {
  //       this.logs = [];
  //     }
  //   }
  // }
}

let instance: Logger | null = null;

export const log = new Logger();
