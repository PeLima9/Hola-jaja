import blogModel from "../models/blog.js";
import {v2 as cloudinary} from "cloudinary";

import {config} from "../config.js";

//Cloudinary Config
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

//Controller
const blogController = {}

//Select / Get
blogController.getAllPosts = async (req, res) => {
    const posts = await blogModel.find()
    res.json(posts)
}

//Insert / Post
blogController.createPost = async (req, res) => {
    try {
        const {title, content} = req.body;

        let imageUrl = ""

        if (req.file){
            const result = await cloudinary.uploader.upload(
                req.file.path, 
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            );
            imageUrl = result.secure_url
        };
        
        const newPost = new blogModel({title, content, image: imageUrl})
        newPost.save()

        res.json({message: "Post Saved"})
    } 

    catch (error) {
        console.log("Error: " + error)
    }
}

//Export
export default blogController;