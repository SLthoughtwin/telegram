import dotenv from 'dotenv';
dotenv.config();
export const port:any= process.env.PORT;
export const pgUser:any= process.env.USER_NAME
export const pgHost:any= process.env.HOST_NAME
export const pgDB:any = process.env.DATABASE_NAME
export const pgPass:any = process.env.PG_PASSWORD
export const pgPort:any = process.env.PG_PORT
export const access:any = process.env.ACCESS_TOKEN
export const mailEmail:any = process.env.MAIL_EMAIL
export const mailPassword = process.env.MAIL_PASSWORD