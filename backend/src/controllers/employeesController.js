const employeesController = {};
import employeesModel from "../models/Employees.js";

//Select / Get
employeesController.getEmployees = async(req, res) => {
    const employees = await employeesModel.find();
    res.json(employees);
};

//Insert / Post
employeesController.insertEmployees = async(req, res) => {
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    const newEmployee = new employeesModel({name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified});
    await newEmployee.save();
    res.json({message: "Employee Added"});
};

//Delete
employeesController.deleteEmployee = async(req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Employee Removed"});
};

//Update / Put
employeesController.updateEmployee = async(req, res) => {
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    const updateEmployee = await clientsModel.findByIdAndUpdate(req.params.id,{name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified}, {new: true});
    res.json({message: "Employee Updated"});
};

//Exportar Controlador
export default employeesController;