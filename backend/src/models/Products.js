/* 
    Campos:
        name
        description
        price
        stock

*/

//Importar Mongoose
import {Schema, model} from "mongoose";

//Crear constante schema
const productsSchema = new Schema({
    name: {
        type: String,
        require: true,
        maxLenght: 100

    },

    description: {
        type: String,

    },

    price: {
        type: Number,
        require: true,
        min: 0
    },

    stock: {
        type: Number,
        require: true,
        min: 0
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Products", productsSchema);