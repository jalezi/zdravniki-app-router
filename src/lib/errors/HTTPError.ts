import { AppError } from './AppError';

/**
 * HTTPError is a custom error class that extends the base AppError class.
 * It is used to handle HTTP related errors in the application.
 *
 * @extends {AppError}
 */
export default class HTTPError extends AppError {
  private static readonly _appErrorCode = 'http_error';
  private static readonly _defaultStatusCode = 400;
  private static readonly _defaultMessage = 'Bad Request';
  private readonly _code: string;
  private readonly _statusCode: number;
  private readonly _logging: boolean;
  private readonly _context: Record<string, unknown>;

  /**
   * Constructs a new HTTPError instance.
   *
   * @param {Object} params - The parameters for the HTTPError.
   * @param {string} params.message - The error message.
   * @param {number} params.code - The HTTP status code for the error.
   * @param {boolean} params.logging - Flag to determine if the error should be logged.
   * @param {Record<string, unknown>} params.context - Additional context for the error.
   */
  constructor(params?: {
    message?: string;
    code?: number;
    logging?: boolean;
    context?: Record<string, unknown>;
  }) {
    const { code, message, logging, context } = params || {};
    super(message || HTTPError._defaultMessage);

    this._code = HTTPError._appErrorCode;
    this._statusCode = code || HTTPError._defaultStatusCode;
    this._logging = logging || false;
    this._context = context || {};

    Object.setPrototypeOf(this, HTTPError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._statusCode;
  }

  get code() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
