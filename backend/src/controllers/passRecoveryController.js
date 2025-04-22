//Imports
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Clients from "../models/Clients.js";
import Employees from "../models/Employees.js";

import {sendEmail, HTMLRecoveryEmail} from "../utils/passwordRecovery.js";
import {config} from "../config.js";

const passRecoveryController = {}

passRecoveryController.requestCode = async (req, res) => {
    const {email} = req.body;

    try {
        let userFound;
        let userType; 
        
        userFound = await clientsModel.findOne({email});
        if (userFound) {
            userType = "client";
        }
        else {
            userFound = await employeeModel.findOne({email});
            userType = "employee";
        }

        if(!userFound){
            return res.json({message: "User Not Found"});
        }

        //Code Generator
        const code = Math.floor(10000 + Math.random() * 60000).toString();

        //Token Generetor
        const token = jwt.sign(
            //What to save
            {email, code, userType, verified: false},

            //Secret
            config.JWT.secret,

            //Expires in
            {expiresIn: "25m"}
        )

        //Cookie expiration
        res.cookie("tokenRecoveryCode", token, {maxAge: 25 * 60 * 1000});

        //Email to send
        await sendEmail(
            email,
            "Password Recovery Code",
            `Your verification code is ${code}`,
            HTMLRecoveryEmail(code)
        )

        res.json({message: "Verification Email Sent"});
    } 
    catch (error) {
        console.log("Error: " + error);
    };
};