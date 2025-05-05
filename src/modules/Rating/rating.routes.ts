import express from "express";
import { ratingController } from "./rating.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.get("/", ratingController.getAllRating);
router.get("/:ratingId", ratingController.getSingleRating);
router.get("/my-rating",auth(UserRole.ADMIN,UserRole.PREMIUM,UserRole.USER), ratingController.getMyRating);
router.post("/", ratingController.createRatingIntoDB);

export const ratingRoutes = router;
