import express from "express";
import multer from "multer";
import blogController from "../controllers/blogController.js";

const router = express.Router();

//Configure Save Directory
const upload = multer({dest: "public/"})

router.route("/")
    .get(blogController.getAllPosts)
    .post(upload.single("image"),blogController.createPost)

export default router;