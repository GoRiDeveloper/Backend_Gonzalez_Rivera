import mongoose, { Schema, model } from "mongoose";

const PRODUCTO_SCHEMA = Schema({

    pedido :{

        type: Array,
        required: true

    },
    total: {

        type: Number,
        required: true

    },
    cliente: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Cliente"

    },
    vendedor: {

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"

    },
    estado: {

        type: String,
        default: "PENDIENTE"

    },
    creado: {

        type: Date,
        default: Date.now()

    }

});

const MODELO = model("Pedido", PRODUCTO_SCHEMA);

export { MODELO };