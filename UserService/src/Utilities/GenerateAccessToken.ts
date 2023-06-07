import jwt from 'jsonwebtoken';
import AccountLoginInterface from '../Interfaces/AccountLoginInterface';
import { SECRET, SYMMETRIC_ALGO, TOKEN_ISSUER, TOKEN_EXPIRES_IN } from './Config';

const generateAccessToken = (): string => {
  const timeToken = {
    loginTime: new Date(),
  };
  const payload = { timeToken };
  const privateKey = SECRET;
  const token = jwt.sign(payload, privateKey, {
    algorithm: SYMMETRIC_ALGO as jwt.Algorithm,
    issuer: TOKEN_ISSUER,
    expiresIn: TOKEN_EXPIRES_IN,
    subject: `${timeToken.loginTime.toISOString()}`,
  });

  return token;
};

export default generateAccessToken;
