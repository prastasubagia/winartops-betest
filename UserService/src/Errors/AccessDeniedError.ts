import HTTPStatusCode from '../Constants/HTTPStatusCode';
import BaseError from './BaseError';

export default class AccessDeniedError extends BaseError {
  constructor(description: string = 'Access Denied') {
    super('FORBIDDEN', HTTPStatusCode.FORBIDDEN, description, true);
  }
}
