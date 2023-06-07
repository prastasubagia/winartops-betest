import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
import accountLoginRouter from './Controllers/AccountLoginController';
import mongoose, { connect } from 'mongoose';
import { MONGO_URI } from './Utilities/Config';
import { error } from 'console';
import userInfoRouter from './Controllers/UserInfoController';

mongoose.set('strictQuery', true);
// Connect to MongoDB
connect(`${MONGO_URI}`, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error);

const app = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('UserService');
});

app.use('/account-login', accountLoginRouter);
app.use('/user-info', userInfoRouter);

app.listen(3000, () => {
  console.log('Application started on port 3000');
});
