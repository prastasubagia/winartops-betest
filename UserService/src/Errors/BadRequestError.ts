import HTTPStatusCode from '../Constants/HTTPStatusCode';
import BaseError from './BaseError';

export default class BadRequestError extends BaseError {
  constructor(description: string = 'Bad Request') {
    super('BAD_REQUEST', HTTPStatusCode.BAD_REQUEST, description, true);
  }
}