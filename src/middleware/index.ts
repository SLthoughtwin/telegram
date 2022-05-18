import jwt from 'jsonwebtoken'
import ApiError from '../config/apierror'
import {NextFunction} from 'express'
const {User} = require ('../db/models');
import {access} from '../config/'


export const accessTokenVerify = (req:any, _:any,next:NextFunction) => {
    const chickToken = (req:any) => {
      if (req.query.token) {
        return req.query.token;
      } else if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader?.split(' ');
        return bearerToken[1];
      } else {
        return false;
      }
    };
    const token = chickToken(req);
    if (token === false) {
        return next(new ApiError(400, 'A token is required for authentication'));
    } else {
      jwt.verify(token, access, async (error:any, payload:any) => {
        if (error) {
          return next(new ApiError(400, 'invalid token'));
        } else {
          const userId:string = payload.aud;
          const result = await User.findOne({where: { 
            email: userId
        }});
          if (!result) {
            return next(new ApiError(400, 'no user found this token'));
          }
          req.userId =  userId;
          req.user = result
          next();
        }
      });
    }
}

export const checkId = (req:any,res:any,next:NextFunction) =>{
  let { id } = req.params;
    id = id.replace(/['"]+/g, "");
    id = parseInt(id);
    if (Number.isNaN(id) === true) {
      return next(new ApiError(400, "id type must be integer"));
    }
    req.params.id = id
   next()
}