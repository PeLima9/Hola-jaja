import express from "express";
import evaluationsController from "../controllers/evaluationsController.js";

const router = express.Router();

//Select and Insert
router.route("/")
    .get(evaluationsController.getEvaluations)
    .post(evaluationsController.insertEvaluation)

//Update and Delete
router.route("/:id")
    .put(evaluationsController.updateEvaluation)
    .delete(evaluationsController.deleteEvaluation)

//Export
export default router;
