import express from "express";
import { commentController } from "./comment.controller";
import validateRequest from "../../utils/validateRequest";
import { commentValidation } from "./comment.validation";
import auth from '../../middlewares/auth';
import { UserRole } from "../../../generated/prisma";
const router = express.Router();
router.get("/", commentController.getAllComment);
router.get("/:commentId",
   commentController.getSingleCommentbyId);
router.get(
  "/usercomments",
  auth(UserRole.ADMIN, UserRole.USER, UserRole.PREMIUM),
  commentController.getCommentByUserId
);

router.post(
  "/",
  validateRequest(commentValidation.createCommentSchema),
  commentController.createCommentIntoDB
);



export const commentRoutes = router;
