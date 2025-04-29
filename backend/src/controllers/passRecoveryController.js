//Imports
import jwt, { decode } from "jsonwebtoken";
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
        
        userFound = await Clients.findOne({email});
        if (userFound) {
            userType = "client";
        }
        else {
            userFound = await Employees.findOne({email});
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

//Verify Code
passRecoveryController.verifyCode = async (req, res) => {
    const {code} = req.body;

    try {
        //Acquire Token
        const token = req.cookies.tokenRecoveryCode;

        //Extract Token Data
        const decoded = jwt.verify(token, config.JWT.secret);

        //Compare
        if (decoded.code !== code) {
            return res.json({message: "Invalid Code"});
        }

        //Mark as Verified
        const newToken = jwt.sign(
            //What to save
            {
                email: decoded.email, 
                code: decoded.code,
                userType: decoded.userType,
                verified: true 
            },

            //Secret
            config.JWT.secret,

            //Expires In
            {expiresIn: "25m"}
        )

        //Cookie
        res.cookie("tokenRecoveryCode", newToken, {maxAge: 25 * 60 * 1000})
        res.json({message: "Code Verified Successfully"});

    } 
    catch (error) {
        console.log("Error: " + error);
    };
};

passRecoveryController.newPassword = async (req, res) => {
    const {newPassword} = req.body;

    try {
        //Acquire Token
        const token = req.cookies.tokenRecoveryCode;
        
        //Extract Token Data
        const decoded = jwt.verify(token, config.JWT.secret);

        //Compare
        if (!decoded.verified) {
            return res.json({message: "Code Not Verified"})
        }

        let user;
        const {email} = decoded

        //Encrypt Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //Save New Password
        if (decoded.userType === "client") {
            user = await Clients.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
        }

        else if (decoded.userType === "employee") {
            user = await Employees.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            )
        }
        
        res.clearCookie("tokenRecoveryCode");

        res.json({message: "Password Updated"});

    } 
    catch (error) {
        console.log("Error: " + error);
    }
}

//Export
export default passRecoveryController;