import { Schema } from 'mongoose';
import AccountLoginInterface from '../Interfaces/AccountLoginInterface';

const schema = new Schema<AccountLoginInterface>({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLoginDateTime: {
    type: Date,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'userinfos',
    required: false,
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
