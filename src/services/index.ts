import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import {access} from '../config/'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
import {mailEmail,mailPassword} from '../config'
export const accessToken = async (getId:string) => {
    const userId = getId;
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn: '24h',
        issuer: 'sourabh@gmail.com',
        audience: userId,
      };
      const payload = {};
      jwt.sign(payload, access, options, (err:any, token:any) => {
        if (err) {
          return reject({ message: 'Invalid operation!' });
        } else {
          resolve(token);
        }
      });
    });
}
export const bcryptPassword = async (password:string) => {
    const pass = await bcrypt.hash(password, 10);
    return pass;
}
export const bcryptPasswordMatch = async (user_pass:string, db_pass:string) => {
    const matchPass = await bcrypt.compare(user_pass, db_pass);
    return matchPass;
}
export const crypto_string = () => {
    return crypto.randomBytes(6).toString('hex'); 
};
export const sendMsgByMail = (email:any,format:any) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailEmail,
      pass: mailPassword,
    },
  });

  const mailOption = {
    from: mailEmail,
    to: email,
    subject: 'testing and testing',
    html: format,
  };

  transporter
    .sendMail(mailOption)
    .then((res:any) => {
    })
    .catch((err:any) => {
      console.log('mail not send ');
    });
};