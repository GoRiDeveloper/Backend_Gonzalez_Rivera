import mongoose, { Schema, model } from "mongoose";

const CLIENTE_SCHEMA = Schema({

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
    empresa: {

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
    telefono: {

        type: String,
        trim: true

    },
    creado: {

        type: Date,
        default: Date.now()

    },
    vendedor: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"

    }

});

const MODELO = model("Cliente", CLIENTE_SCHEMA);

export { MODELO };