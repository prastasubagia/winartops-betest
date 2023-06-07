import { NextFunction, Response } from 'express';
import passport from 'passport';
import RequestInterface from '../Interfaces/RequestInterface';
import AuthenticationError from '../Errors/AuthenticationError';

const ProtectedRoute = () => {
  return (req: RequestInterface, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (_error: any, timeToken: any, _info: any) => {
      if (!timeToken) next(new AuthenticationError());
      next();
    })(req, res, next);
  };
};

export default ProtectedRoute;
