import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import ErrorHandlingMiddleware from '../Middlewares/ErrorHandlingMiddleware';
import accountLoginRouter from '../Controllers/AccountLoginController';
import userInfoRouter from '../Controllers/UserInfoController';

dotenv.config();

const app: Express = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/account-login', accountLoginRouter);
app.use('/user-info', userInfoRouter);

// Error handling middleware
ErrorHandlingMiddleware(app);

export default app;
