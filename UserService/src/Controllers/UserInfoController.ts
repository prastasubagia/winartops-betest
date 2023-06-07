import { NextFunction, Response, Router } from 'express';
import UserInfoService from '../Services/UserInfoService';
import RequestInterface from '../Interfaces/RequestInterface';
import HTTPStatusCode from '../Constants/HTTPStatusCode';

const userInfoRouter: Router = Router();
const service = new UserInfoService();

userInfoRouter.post('/', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.create(req.body));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.get('/', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.read());
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.get('/:id', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.readById(req.params.id));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.patch('/', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.update(req.body));
  } catch (error) {
    req.error = error;
    next(error);
  }
});
