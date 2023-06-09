import QueryInterface from '../Interfaces/QueryInterface';
import UserInfoInterface from '../Interfaces/UserInfoInterface';
import UserInfoModel from '../Models/UserInfoModel';

export default class UserInfoService {
  async create(userInfo: UserInfoInterface) {
    userInfo.createdAt = new Date();
    return await UserInfoModel.create(userInfo);
  }

  async read() {
    return await UserInfoModel.find();
  }

  async readById(userInfoId: string) {
    return await UserInfoModel.findById(userInfoId);
  }

  async readBy(filter: QueryInterface) {
    return await UserInfoModel.find(filter);
  }

  async readOneBy(filter: QueryInterface) {
    return await UserInfoModel.findOne(filter);
  }

  async update(updatedUserInfo: UserInfoInterface) {
    return await UserInfoModel.findByIdAndUpdate(updatedUserInfo._id, updatedUserInfo, {
      new: true,
      runValidators: true,
    });
  }

  async delete(userInfoId: string) {
    return await UserInfoModel.findByIdAndDelete(userInfoId);
  }
}
