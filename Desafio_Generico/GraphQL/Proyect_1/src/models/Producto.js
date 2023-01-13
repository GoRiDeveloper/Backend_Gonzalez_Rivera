import { Schema, model } from "mongoose";

const PRODUCTO_SCHEMA = Schema({

    nombre: {

        type: String,
        required: true,
        trim: true

    },
    existencia: {

        type: Number,
        required: true,
        trim: true
    
    },
    precio: {

        type: Number,
        required: true,
        trim: true

    },
    creado: {

        type: Date,
        default: Date.now()

    }

});

PRODUCTO_SCHEMA.index({ nombre: "text" });

const MODELO = model("Producto", PRODUCTO_SCHEMA);

export { MODELO };