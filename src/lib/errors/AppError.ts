export type AppErrorContent = {
  message: string;
  context?: Record<string, unknown>;
};

export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly errors: AppErrorContent[];
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
