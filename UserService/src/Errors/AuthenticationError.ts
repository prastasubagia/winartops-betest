import HTTPStatusCode from '../Constants/HTTPStatusCode';
import BaseError from './BaseError';

export default class AuthenticationError extends BaseError {
  constructor(description: string = 'Unauthorized') {
    super('UNAUTHORIZED', HTTPStatusCode.UNAUTHORIZED, description, true);
  }
}