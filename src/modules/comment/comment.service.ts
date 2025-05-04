import { Comment } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";
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
const getCommentByUserId = async (userId: string) => {
  const result = await prisma.comment.findMany({
    where: { 
      userId: userId,
     },
 

  });
return result;
}
export const commentService = {
  createComment,
  getCommentId,
  getAllComment,
  getCommentByUserId,
};
