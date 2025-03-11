const clientsController = {};
import clientsModel from "../models/Clients.js";

//Select / Get
clientsController.getClients = async(req, res) => {
    const clients = await clientsModel.find();
    res.json(clients);
};

//Insert / Post
clientsController.insertClient = async(req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const newClient = new clientsModel({name, lastName, birthday, email, password, telephone, dui, isVerified});
    await newClient.save();
    res.json({message: "Client Added"});
};

//Delete
clientsController.deleteClient = async(req, res) => {
    await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Client Removed"});
};

//Update / Put
clientsController.updateClient = async(req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const updateClient = await clientsModel.findByIdAndUpdate(req.params.id,{name, lastName, birthday, email, password, telephone, dui, isVerified}, {new: true});
    res.json({message: "Client Updated"});
};

//Exportar Controlador
export default clientsController;