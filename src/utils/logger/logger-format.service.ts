import styles, { ForegroundColor, Modifier } from 'ansi-styles';

type IMessage = string | boolean;

/**
 * @description
 * Utility to change the logs colour or the font style
 */
export class LoggerFormatService {
  public static whiteBright(message: Readonly<IMessage>): string {
    return this._format(message, `whiteBright`);
  }

  public static yellowBright(message: Readonly<IMessage>): string {
    return this._format(message, `yellowBright`);
  }

  /**
   * @description
   * Used for the links
   * @param {Readonly<IMessage>} message The message to display in magenta
   * @returns {string} The message in magenta
   */
  public static magenta(message: Readonly<IMessage>): string {
    return this._format(message, `magenta`);
  }

  /**
   * @description
   * Used for the values to highlight
   * @param {Readonly<IMessage>} message The message to display in cyan
   * @returns {string} The message in cyan
   */
  public static cyan(message: Readonly<IMessage>): string {
    return this._format(message, `cyan`);
  }

  public static yellow(message: Readonly<IMessage>): string {
    return this._format(message, `yellow`);
  }

  /**
   * @description
   * Used for standard text which is not important
   * @param {Readonly<IMessage>} message The message to display in white
   * @returns {string} The message in white
   */
  public static white(message: Readonly<IMessage>): string {
    return this._format(message, `white`);
  }

  /**
   * @description
   * Used for the successful messages
   * @param {Readonly<IMessage>} message The message to display in green
   * @returns {string} The message in green
   */
  public static green(message: Readonly<IMessage>): string {
    return this._format(message, `green`);
  }

  /**
   * @description
   * Used for the error messages
   * @param {Readonly<IMessage>} message The message to display in red
   * @returns {string} The message in red
   */
  public static red(message: Readonly<IMessage>): string {
    return this._format(message, `red`);
  }

  public static blue(message: Readonly<IMessage>): string {
    return this._format(message, `blue`);
  }

  public static bold(message: Readonly<IMessage>): string {
    return this._format(message, `bold`);
  }

  private static _format(message: Readonly<IMessage>, style: keyof Modifier | keyof ForegroundColor): string {
    return `${styles[style].open}${message}${styles[style].close}`;
  }
}