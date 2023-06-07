import sinon from 'sinon';
import UserInfoModel from '../../Models/UserInfoModel';
import UserInfoInterface from '../../Interfaces/UserInfoInterface';
import mongoose from 'mongoose';
import UserInfoService from '../../Services/UserInfoService';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AccountLoginInterface from '../../Interfaces/AccountLoginInterface';
import AccountLoginModel from '../../Models/AccountLoginModel';
import AccountLoginService from '../../Services/AccountLoginService';

use(chaiAsPromised);

describe('AccountLogin Service', () => {
  const userInfoService = new UserInfoService();
  const accountLoginService = new AccountLoginService();
  const userInfoModel = <any>UserInfoModel;
  const accountLoginModel = <any>AccountLoginModel;
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
  const newAccountLogin: AccountLoginInterface = {
    userName: 'accountlogin',
    password: 'password',
    userId: insertedUserInfo,
    lastLoginDateTime: new Date(),
  };
  const insertedAccountLogin = {
    _id: new mongoose.Types.ObjectId().toString(),
    ...newAccountLogin,
    createdAt: new Date(),
  };

  it('Should create a AccountLogin with UserInfo', async () => {
    sinon.stub(userInfoModel, 'create').returns(insertedUserInfo);
    sinon.stub(accountLoginModel, 'create').returns(insertedAccountLogin);
    const createdAccountLogin = await accountLoginService.create(newAccountLogin);
    expect(createdAccountLogin).to.be.an('object');
    expect(createdAccountLogin).to.have.property('userName', newAccountLogin.userName);
    expect(createdAccountLogin.userId).to.have.property('fullName', newUserInfo.fullName);
    expect(createdAccountLogin.userId).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(createdAccountLogin.userId).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(createdAccountLogin.userId).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should return all AccountLogin', async () => {
    sinon.stub(accountLoginModel, 'find').returns({
      select() {
        return this;
      },
      populate() {
        return [insertedAccountLogin];
      },
    });
    const accountLogins = await accountLoginService.read();
    expect(accountLogins[0]).to.be.an('object');
    expect(accountLogins[0]).to.be.have.property('userName', newAccountLogin.userName);
    const userInfo = accountLogins[0].userId;
    expect(userInfo).to.have.property('fullName', newUserInfo.fullName);
    expect(userInfo).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(userInfo).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(userInfo).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should return an AccountLogin by Id', async () => {
    sinon.stub(accountLoginModel, 'findById').returns({
      select() {
        return this;
      },
      populate() {
        return insertedAccountLogin;
      },
    });
    const accountLogin = await accountLoginService.readById(insertedAccountLogin._id);
    expect(accountLogin).to.be.an('object');
    expect(accountLogin).to.be.have.property('userName', newAccountLogin.userName);
    const userInfo = accountLogin?.userId;
    expect(userInfo).to.have.property('fullName', newUserInfo.fullName);
    expect(userInfo).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(userInfo).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(userInfo).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should update and return an updated AccountLogin', async () => {
    const updatedAccountLogin = {
      ...insertedAccountLogin,
      userName: 'updatedusername',
      updatedAt: new Date(),
    };
    sinon.stub(accountLoginModel, 'findByIdAndUpdate').returns({
      select() {
        return this;
      },
      populate() {
        return updatedAccountLogin;
      },
    });
    const accountLogin = await accountLoginService.update(insertedAccountLogin);
    expect(accountLogin).to.be.an('object');
    expect(accountLogin).to.have.property('userName', updatedAccountLogin.userName);
    expect(accountLogin).to.have.property('updatedAt', updatedAccountLogin.updatedAt);
  });

  it('Should delete and return a deleted AccountLogin', async () => {
    sinon.stub(accountLoginModel, 'findById').returns(insertedAccountLogin);
    sinon.stub(userInfoModel, 'findByIdAndDelete').returns(insertedAccountLogin);
    sinon.stub(accountLoginModel, 'findByIdAndDelete').returns(insertedAccountLogin);
    const deletedAccountLogin = await userInfoService.delete(insertedAccountLogin._id);
    expect(deletedAccountLogin).to.be.an('object');
    expect(deletedAccountLogin).to.have.property('userName', insertedAccountLogin.userName);
  });
});
