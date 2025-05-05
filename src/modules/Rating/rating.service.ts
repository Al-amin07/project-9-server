import status from "http-status";
import { Rating } from "../../../generated/prisma";
import AppError from "../../errors/AppError";

import prisma from '../../utils/prismaProvider';
import { IAuthUser } from "../../interface/usercommon";

const createRatingIntoDB = async (payload: Rating) => {
  const isRatingExist = await prisma.rating.findFirst({
    where: {
      userId: payload.userId,
      postId: payload.postId,
    },
  });
  if (isRatingExist) {
    throw new AppError(status.BAD_REQUEST, "You already rated this post");
  }
  const result = await prisma.rating.create({
    data: payload,
  });
  return result;
};

const getAllRating = async () => {
  const result = await prisma.rating.findMany({
    include:{
      post:{
        select:{
          id:true,
          title:true,
          description:true,
          image:true,
          createdAt:true,
          updatedAt:true,
        
        }
        
      },
      user:{
        select:{
          id:true,
          fullName:true,
          email:true,
         
          role:true,
          createdAt:true,
          updatedAt:true,
        }
      }
    }
  });
  return result;
};

const getSingleRating = async (id: string) => {
  const getSingleRatingresult = await prisma.rating.findUniqueOrThrow({
    where: { id },
  });
  return getSingleRatingresult;
};

// -------get myrating-------------
const getMyRating=async(
user:IAuthUser,
)=>{
  if(!user){
    throw new AppError(status.UNAUTHORIZED,'Unauthorized user')
  };
  const existingUser=await prisma.user.findUnique({
    where:{
      email:user?.email
    },
    select:{
      id:true,
    }
  });
  const result=await prisma.rating.findMany({
  where:{
  userId:existingUser?.id
}

  });
 return result;
}
export const RatingService = {
  createRatingIntoDB,
  getAllRating,
  getSingleRating,
  getMyRating,
};
