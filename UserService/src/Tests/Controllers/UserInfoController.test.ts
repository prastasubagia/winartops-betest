import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dotenv from 'dotenv';
import sinon from 'sinon';
import mongoose from 'mongoose';
import UserInfoService from '../../Services/UserInfoService';
import UserInfoModel from '../../Models/UserInfoModel';
import UserInfoInterface from '../../Interfaces/UserInfoInterface';

chai.use(chaiHttp);
dotenv.config();

describe('UserInfo Controller', () => {
  const userInfoService = new UserInfoService();
  const userInfoModel = <any>UserInfoModel;
  const newUserInfo: UserInfoInterface = {
    fullName: 'New User Info',
    accountNumber: '0001',
    emailAddress: 'new.user.info@yopmail.com',
    registrationNumber: '0001',
  };
  const insertedUserInfo = {
    _id: new mongoose.Types.ObjectId().toString(),
    ...newUserInfo,
    createdAt: new Date(),
  };
  it('Should create user info', async () => {});
});
