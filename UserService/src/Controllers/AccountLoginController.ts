import { Response, NextFunction, Router } from "express";
import AccountLoginService from "../Services/AccountLoginService";
import HTTPStatusCode from "../Constants/HTTPStatusCode";
import RequestInterface from "../Interfaces/RequestInterface";
import UserInfoService from "../Services/UserInfoService";

const accountLoginRouter: Router = Router();
const accountLoginService = new AccountLoginService();
const userInfoService = new UserInfoService();

accountLoginRouter.post('/', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    const newUserInfo = await userInfoService.create({
      createdAt: new Date(),
      ...req.body.userInfo
    });
    let newAccountLogin = req.body.accountLogin;
    newAccountLogin = {
      userId: newUserInfo._id,
      ...newAccountLogin
    }
    newAccountLogin = await accountLoginService.create(newAccountLogin);
    newAccountLogin.password = '';
    res.status(HTTPStatusCode.OK).json(newAccountLogin);
  } catch (error) {
    req.error;
    next(error);
  }
})

accountLoginRouter.get('/', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.read());
  } catch (error) {
    req.error = error;
    next(error);
  }
});

accountLoginRouter.get('/:id', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.readById(req.params.id));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

accountLoginRouter.patch('/', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.update(req.body));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

accountLoginRouter.delete('/:id', async (req: RequestInterface, res: Response, next: NextFunction) => {
  try {
    res.status(HTTPStatusCode.OK).json(await accountLoginService.delete(req.params.id));
  } catch (error) {
    req.error = error;
    next(error);
  }
});

export default accountLoginRouter;