import * as dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || '';
export const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'smebusman_backend';
export const SECRET = process.env.SECRET || ' ';
export const SYMMETRIC_ALGO = process.env.SYMMETRIC_ALGO || 'HS256';
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '1h';
