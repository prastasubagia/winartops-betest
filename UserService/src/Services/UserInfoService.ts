import UserInfoInterface from "../Interfaces/UserInfoInterface";
import UserInfoModel from "../Models/UserInfoModel";

export default class UserInfoService {
  async create(userInfo: UserInfoInterface) {
    const saved = new UserInfoModel(userInfo);
    return saved.save();
  }

  async read(){
    const result = await UserInfoModel.find();
    return result;
  }

  async readById(userInfoId: string) {
    const result = await UserInfoModel.findById(userInfoId);
    return result;
  }

  async update(updatedUserInfo: UserInfoInterface){
    const result = await UserInfoModel.findByIdAndUpdate(
      { _id: updatedUserInfo._id }, 
      updatedUserInfo, 
      { new: true, runValidators: true }
    );
    return result;
  }

  async delete(userInfoId: string){
    const result = await UserInfoModel.findOneAndDelete({ _id: userInfoId });
    return result;
  }
}