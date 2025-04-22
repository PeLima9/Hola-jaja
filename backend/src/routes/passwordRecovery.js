//Imports
import express from "express";

//Router
const router = express.Router();

//Routes
router.route("/requestCode").post();
router.route("/verifyCode").post();
router.route("/resetPassword").post();

//Export
export default router;