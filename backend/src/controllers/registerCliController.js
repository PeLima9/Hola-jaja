import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientsModel from "../models/Clients.js";
import {config} from "../config.js";

const registerCliController = {};

registerCliController.register = async (req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    try {
        //Verify existing Client
        const clientExists = await clientsModel.findOne({email});
        if(clientExists){
            return res.json({message: "Client Already Exists"});
        }

        //Encrypt password
        const passwordHash = await bcryptjs.hash(password, 10)

        //Save
        const newClient = new clientsModel({
            name,
            lastName, 
            birthday, 
            email, 
            password: passwordHash, 
            telephone, 
            dui: dui || null, 
            isVerified
        });
            
        await newClient.save();

        //Generate verification code
        const verificationCode = crypto.randomBytes(3).toString("hex");

        //Token Generator
        const tokenCode = jwt.sign(

            //What to save
            {email, verificationCode},

            //Secret code
            config.JWT.secret,

            //Expires in
            {expiresIn: "2h"}
        );

        res.cookie("VerificationToken", tokenCode, {maxAge: 2*60*60*1000});

        //Sent email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass
            }
        });

        //Receipient
        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Email Verification",
            text: `Qué significa el bro respeta hermanos ya me tienen cansado,
            ustedes lo usan como burla, pero yo cuando les respondo con ese comentario
            es que su comentario me dejo en llanto porque se me pasan de rosca,
            ustedes piensan que pueden jugar conmigo pero hermanos,
            yo tengo sentimientos y cuando me dicen gustambo a mí se me quiebra la voz y yo empiezo a llorar sin control,
            el bro respeta no es un juego hermanos la otra vez mi abuela me dijo bro respeta
            y pues sé que estuve mal pero me enojé y la aventé de las escaleras pero fue más por el susto
            porque sabra Dios cómo le hizo para subirse si esta en estado vegetal.
            
            Código de Verificación: ${verificationCode}
            Código expira en 2 horas
            `
        }

        //Sending
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.json({message: "Error"})
            console.log("Email Sent")
        });

        res.json({message: "Register Successful. Please verify your email with the code sent via Email"})

    } 
    catch (error) {
        res.json({message: "Error: " + error})
    }
};

//Verify code
registerCliController.verifyCodeEmail = async (req, res) => {
    const {verificationCode} = req.body;
    const token = req.cookies.VerificationToken;

    try {
        //Verify and decode
        const decoded = jwt.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        //Compare code
        if (verificationCode !== storedCode){
            return res.json({message: "Invalid Code"})
        }

        //isVerified Value
        const client = await clientsModel.findOne({email});
        client.isVerified = true;
        await client.save();
        res.json({message: "Email Verified Successfully"});

        //Clear Cookie
        res.clearCookie("VerificationToken");

    }
    catch (error) {
        res.json({message: "Error"})
    };
};

export default registerCliController;