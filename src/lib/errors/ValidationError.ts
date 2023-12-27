import { AppError } from './AppError';

/**
 * ValidationError is a custom error class that extends the base AppError class.
 * It is used to handle validation errors in the application.
 *
 * @extends {AppError}
 */
export default class ValidationError extends AppError {
  private static readonly _appErrorCode = 'validation_error';

  private static readonly _defaultMessage = 'Validation Error';
  private readonly _code: string;
  private readonly _logging: boolean;
  private readonly _context: Record<string, unknown>;

  /**
   * Constructs a new ValidationError instance.
   *
   * @param {Object} params - The parameters for the ValidationError.
   * @param {string} params.message - The error message.
   * @param {boolean} params.logging - Flag to determine if the error should be logged.
   * @param {Record<string, unknown>} params.context - Additional context for the error.
   */
  constructor(params?: {
    message?: string;
    logging?: boolean;
    context?: Record<string, unknown>;
  }) {
    const { message, logging, context } = params || {};
    super(message || ValidationError._defaultMessage);

    this._code = ValidationError._appErrorCode;
    this._logging = logging || false;
    this._context = context || {};

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get code() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
