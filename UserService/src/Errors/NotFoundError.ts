import HTTPStatusCode from '../Constants/HTTPStatusCode';
import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  constructor(description: string = 'Resource Not Found') {
    super('NOT FOUND', HTTPStatusCode.NOT_FOUND, description, true);
  }
}
