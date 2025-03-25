const registerEmpController = {};

import Employee from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

//Insert - Post
registerEmpController.registerEmployee = async(req, res) => {
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    
    try {
        //Check for existing employee
        const exist = await Employee.findOne({email});
        if (exist){
            return res.json({message: "Employee already exists"});
        }

        //Encript password
        const passwordHash = await bcrypt.hash(password, 10);

        //Save employee
        const newEmployee = new Employee({
            name, 
            lastName, 
            birthday, 
            email, 
            address, 
            hireDate, 
            password: passwordHash, 
            telephone, 
            dui, 
            isssNumber, 
            isVerified});

            await newEmployee.save();

            //Token generator
            jsonwebtoken.sign(

                //What to save
                {id: newEmployee._id},
                
                //Secret code
                config.JWT.secret,

                //Expires in
                {expiresIn: config.JWT.expiresIn},

                //Arrow Function
                (error, token) => {
                    if (error) console.log(error);
                    res.cookie("authToken")
                    res.json({message: "Employee Saved"})
                }
            );
    }
    catch(error){
        console.log(error);
        res.json({message: "Registration Failed"});
    }
}

export default registerEmpController;