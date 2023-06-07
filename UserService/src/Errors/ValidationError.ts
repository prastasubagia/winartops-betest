import HTTPStatusCode from "../Constants/HTTPStatusCode"
import BaseError from "./BaseError"

export default class ValidationError extends BaseError{
    constructor(description: string = 'Bad Request') {
        super('BAD REQUEST', HTTPStatusCode.BAD_REQUEST, description, true)
    }
}