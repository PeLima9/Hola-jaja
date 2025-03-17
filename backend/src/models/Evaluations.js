/*
    Campos:
        comment
        grade
        role
        idEmployee
*/

import {Schema, model} from "mongoose";

const evaluationsSchema = Schema(
    {
        comment: {
            type: String,
            require: true,
            max: 500
        },

        grade: {
            type: Number,
            require: true,
            min: 0,
            max: 10
        },

        role: {
            type: String,
            require: true
        },

        idEmployee: {
            type: Schema.Types.ObjectId,
            ref: "Employees",
            require: true
        }
    }, {
        timestamps: true,
        strict: false
    }
);

export default model("Evaluations", evaluationsSchema);