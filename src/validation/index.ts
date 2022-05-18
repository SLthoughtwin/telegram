import Joi from 'joi'
import ApiError from '../config/apierror'
import {Request,NextFunction} from 'express'


export const userValidation = (req:Request,_:any,next:NextFunction) => {
    const user = (user:any) => {
      const JoiSchema = Joi.object({
        email: Joi.string().trim().email().max(50).required(),
        fullName: Joi.string().trim().min(3).max(30),
        password: Joi.string().trim().min(5).max(30).required(),
      });
      return JoiSchema.validate(user);
    };
    const response:any = user(req.body);
    const error:any = response.error
    if (error) {
      const msg = error.details[0].message.replace(/[^a-zA-Z0-9]/g, ' ');
      return next(new ApiError(400, msg));
    } else {
      next();
    }
};

export const verifyOtpValidation = (req:Request,_:any,next:NextFunction) => {
  const user = (user:any) => {
    const JoiSchema = Joi.object({
      email: Joi.string().trim().email().max(50).required(),
      otp: Joi.number().strict().required(),
    });
    return JoiSchema.validate(user);
  };
  const response:any = user(req.body);
  const error:any = response.error
  if (error) {
    const msg = error.details[0].message.replace(/[^a-zA-Z0-9]/g, ' ');
    return next(new ApiError(400, msg));
  } else {
    next();
  }
};

