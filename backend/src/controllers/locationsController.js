const locationsController = {};
import locationsModel from "../models/Locations.js";

//Select / Get
locationsController.getLocations = async(req, res) => {
    const locations = await locationsModel.find();
    res.json(locations);
};

//Insert / Post
locationsController.insertLocations = async(req, res) => {
    const {name, address, telephone, schedule} = req.body;
    const newLocation =  new locationsModel({name, address, telephone, schedule});
    await newLocation.save();
    res.json({message: "Location Added"});
};

//Delete
locationsController.deleteLocation = async(req, res) => {
    await locationsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Location Removed"});
};

//Update / Put
locationsController.updateLocation = async(req, res) => {
    const {name, address, telephone, schedule} = req.body;
    const updateLocation = await locationsModel.findByIdAndUpdate(req.params.id,{name, address, telephone, schedule}, {new: true});
    res.json({message: "Location Updated"});
};

//Exportar Controlador
export default locationsController;