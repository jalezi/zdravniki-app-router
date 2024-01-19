import ValidationError from './ValidationError';
import { DoctorsCsv } from '../schemas';

type DoctorCsvProperties = keyof DoctorsCsv;

export default class BadDoctorError extends ValidationError {
  private readonly _doctorId: string | null | undefined;
  private readonly _properties: DoctorCsvProperties[];
  private readonly _doctorType: string | null | undefined;
  private readonly _doctorInstId: string | null | undefined;

  constructor(params?: {
    message?: string;
    logging?: boolean;
    context?: Record<string, unknown>;
    properties: DoctorCsvProperties[];
    doctorId?: string | null;
    doctorType?: string | null;
    doctorInstId?: string | null;
  }) {
    const { message, logging, context } = params || {};
    super({
      message: message || 'Invalid doctor',
      logging,
      context,
    });

    this._doctorId = params?.doctorId || '';
    this._properties = params?.properties || [];
    this._doctorType = params?.doctorType || '';
    this._doctorInstId = params?.doctorInstId || '';

    Object.setPrototypeOf(this, BadDoctorError.prototype);
  }

  get doctorId() {
    return this._doctorId;
  }

  get doctorType() {
    return this._doctorType;
  }

  get doctorInstId() {
    return this._doctorInstId;
  }

  get properties() {
    return this._properties;
  }
}
