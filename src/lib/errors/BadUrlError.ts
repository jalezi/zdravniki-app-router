import ValidationError from './ValidationError';

export default class BadUrlError extends ValidationError {
  private readonly _url: string;

  constructor(params?: {
    message?: string;
    logging?: boolean;
    context?: Record<string, unknown>;
    url: string;
  }) {
    const { message, logging, context, url } = params || {};
    super({
      message: message || 'Invalid URL',
      logging,
      context,
    });

    this._url = url || '';

    Object.setPrototypeOf(this, BadUrlError.prototype);
  }

  get url() {
    return this._url;
  }
}
