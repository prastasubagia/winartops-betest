import AccountLoginInterface from '../Interfaces/AccountLoginInterface';
import AccountLoginModel from '../Models/AccountLoginModel';
import bcrypt from 'bcrypt';

export default class AccountLoginService {
  async create(accountLogin: AccountLoginInterface) {
    accountLogin.password = await bcrypt.hash(accountLogin.password, 10);
    accountLogin.createdAt = new Date();
    const saved = new AccountLoginModel(accountLogin);
    return saved.save();
  }

  async read() {
    const result = await AccountLoginModel.find().select('-password').populate('userId');
    return result;
  }

  async readById(accountLoginId: string) {
    const result = await AccountLoginModel.findById(accountLoginId).select('-password').populate('userId');
    return result;
  }

  async update(updatedAccountLogin: AccountLoginInterface) {
    const result = await AccountLoginModel.findByIdAndUpdate({ _id: updatedAccountLogin._id }, updatedAccountLogin, {
      new: true,
      runValidators: true,
    });
    return result;
  }

  async delete(accountLoginId: string) {
    const result = await AccountLoginModel.findOneAndDelete({ _id: accountLoginId });
    return result;
  }
}
