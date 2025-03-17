const evaluationsController = {};
import evaluationsModel from "../models/Evaluations.js";

//Select / Get
evaluationsController.getEvaluations = async (req, res) => {
    const evaluations = await evaluationsModel.find().populate("idEmployee");
    res.json(evaluations);
}

//Insert / Post
evaluationsController.insertEvaluation = async (req, res) => {
    const {comment, grade, role, idEmployee} = req.body;
    const newEvaluation = new evaluationsModel({comment, grade, role, idEmployee});
    await newEvaluation.save();
    res.json({message: "Evaluation Saved"});
}

//Delete
evaluationsController.deleteEvaluation = async (req, res) => {
    await evaluationsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Evaluation Removed"});
}

//Update / Put
evaluationsController.updateEvaluation = async (req, res) => {
    const {comment, grade, role, idEmployee} = req.body;
    await evaluationsModel.findByIdAndUpdate(req.params.id, {comment, grade, role, idEmployee}, {new: true});
}

//Export
export default evaluationsController;