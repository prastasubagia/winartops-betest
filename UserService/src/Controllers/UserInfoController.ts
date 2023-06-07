import { NextFunction, Response, Router } from 'express';
import UserInfoService from '../Services/UserInfoService';
import RequestInterface from '../Interfaces/RequestInterface';
import HTTPStatusCode from '../Constants/HTTPStatusCode';
import ProtectedRoute from '../Middlewares/ProtectedRouteMiddleware';
import AccountLoginService from '../Services/AccountLoginService';
import NotFoundError from '../Errors/NotFoundError';

const userInfoRouter: Router = Router();
const service = new UserInfoService();
const accountLoginService = new AccountLoginService();

userInfoRouter.post('/', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.create(req.body));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.get('/', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.read());
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.get(
  '/account-number/:accountnumber',
  ProtectedRoute(),
  async (req: RequestInterface, res: Response, next: NextFunction) => {
    try {
      res.status(HTTPStatusCode.OK).json(await service.readOneBy({ accountNumber: req.params.accountnumber }));
    } catch (error) {
      req.error = error;
      next(error);
    }
  }
);

userInfoRouter.get(
  '/registration-number/:registrationnumber',
  ProtectedRoute(),
  async (req: RequestInterface, res: Response, next: NextFunction) => {
    try {
      res.status(HTTPStatusCode.OK).json(await service.readOneBy({ registrationNumber: req.params.registrationnumber }));
    } catch (error) {
      req.error = error;
      next(error);
    }
  }
);

userInfoRouter.get('/three-days-login', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    const lessThanThreeDaysLoginAccountIds = await accountLoginService.readLessThanThreeDaysLoginIds();
    if (lessThanThreeDaysLoginAccountIds.length === 0) throw new NotFoundError('No Account Logged in Less Than 3 Days Found');
    res.status(HTTPStatusCode.OK).json(await service.readBy({ _id: { $in: lessThanThreeDaysLoginAccountIds } }));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.get('/:id', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.readById(req.params.id));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.patch('/', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.update(req.body));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

userInfoRouter.delete('/:id', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await service.delete(req.params.id));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

export default userInfoRouter;
