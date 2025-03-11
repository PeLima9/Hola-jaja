/*
    Campos:
        name
        lastName
        birthday
        email
        address
        hireDate
        password
        telephone
        dui
        isssNumber
        isVerified
*/

//Importar Mongoose
import {Schema, model} from "mongoose";

//Schema
const employeesSchema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength: 25
    },

    lastName: {
        type: String,
        require: true,
        maxLength: 25
    },

    birthday: {
        type: Date,
        require: false
    },

    email: {
        type: String,
        require: true,
        maxLength: 50
    },

    address: {
        type: String,
        require: true,
    },

    hireDate: {
        type: Date,
        require: true
    },

    password: {
        type: String,
        require: true,
        minLength: 6,
        maxLength: 25,
    },
    
    telephone: {
        type: String,
        require: true,
        maxLength: 8
    },

    dui: {
        type: String,
        require: true,
        maxLength: 10
    },
    
    isssNumber: {
        type: String,
        require: true
    },

    isVerified: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Employees", employeesSchema);