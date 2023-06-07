import { Schema } from 'mongoose';
import UserInfoInterface from '../Interfaces/UserInfoInterface';

const schema = new Schema<UserInfoInterface>({
  fullName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});
export default schema;
