import { JwtPayload } from "jsonwebtoken";
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
const getAllComment = async (paginateQuery: Record<string, unknown>) => {
  const { page = 1, limit = 10 } = paginateQuery;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);
  const result = await prisma.comment.findMany({
    include: {
      post: {
        include: {
          category: true, // Assuming you want to include the category of the post
        },
      }, // Assuming you want to include the related post
      user: true, // Assuming you want to include the user who made the comment
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
  });
  return {
    data: result,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total: await prisma.comment.count({}),
      totalPages: Math.ceil((await prisma.comment.count({})) / Number(limit)),
    },
  };
};
const getAllUsersComment = async (
  payload: JwtPayload,
  paginateQuery: Record<string, unknown>
) => {
  const { page = 1, limit = 10 } = paginateQuery;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);
  const result = await prisma.comment.findMany({
    where: {
      userId: payload?.id,
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        include: {
          category: true, // Assuming you want to include the category of the post
        },
      }, // Assuming you want to include the related post
      user: true, // Assuming you want to include the user who made the comment
    },
  });
  return {
    data: result,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total: await prisma.comment.count({
        where: {
          userId: payload?.id,
        },
      }),
      totalPages: Math.ceil(
        (await prisma.comment.count({
          where: {
            userId: payload?.id,
          },
        })) / Number(limit)
      ),
    },
  };
};

const deleteComment = async (id: string) => {
  const result = await prisma.comment.delete({
    where: { id },
  });
  return result;
};

export const commentService = {
  createComment,
  getCommentId,
  getAllComment,
  getAllUsersComment,
  deleteComment,
};
