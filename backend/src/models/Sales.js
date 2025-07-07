/*
    Fields: 
        product
        category
        customer
        total
*/

//Imports
import {model, Schema} from "mongoose";

const SalesSchema = new Schema({
    product: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    customer: {
        type: String,
        required: true
    },

    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    strict: false
});

//Export
export default model("Sales", SalesSchema);