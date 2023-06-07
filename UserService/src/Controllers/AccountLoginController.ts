import { Response, NextFunction, Router } from 'express';
import AccountLoginService from '../Services/AccountLoginService';
import HTTPStatusCode from '../Constants/HTTPStatusCode';
import RequestInterface from '../Interfaces/RequestInterface';
import UserInfoService from '../Services/UserInfoService';
import ProtectedRoute from '../Middlewares/ProtectedRouteMiddleware';

const accountLoginRouter: Router = Router();
const accountLoginService = new AccountLoginService();
const userInfoService = new UserInfoService();

accountLoginRouter.post('/', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    req.body.userInfo.createdAt = new Date();
    const newUserInfo = await userInfoService.create(req.body.userInfo);
    req.body.accountLogin = {
      createdAt: new Date(),
      userId: newUserInfo._id,
      ...req.body.accountLogin,
    };
    const newAccountLogin = await accountLoginService.create(req.body.accountLogin);
    newAccountLogin.password = '';
    res.status(HTTPStatusCode.OK).json(newAccountLogin);
  } catch (error) {
    req.error;
    next(error);
  }
});

accountLoginRouter.get('/', ProtectedRoute(),
  async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.read());
  } catch (error) {
    req.error = error;
    next(error);
  }
});

accountLoginRouter.get('/get-token', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.getToken());
  } catch (error) {
    req.error = error;
    next(error);
  }
});

accountLoginRouter.get('/:id', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.readById(req.params.id));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

accountLoginRouter.patch('/', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.update(req.body));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

accountLoginRouter.delete('/:id', ProtectedRoute(), async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.delete(req.params.id));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

export default accountLoginRouter;
