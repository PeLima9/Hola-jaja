//Import
import nodemailer from "nodemailer";
import {config} from "../config.js";

//Transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.email.email_user,
        pass: config.email.email_pass
    }
})

//Email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"Lima" <eduardolima102a15@gmail.com>',
            to,
            subject,
            text,
            html
        });
        return info

    }
    catch (error) {
        console.log("Failed to send Email");
    };
};

//HTML
const HTMLRecoveryEmail = (code) => {
    return `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color:rgb(29, 0, 102); padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #f4f4f4; font-size: 24px; margin-bottom: 20px;">Password Recovery</h1>
        <p style="font-size: 16px; color: #dcdcdc; line-height: 1.5;">
          Greetings.
          We have received a request to change your password.
          Use this verification code to Proceed:
        </p>
        <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #ffffff; background-color:rgb(29, 0, 102); border-radius: 5px; border: 1px solidrgb(255, 255, 255);">
          ${code}
        </div>
        <p style="font-size: 14px; color: #f2f600; line-height: 1.5;">
          This code is valid for the next <strong>25 minutes</strong>. If you <strong>did not</strong> request this email, please ignore it.
        </p>
        <hr style="border: none; border-top: 1px solid #ffffff; margin: 20px 0;">
        <footer style="font-size: 12px; color: #f4f4f4;">
          If you need further assistance, please contact our support team at the
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style="color:rgb(116, 192, 244); text-decoration: none;">Support Team Contact Page</a>.
        </footer>
      </div>
    `;
  };

export {sendEmail, HTMLRecoveryEmail};