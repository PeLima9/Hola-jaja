//Array para definir funciones
const productsController = {};
import productsModel from "../models/Products.js";

//Select / Get
productsController.getProducts = async(req, res) => {
    const products = await productsModel.find()
    res.json(products);
};

//Insert / Post
productsController.insertProduct = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const newProduct = new productsModel({ name, description, price, stock });
    await newProduct.save();
    res.json({ message: "Product created" });
};

//Delete
productsController.deleteProduct = async (req,res) => {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Product deleted"});
};

//Update / Put
productsController.updateProduct = async (req,res) => {
    const {name, description, price, stock} = req.body;
    const updateProduct = await productsModel.findByIdAndUpdate(req.params.id,{name, description, price, stock},{new: true});
    res.json({message: "Product updated"});
};

export default productsController;