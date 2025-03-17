const reviewsController = {};
import reviewsModel from "../models/Reviews.js"

//Select / Get
reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find().populate("idClient");
    res.json(reviews);
}

//Insert / Post
reviewsController.insertReview = async (req, res) => {
    const {comment, rating, idClient} = req.body;
    const newReview = new reviewsModel({comment, rating, idClient});
    await newReview.save();
    res.json({message: "Review Saved"})
}

//Delete
reviewsController.deleteReview = async (req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Review Deleted"})
}

//Update / Put
reviewsController.updateReview = async (req, res) => {
    const {comment, rating, idClient} = req.body;
    await reviewsModel.findByIdAndUpdate(req.params.id,{comment, rating, idClient},{new: true});
    res.json({message: "Review Updated"})
}

//Export
export default reviewsController;