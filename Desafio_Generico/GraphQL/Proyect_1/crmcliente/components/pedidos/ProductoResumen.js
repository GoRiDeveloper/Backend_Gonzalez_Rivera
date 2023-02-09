import React, { useState, useEffect, useContext } from "react";
import { PedidoContext } from "../../context/pedidos/PedidoContext.js";

export default function ProductoResumen ({ producto }) {

    const 
    
    {nombre, precio}                     = producto,
    {cantidadProductos, actualizarTotal} = useContext(PedidoContext),
    [cantidad, setCantidad]              = useState(0);

    useEffect(() => {

        actualizarCantidad();
        actualizarTotal();

    }, [ cantidad ]);

    function actualizarCantidad () {

        const PRODUCTO = { 

            ...producto,
            cantidad: Number(cantidad)

        };

        cantidadProductos(PRODUCTO);

    };

    return (

        <div className="md:flex md:justify-between md:items-center mt-5">

            <div className="md:w-2/4 mb-2 md:mb-0">

                <p className="text-sm text-black">{ nombre }</p>
                <p className="text-sm text-black">$ { precio }</p>

            </div>

            <input
            
                className="shadow bg-white apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                type="number"
                placeholder="Cantidad :"
                onChange={e => setCantidad(e.target.value)}
                value={cantidad}
            
            />

        </div>

    );

};