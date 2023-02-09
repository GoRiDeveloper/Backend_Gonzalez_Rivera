import React, { useState, useEffect, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { PedidoContext } from "../../context/pedidos/PedidoContext.js";
import Select from "react-select";

const OBTENER_PRODUCTOS = gql`

    query obtenerProductos {

        obtenerProductos {

            id
            nombre
            precio
            existencia

        }

    }

`;

export default function AsignarProductos () {

    const 

    [productos, setProductos] = useState([]),
    {data, loading, error}    = useQuery(OBTENER_PRODUCTOS),
    { agregarProductos }      = useContext(PedidoContext);

    useEffect(() => {

        agregarProductos(productos);

    }, [productos]);

    if (loading) return null;

    const { obtenerProductos } = data;

    function seleccionarProducto (productos) {

        setProductos(productos);

    };

    return (

        <>
        
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-900 text-gray-700 p-2 text-sm font-bold"> 2.- Selecciona los Productos </p>

        <Select
        
            className="mt-3 text-black"
            options={ obtenerProductos }
            onChange={opcion => seleccionarProducto(opcion)}
            isMulti={true}
            getOptionValue={opciones => opciones.id}
            getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
            placeholder="Selecciona los Productos"
            noOptionsMessage={() => "No hay Resultados"}
        
        />

        </>
        
    );

};