import AuthenticationError from '../Errors/AuthenticationError';
import { Request, Response, Express, NextFunction } from 'express';
import HTTPStatusCode from '../Constants/HTTPStatusCode';
import { Error as MongooseError } from 'mongoose';
import ErrorHandler from '../Errors/ErrorHandler';
import ValidationError from '../Errors/ValidationError';
import AccessDeniedError from '../Errors/AccessDeniedError';
import NotFoundError from '../Errors/NotFoundError';

const errorHandler = new ErrorHandler();

const authenticationErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AuthenticationError) {
    if (res.headersSent) return next(err);
    res.status(HTTPStatusCode.UNAUTHORIZED);
    res.json({
      status: HTTPStatusCode.UNAUTHORIZED,
      message: err.message,
      data: err,
    });
  } else {
    next(err);
  }
};

const validationErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError || err instanceof MongooseError.ValidationError) {
    if (res.headersSent) return next(err);
    res.status(HTTPStatusCode.BAD_REQUEST);
    res.json({
      status: HTTPStatusCode.BAD_REQUEST,
      message: err.message,
      data: err,
    });
  } else {
    next(err);
  }
};

const accessDeniedErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AccessDeniedError) {
    if (res.headersSent) return next(err);
    res.status(HTTPStatusCode.FORBIDDEN);
    res.json({
      status: HTTPStatusCode.FORBIDDEN,
      message: err.message,
      data: err,
    });
  } else {
    next(err);
  }
};

const notFoundErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof NotFoundError) {
    if (res.headersSent) return next(err);
    res.status(HTTPStatusCode.NOT_FOUND);
    res.json({
      status: HTTPStatusCode.NOT_FOUND,
      message: err.message,
      data: err,
    });
  } else {
    next(err);
  }
};

const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!errorHandler.isTrustedError(err)) {
    if (res.headersSent) return next(err);
    res.status(HTTPStatusCode.INTERNAL_SERVER);
    res.json({
      status: HTTPStatusCode.INTERNAL_SERVER,
      message: 'Internal Server Error',
      data: {
        name: 'INTERNAL SERVER ERROR',
        isOperational: false,
      },
    });
  } else {
    next();
  }
};

const errorHandlingMiddleware = (app: Express) => {
  app.use([
    authenticationErrorHandler,
    accessDeniedErrorHandler,
    validationErrorHandler,
    notFoundErrorHandler,
    genericErrorHandler,
  ]);
};

export default errorHandlingMiddleware;
