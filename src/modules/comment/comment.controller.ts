import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { commentService } from "./comment.service";
import { JwtPayload } from "jsonwebtoken";
import pick from "../../utils/pick";

const createCommentIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await commentService.createComment(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: "comment created successfully",
    data: result,
  });
});
const getAllComment = catchAsync(async (req: Request, res: Response) => {
  const paginateQuery = pick(req.query, ["page", "limit"]);
  const result = await commentService.getAllComment(paginateQuery);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Comment get successfully",
    data: result.data,
    meta: result.meta,
  });
});
const getAllUsersComment = catchAsync(async (req: Request, res: Response) => {
  const paginateQuery = pick(req.query, ["page", "limit"]);

  console.log("paginateQuery", paginateQuery);
  const result = await commentService.getAllUsersComment(
    req.user as JwtPayload,
    paginateQuery
  );

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Comments get successfully",
    data: result.data,
    meta: result.meta,
  });
});
const getSingleCommentbyId = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await commentService.getCommentId(commentId);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "comment get id successfully",
    data: result,
  });
});
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await commentService.deleteComment(commentId);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "comment deleted successfully",
    data: result,
  });
});

export const commentController = {
  getSingleCommentbyId,
  getAllComment,
  createCommentIntoDB,
  getAllUsersComment,
  deleteComment,
};
