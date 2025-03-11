/*
    Campos:
        name
        lastName
        birthday
        email
        password
        telephone
        dui
        isVerified
*/

//Importar Mongoose
import {Schema, model} from "mongoose";

//Schema
const clientsSchema = new Schema({
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
        require: false,
    },

    email: {
        type: String,
        require: true,
        maxLength: 50
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
    
    isVerified: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Clients", clientsSchema);