import { JwtPayload } from "jsonwebtoken";
import { Comment } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";
import { User } from '../../../generated/prisma/index';
const createComment = async (payload: Comment) => {
  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};
const getCommentId = async (id: string) => {
  const result = await prisma.comment.findUniqueOrThrow({
    where: { id },
  });
  return result;
};
const getAllComment = async () => {
  const result = await prisma.comment.findMany({});
  return result;
};
// -----------get commentby userId-------------
const getCommentsByUserId = async (userId: string) => {
  return await prisma.comment.findMany({
 include:{
  post:{
    select:{
      id:true,
      title:true,
    },
  },
  user:{
    select:{
      id:true,
      email:true,
    },
  }
 },
 orderBy:{
  createdAt:"desc"
 }
  });
};


export const commentService = {
  createComment,
  getCommentId,
  getAllComment,
  getCommentsByUserId,
};
