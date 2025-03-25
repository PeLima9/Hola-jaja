import express from "express";
import logoutController from "../controllers/logoutController.js";

//Router
const router = express.Router();

//Route
router.route("/").post(logoutController.logout);

//Export
export default router;