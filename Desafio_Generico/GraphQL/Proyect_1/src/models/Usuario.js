import { Schema, model } from "mongoose";

const USUARIO_SCHEMA = Schema({

    nombre: {

        type: String,
        required: true,
        trim: true

    },
    apellido: {

        type: String,
        required: true,
        trim: true

    },
    email: {

        type: String,
        required: true,
        trim: true,
        unique: true

    },
    password: {

        type: String,
        required: true,
        trim: true

    },
    creado: {

        type: Date,
        default: Date.now()

    }

});

const MODELO = model("Usuario", USUARIO_SCHEMA);

export { MODELO };