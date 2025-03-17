import express from "express";
import reviewsController from "../controllers/reviewsController.js";

const router = express.Router();

//Select and Insert
router.route("/")
    .get(reviewsController.getReviews)
    .post(reviewsController.insertReview)

//Update and Delete
router.route("/:id")
    .put(reviewsController.updateReview)
    .delete(reviewsController.deleteReview)

//Export
export default router;