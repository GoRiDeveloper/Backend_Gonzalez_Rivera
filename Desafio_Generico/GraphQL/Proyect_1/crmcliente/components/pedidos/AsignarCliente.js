import React, { useState, useEffect, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { PedidoContext } from "../../context/pedidos/PedidoContext.js";
import Select from "react-select";

const OBTENER_CLIENTES_USUARIO = gql`

    query obtenerClientesVendedor {

        obtenerClientesVendedor {

            id
            nombre
            apellido
            empresa
            email

        }

    }

`;

export default function AsignarCliente () {

    const 

    [cliente, setCliente]  = useState([]),
    {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO),
    { agregarCliente }     = useContext(PedidoContext);

    useEffect(() => {

        agregarCliente(cliente);

    }, [cliente]);

    if (loading) return null;

    const { obtenerClientesVendedor } = data;

    function seleccionarCliente (cliente) {

        setCliente(cliente);

    };

    return (

        <>
        
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-900 text-gray-700 p-2 text-sm font-bold"> 1.- Asigna un Cliente a un Pedido </p>

        <Select
            
            className="mt-3 text-black"
            options={ obtenerClientesVendedor }
            onChange={opcion => seleccionarCliente(opcion)}
            getOptionValue={opciones => opciones.id}
            getOptionLabel={opciones => opciones.nombre}
            placeholder="Selecciona al Cliente"
            noOptionsMessage={() => "No hay resultados"}
            
        />
        
        </>

    );

};