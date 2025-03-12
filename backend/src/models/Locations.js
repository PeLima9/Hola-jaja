/*
    Campos: 
        name
        address
        telephone
        schedule
*/

//Importar Mongoose
import {Schema, model} from "mongoose";

//Schema
const locationsSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    telephone: {
        type: String,
        require: true,
        maxLength: 8
    },

    schedule: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Locations", locationsSchema);