//Imports
import faqsModel from '../models/FaQs.js';

const faqsController = {}

//Select / Get
faqsController.getAllFaqs = async (req, res) => {
    try {
        const faqs = await faqsModel.find();
        res.status(200).json(faqs);
    } 
    catch (error) {
        console.error("Error fetching FAQs: ", error);
        res.status(400).json({message: "Internal Error"});
    }
}

//Insert / Post
faqsController.insertFaq = async (req, res) => {
    try {
        const { questions, answers, level, isActive } = req.body;
        //Validation
        if (level < 1 || level > 5) {
            return res.status(400).json({message: "Level must be between 1 and 5"});
        }

        if (!questions || !answers || !level || !isActive) {
            return res.status(400).json({message: "Required fields are missing"});
        }

        if (questions.length < 4 || answers.length < 4) {
            return res.status(400).json({message: "Questions and answers must be at least 4 characters long"});
        }

        const newFaq = new faqsModel({ questions, answers, level, isActive });
        await newFaq.save();
        res.json({ message: "FAQ Saved" });
    } 
    catch (error) {
        console.error("Error inserting FAQ: ", error);
        res.status(400).json({ message: "Internal Error" });
    }
}

//Delete
faqsController.deleteFaq = async (req, res) => {
    try {
        await faqsModel.findByIdAndDelete(req.params.id);
        res.json({ message: "FAQ Deleted" });
    } 
    catch (error) {
        console.error("Error deleting FAQ: ", error);
        res.status(400).json({ message: "Internal Error" });
    }
}

//Update / Put
faqsController.updateFaq = async (req, res) => {
    try {
        const { questions, answers, level, isActive } = req.body;
        //Validation
        if (level < 1 || level > 5) {
            return res.status(400).json({ message: "Level must be between 1 and 5" });
        }
        if (!questions || !answers || !level || !isActive) {
            return res.status(400).json({ message: "Required fields are missing" });
        }
        if (questions.length < 4 || answers.length < 4) {
            return res.status(400).json({ message: "Questions and answers must be at least 4 characters long" });
        }

        await faqsModel.findByIdAndUpdate(req.params.id, { questions, answers, level, isActive }, { new: true });
        res.json({ message: "FAQ Updated" });
    } 
    catch (error) {
        console.error("Error updating FAQ: ", error);
        res.status(400).json({ message: "Internal Error" });
    }
}

//Export
export default faqsController;