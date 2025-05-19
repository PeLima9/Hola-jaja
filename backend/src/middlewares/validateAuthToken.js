//Imports
import jwt from "jsonwebtoken";
import {config} from "../config.js";

export const validateAuthToken = (allowedUserTypes = []) => {
    return (req, res, next) => {
        try {
            
            //Validate for existing cookies
            if (!req.cookies){
                return res.json({message: "No cookies found, authorization required"})
            }

            //Extract cookies
            const {authToken} = req.cookies;

            //Decode token
            const decoded = jwt.verify(authToken, config.JWT.secret);

            //Store data
            req.user = decoded;

            if (!allowedUserTypes.includes(decoded.userType)){
                return res.json({message: "Access denied"});
            }

            //Continue if exists
            next();
        } 
        catch (error) {
            console.log("Error: " + error)
        }
    }
}