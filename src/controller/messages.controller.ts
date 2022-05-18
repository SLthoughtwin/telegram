import { responseHandler } from "../config/errorHandler";
import ApiError from "../config/apierror";
import { Request, Response, NextFunction } from "express";
const { friend, User, Message } = require("../db/models");
import { Op } from "sequelize";

export const sendMessage = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const ids = [id, req.user.id];
    if (req.user.id === id) {
      return next(new ApiError(400, "you can not send message to yourselves"));
    }
    if (!message) {
      return next(new ApiError(400, "message is required"));
    }
    const findUser = await User.findOne({ where: { id: id } });
    if (!findUser) {
      return next(new ApiError(400, "invalid user"));
    }
    const findRequest = await friend.findOne({
      where: {
        sender: { [Op.or]: ids },
        receiver: { [Op.or]: ids },
        status: "accepted",
      },
    });
    if (!findRequest) {
      return next(new ApiError(400, "you are not friend of this id"));
    }
    const sendMessage = await Message.create({
      To: id,
      FROM: req.user.id,
      conversationId: findRequest.id,
      message,
    });
    return responseHandler(200, "Message send successfully", res, sendMessage);
  } catch (error: any) {
    return next(new ApiError(400, error.message));
  }
};

export const showMessage = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { search = "" } = req.query;
    const ids = [id, req.user.id];
    const findMessage = await Message.findAll({
      where: {
        To: { [Op.or]: ids },
        FROM: { [Op.or]: ids },
        isDeleted:true,
        message: { [Op.iLike]: `%${search}%` },
      },
      attributes: ["id", "To", "FROM", "message"],include:[{
        model:User,
        as:'msgSender',attributes:['fullName']
      }]
    });
    if (!findMessage) {
      return next(new ApiError(400, "there is no message yet"));
    }
    return responseHandler(200, "Message show successfully", res, findMessage);
  } catch (error: any) {
    return next(new ApiError(400, error.message));
  }
};

export const deleteMessage = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const findMessage = await Message.findOne({
      where: { id, FROM: req.user.id },
    });
    if (!findMessage) {
      return next(new ApiError(400, "there is no message yet"));
    }
    const deleteIds = findMessage.deleteBy
    deleteIds.push(req.user.id)
    await Message.update({deleteBy:deleteIds,isDeleted:true},{
      where: { id, FROM: req.user.id },
    });
    return responseHandler(
      200,
      "Message delete successfully",
      res,
      null
    );
  } catch (error: any) {
    return next(new ApiError(400, error.message));
  }
};
