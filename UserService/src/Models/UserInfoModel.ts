import { model } from "mongoose";
import UserInfoInterface from "../Interfaces/UserInfoInterface";
import UserInfoSchema from "../Schemas/UserInfoSchema";

export default model<UserInfoInterface>('userinfos', UserInfoSchema);