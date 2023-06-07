import { model } from 'mongoose';
import AccountLoginInterface from '../Interfaces/AccountLoginInterface';
import AccountLoginSchema from '../Schemas/AccountLoginSchema';

export default model<AccountLoginInterface>('accountlogins', AccountLoginSchema);
