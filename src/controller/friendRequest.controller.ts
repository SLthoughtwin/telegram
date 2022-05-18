import { responseHandler } from "../config/errorHandler";
import ApiError from "../config/apierror";
import { Request, Response, NextFunction } from "express";
const { friend, User } = require("../db/models");
import * as Sequelize from "sequelize";
const Op = Sequelize.Op;

export const sendRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ids = [id, req.user.id];
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) {
      return next(new ApiError(400, "invalid user"));
    }
    if (findUser.email === req.userId) {
      return next(new ApiError(400, "you can not send request to yourselves"));
    }
    const findSender = await friend.findOne({
      where: { sender: { [Op.or]: ids }, receiver: { [Op.or]: ids } },
    });
    if (findSender) {
      if (findSender.status === "blocked") {
        return next(new ApiError(400, `user blocked`));
      }
      if (findSender.status === "accepted") {
        return next(
          new ApiError(400, `you  are already friend of this id ${id}`)
        );
      }
      if (
        findSender.sender === req.user.id &&
        findSender.status === "pending"
      ) {
        return next(
          new ApiError(400, `you have already send request to this id ${id}`)
        );
      }
      if (findSender.sender === id && findSender.status === "pending") {
        return next(
          new ApiError(400, `you have already request from this id ${id}`)
        );
      }
      const sendRequest = await friend.update(
        {
          sender: req.user.id,
          receiver: id,
        },
        {
          where: { sender: { [Op.or]: ids }, receiver: { [Op.or]: ids } },
        }
      );
      return responseHandler(200, "request send successfully", res, null);
    }
    const sendRequest = await friend.create({
      sender: req.user.id,
      receiver: id,
    });
    return responseHandler(200, "request send successfully", res, null);
  } catch (error: any) {
    console.log(error);
    return next(new ApiError(400, error.message));
  }
};

export const removeRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) {
      return next(new ApiError(400, "invalid user"));
    }
    const findRequest = await friend.findOne({
      where: { sender: id, receiver: req.user.id ,status: "pending"},
    });
    if (!findRequest) {
      return next(new ApiError(400, `you don't have any request`));
    }
    const removeRequest = await friend.destroy({
      where: { sender: id, receiver: req.user.id },
    });
    return responseHandler(
      200,
      "reject request successfully",
      res,
      removeRequest
    );
  } catch (error: any) {
    console.log(error);
    return next(new ApiError(400, error.message));
  }
};

export const acceptRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) {
      return next(new ApiError(400, "invalid user"));
    }
    const findRequest = await friend.findOne({
      where: { sender: id, receiver: req.user.id, status: "pending" },
    });
    if (!findRequest) {
      return next(new ApiError(400, "you do not have any request"));
    }

    const acceptRequest = await friend.update(
      { status: "accepted" },
      { where: { sender: id, receiver: req.user.id } }
    );
    return responseHandler(
      200,
      "accepted request successfully",
      res,
      acceptRequest
    );
  } catch (error: any) {
    console.log(error);
    return next(new ApiError(400, error.message));
  }
};

export const blockUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ids = [id, req.user.id];
    const findUser = await friend.findOne({
      where: { sender: { [Op.or]: ids }, receiver: { [Op.or]: ids } },
    });
    if (!findUser) {
      await friend.create({
        sender:req.user.id,
        receiver:id,
        status:'blocked'
      })
      return responseHandler(200, "block user successfully", res,null);
    }
    const blockUser = await friend.update(
      {status: 'blocked' },
      { where: { sender: { [Op.or]: ids }, receiver: { [Op.or]: ids } } }
    );
    return responseHandler(200, "block user successfully", res, blockUser);
  } catch (error: any) {
    return next(new ApiError(400, error.message));
  }
};

export const showRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const findRequest = await friend.findAll({
      where: { receiver: req.user.id, status: 'pending' },
    });
    if (!findRequest) {
      return responseHandler(200, "no request found", res, findRequest);
    }
    return responseHandler(200, "show request successfully", res, findRequest);
  } catch (error: any) {
    return next(new ApiError(400, error.message));
  }
};
