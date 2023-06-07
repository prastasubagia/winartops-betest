import AccountLoginInterface from '../Interfaces/AccountLoginInterface';
import AccountLoginModel from '../Models/AccountLoginModel';
import bcrypt from 'bcrypt';
import UserInfoModel from '../Models/UserInfoModel';
import generateAccessToken from '../Utilities/GenerateAccessToken';

export default class AccountLoginService {
  async create(accountLogin: AccountLoginInterface) {
    accountLogin.password = await bcrypt.hash(accountLogin.password, 10);
    accountLogin.createdAt = new Date();
    return await AccountLoginModel.create(accountLogin);
  }

  async read() {
    return await AccountLoginModel.find().select('-password').populate('userId');
  }

  async readById(accountLoginId: string) {
    return await AccountLoginModel.findById(accountLoginId).select('-password').populate('userId');
  }

  async readLessThanThreeDaysLoginIds() {
    const today = new Date();
    const threeDaysEarlier = today.setDate(today.getDate() - 3);
    const result = await AccountLoginModel.find({ lastLoginDateTime: { $gt: threeDaysEarlier } });
    return result.map((accountLogin) => accountLogin.userId);
  }

  async update(updatedAccountLogin: AccountLoginInterface) {
    updatedAccountLogin.updatedAt = new Date();
    return await AccountLoginModel.findByIdAndUpdate(updatedAccountLogin._id, updatedAccountLogin, {
      new: true,
      runValidators: true,
    })
      .select('-password')
      .populate('userId');
  }

  async delete(accountLoginId: string) {
    const accountLogin = await AccountLoginModel.findById(accountLoginId);
    await UserInfoModel.findByIdAndDelete(accountLogin?.userId);
    return await AccountLoginModel.findByIdAndDelete(accountLoginId).select('-password');
  }

  async getToken() {
    return { token: generateAccessToken() };
  }
}
