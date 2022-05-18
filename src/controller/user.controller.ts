import { responseHandler } from "../config/errorHandler";
import ApiError from "../config/apierror";
import { Request, Response, NextFunction } from "express";
const { User } = require("../db/models");
import {
  accessToken,
  bcryptPasswordMatch,
  bcryptPassword,
  sendMsgByMail,
} from "../services";
import { Op } from "sequelize";
import { format, otp } from "../template";
export const userSignupAndLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      password,
      email,
      fullName,
    }: { password: string; email: string; fullName?: string } = req.body;
    const email1 = email.trim();
    const password1 = password.trim();
    const fullName1 = fullName?.trim();
    const findUser = await User.findOne({
      where: {
        email: email1,
      },
    });
    if (!findUser) {
      if (!fullName1) {
        return next(new ApiError(400, "fullName required"));
      }
      const bcryptPass = await bcryptPassword(password1);
      const createUser = await User.create({
        email: email1,
        password: bcryptPass,
        fullName: fullName1,
        otp,
      });
      await sendMsgByMail(email1, format);
      return responseHandler(
        200,
        "please check your mail and verify otp",
        res,
        null
      );
    }
    if (findUser.isVerified === false) {
      return next(new ApiError(400, "please verified otp"));
    }
    const emailDB = findUser.email;
    const passwordDB = findUser.password;
    const match = await bcryptPasswordMatch(password1, passwordDB);
    if (match === true && email1 === emailDB) {
      const token = await accessToken(req.body.email);
      await User.update({ isVerified: true }, { where: { email: email1 } });
      return responseHandler(200, "login successfully", res, token);
    }
    return next(new ApiError(400, "invalid login details"));
  } catch (error: any) {
    console.log(error);
    return next(new ApiError(400, error.message));
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp }: { email: string; otp: number } = req.body;
    const email1 = email.trim();
    const findUser = await User.findOne({
      where: {
        email: email1,
      },
    });
    if (!findUser) {
      return next(new ApiError(400, "invalid email"));
    }
    const emailDB = findUser.email;
    const otpDB = findUser.otp;
    if (findUser.isVerified === true) {
      return next(new ApiError(400, "already verified"));
    }
    if (otpDB === otp && email1 === emailDB) {
      const token = await accessToken(req.body.email);
      await User.update({ isVerified: true }, { where: { email: email1 } });
      return responseHandler(200, "login successfully", res, token);
    }
    return next(new ApiError(400, "invalid otp"));
  } catch (error: any) {
    return next(new ApiError(400, error.message));
  }
};

export const showUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const email = req.userId;
    const { search = "" } = req.query;
    const findUser = await User.findAll({
      where: {
        fullName: { [Op.iLike]: `%${search}%` },
        email: { [Op.ne]: email },
      },
      attributes: ["fullName", "email", "id"],
    });
    return responseHandler(200, "find All User successfully", res, findUser);
  } catch (error: any) {
    console.log(error);
    return next(new ApiError(400, error.message));
  }
};
