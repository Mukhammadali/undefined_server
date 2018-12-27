import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from './config';

export const signJWT = async user => {
  const payload = { id: user.id, email: user.email }; // , organization_id: user.organization_id, class_id: user.class_id, role: user.role};
  const options = {
    expiresIn: '7d',
    issuer: 'imagoapp.co.kr',
    subject: 'user',
  };
  const token = await jwt.sign(payload, config.SECRET, options);
  return token;
};

export const hashPassword = password =>
  bcrypt.hash(password, config.SALT_ROUNDS);

export const comparePasswords = async (inputPassword, oldPassword) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, oldPassword);
  return isPasswordValid;
};

export const verifyJWT = (token, cb) => jwt.verify(token, config.SECRET, cb);
