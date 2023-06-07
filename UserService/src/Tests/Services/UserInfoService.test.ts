import sinon from 'sinon';
import UserInfoModel from '../../Models/UserInfoModel';
import UserInfoInterface from '../../Interfaces/UserInfoInterface';
import mongoose from 'mongoose';
import UserInfoService from '../../Services/UserInfoService';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

describe('UserInfo Service', () => {
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

  it('Should create a UserInfo', async () => {
    sinon.stub(userInfoModel, 'create').returns(insertedUserInfo);
    const createdUserInfo = await userInfoService.create(newUserInfo);
    expect(createdUserInfo).to.be.an('object');
    expect(createdUserInfo).to.have.property('fullName', newUserInfo.fullName);
    expect(createdUserInfo).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(createdUserInfo).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(createdUserInfo).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should return all UserInfo', async () => {
    sinon.stub(userInfoModel, 'find').returns([insertedUserInfo]);
    const userInfos = await userInfoService.read();
    expect(userInfos[0]).to.be.an('object');
    expect(userInfos[0]).to.have.property('fullName', newUserInfo.fullName);
    expect(userInfos[0]).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(userInfos[0]).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(userInfos[0]).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should return a UserInfo by Id', async () => {
    sinon.stub(userInfoModel, 'findById').returns(insertedUserInfo);
    const createdUserInfo = await userInfoService.readById(insertedUserInfo._id);
    expect(createdUserInfo).to.be.an('object');
    expect(createdUserInfo).to.have.property('fullName', newUserInfo.fullName);
    expect(createdUserInfo).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(createdUserInfo).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(createdUserInfo).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should return all UserInfo with list of ids filter', async () => {
    sinon.stub(userInfoModel, 'find').returns([insertedUserInfo]);
    const userInfos = await userInfoService.readBy({ _id: { $in: [new mongoose.Types.ObjectId(insertedUserInfo._id)] } });
    expect(userInfos[0]).to.be.an('object');
    expect(userInfos[0]).to.have.property('fullName', newUserInfo.fullName);
    expect(userInfos[0]).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(userInfos[0]).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(userInfos[0]).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should return a UserInfo with accountNumber filter', async () => {
    sinon.stub(userInfoModel, 'findOne').returns(insertedUserInfo);
    const createdUserInfo = await userInfoService.readOneBy({ accountNumber: insertedUserInfo.accountNumber });
    expect(createdUserInfo).to.be.an('object');
    expect(createdUserInfo).to.have.property('fullName', newUserInfo.fullName);
    expect(createdUserInfo).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(createdUserInfo).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(createdUserInfo).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should return a UserInfo with registrationNumber filter', async () => {
    sinon.stub(userInfoModel, 'findOne').returns(insertedUserInfo);
    const createdUserInfo = await userInfoService.readOneBy({ registrationNumber: insertedUserInfo.registrationNumber });
    expect(createdUserInfo).to.be.an('object');
    expect(createdUserInfo).to.have.property('fullName', newUserInfo.fullName);
    expect(createdUserInfo).to.have.property('accountNumber', newUserInfo.accountNumber);
    expect(createdUserInfo).to.have.property('emailAddress', newUserInfo.emailAddress);
    expect(createdUserInfo).to.have.property('registrationNumber', newUserInfo.registrationNumber);
  });

  it('Should update and return an updated UserInfo', async () => {
    const updatedUserInfo = {
      ...insertedUserInfo,
      fullName: 'Updated User Info',
      updatedAt: new Date(),
    };
    sinon.stub(userInfoModel, 'findByIdAndUpdate').returns(updatedUserInfo);
    const userInfo = await userInfoService.update(insertedUserInfo);
    expect(userInfo).to.be.an('object');
    expect(userInfo).to.have.property('fullName', updatedUserInfo.fullName);
    expect(userInfo).to.have.property('accountNumber', updatedUserInfo.accountNumber);
    expect(userInfo).to.have.property('emailAddress', updatedUserInfo.emailAddress);
    expect(userInfo).to.have.property('registrationNumber', updatedUserInfo.registrationNumber);
    expect(userInfo).to.have.property('updatedAt', updatedUserInfo.updatedAt);
  });

  it('Should delete and return a deleted UserInfo', async () => {
    sinon.stub(userInfoModel, 'findByIdAndDelete').returns(insertedUserInfo);
    const deletedUserInfo = await userInfoService.delete(insertedUserInfo._id);
    expect(deletedUserInfo).to.be.an('object');
    expect(deletedUserInfo).to.have.property('fullName', insertedUserInfo.fullName);
    expect(deletedUserInfo).to.have.property('accountNumber', insertedUserInfo.accountNumber);
    expect(deletedUserInfo).to.have.property('emailAddress', insertedUserInfo.emailAddress);
    expect(deletedUserInfo).to.have.property('registrationNumber', insertedUserInfo.registrationNumber);
  });
});
