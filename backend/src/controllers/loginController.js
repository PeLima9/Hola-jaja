import clientsModel from "../models/Clients.js";
import employeesModel from "../models/Employees.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import {config} from "../config.js";

const loginController = {};

//Maximum login attempts
const maxAttempts = 3;
//Lock time in milliseconds (15 minutes)
const lockTime = 15 * 60 * 1000;

loginController.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        //Validate the account level
        let userFound; //User found
        let userType; //User type

        //Admin
        if (email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "Admin";
            userFound = {_id: "Admin"};
        }

        else {
            //Employee
            userFound = await employeesModel.findOne({email});
            userType = "Employee";

            //Client
            if (!userFound){
                userFound = await clientsModel.findOne({email});
                userType = "Client";
            }
        }

        //No user found
        if (!userFound){
            return res.status(404).json({message: "User not found"});
        }

        //Check if user is locked
        if (userType !== "Admin") {
            if (userFound.lockTime > Date.now()) {
                const remainingTIme = Math.ceil((userFound.lockTime - Data.now() / 60000));
                return res.json({message: `Account locked. Try again in ${remainingTIme} minutes.`});
            };
        };

        //If not admin
        if (userType !== "Admin"){

            //Compares hashed password
            const matches = bcryptjs.compare(password, userFound.password)

            //Invalid password
            if (!matches){
                //Invalid password, increment login attempts
                userFound.loginAttempts = (userFound.loginAttempts) + 1;
                
                if (userFound.loginAttempts > maxAttempts) {
                    userFound.lockTime = Date.now() + lockTime;
                    await userFound.save();
                    return res.status(403).json({message: "Cuenta temporalmente bloqueada por demasiados intentos fallidos."});
                }

                return res.status(400).json({message: "Invalid Password"})
            }

            //Reset login attempts
            userFound.loginAttempts = 0;
            userFound.lockTime = null;
            await userFound.save();
        }

        //Generate token
        jwt.sign(
            
            //What to save
            {id: userFound._id, userType},

            //Secret code
            config.JWT.secret,

            //Expires in
            {expiresIn: config.JWT.expiresIn},

            //Arrow function
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({message: "Login Successful"})
            }
        )

    }
    catch(error){
        console.log(error);
        res.json({message: "Login Failed"})
    }
};

export default loginController;