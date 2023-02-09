import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";

const 

ACTUALIZAR_PEDIDO = gql`

    mutation actualizarPedido($id: ID!, $input: PedidoInput) {

        actualizarPedido(id: $id, input: $input) {

            estado

        }

    }

`,

ELIMINAR_PEDIDO = gql`

    mutation eliminarPedido($id: ID!) {

        eliminarPedido(id: $id)

    }

`,

OBTENER_PEDIDOS = gql`

    query obtenerPedidosVendedor {

        obtenerPedidosVendedor {

            id
            pedido {

                id 
                cantidad
                nombre

            }
            cliente {

                id
                nombre
                apellido
                email
                telefono

            }
            vendedor
            total
            estado

        }

    }

`;;

export default function Pedido ({ pedidoVendedor }) {

    const 
    
    {

        id, 
        total, 
        cliente,
        cliente : { 
                
                nombre, 
                apellido, 
                email, 
                telefono 

            }, 
        estado, 
        pedido
    
    } = pedidoVendedor,

    [ actualizarPedido ]                 = useMutation(ACTUALIZAR_PEDIDO),
    [ eliminarPedido ]                   = useMutation(ELIMINAR_PEDIDO, {

        update(cache) {

            const

            QUERY                      = cache.readQuery({ query: OBTENER_PEDIDOS }),
            { obtenerPedidosVendedor } = QUERY;

            cache.writeQuery({

                query: OBTENER_PEDIDOS,
                data: {
                    
                    obtenerPedidosVendedor: obtenerPedidosVendedor
                                                .filter(pedidoActual => pedidoActual.id !== id)

                }
                
            });

        }

    }),
    [estadoPedido, guardarEstadoPedido]  = useState(estado),
    [clase, guardarClase]                = useState("");

    useEffect(() => {

        if (estadoPedido) guardarEstadoPedido(estadoPedido);

        clasePedido();

    }, [estadoPedido]);

    function clasePedido () {

        switch (estadoPedido) {

            case "PENDIENTE":

                guardarClase("border-yellow-500");
            
            break;
        
            case "COMPLETADO":

                guardarClase("border-green-500");

            break;

            default:

                guardarClase("border-red-800");

            break;

        };

    };

    async function cambiarEstadoPedido (nuevoEstado) {

        try {
        
            const { data } = await actualizarPedido({

                variables: {

                    id,
                    input: {

                        estado: nuevoEstado,
                        cliente: cliente.id

                    }

                }

            });

            guardarEstadoPedido(data.actualizarPedido.estado);

        } catch (err) {

            console.log(err);

        };

    };

    function confirmarEliminarPedido () {

        Swal.fire({

            title: "¿Deseas Eliminar esté Pedido?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "rgb(22, 163, 74)",
            confirmButtonText:"Si, Eliminar",
            cancelButtonText: "No, Cancelar"

        }).then(async result => {

            if (result.value) {

                try {
                    
                    const data = await eliminarPedido({

                        variables: {

                            id

                        }

                    });

                    Swal.fire(

                        "Pedido Eliminado",
                        data.eliminarPedido,
                        "success"

                    );

                } catch (err) {
                  
                    console.log(err);

                };

            }

        });

    };

    return (

        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>

            <div>

                <p className="font-bold text-gray-800"> Cliente : {nombre} {apellido} </p>

                {email && (

                    <p className="flex items-center my-2 text-black"> 

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
    
                        { email } 
                        
                    </p>

                )}

                {telefono && (

                    <p className="flex items-center my-2 text-black">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>

                        {telefono}

                    </p>

                )}

                <h2 className="mt-10 font-bold text-gray-800"> Estado Pedido : </h2>

                <select 
                
                    className="mt-2 apperance-none bg-blue-600 border-blue-600 text-white rounded text-center leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={estadoPedido}
                    onChange={e => cambiarEstadoPedido(e.target.value)}
                    
                >

                    <option value="COMPLETADO"> COMPLETADO </option>
                    <option value="PENDIENTE"> PENDIENTE </option>
                    <option value="CANCELADO"> CANCELADO </option>

                </select>

            </div>

            <div>

                <h2 className="mt-2 text-gray-800 font-bold"> Resumen del Pedido : </h2>

                {

                    pedido.map(producto => (

                        <div key={producto.id} className="mt-4">

                            <p className="text-sm text-gray-600"> Producto : {producto.nombre} </p>
                            <p className="text-sm text-gray-600"> Cantidad : {producto.cantidad} </p>

                        </div>

                    ))

                }

                <p className="text-gray-800 mt-3 font-bold">

                    Total a Pagar : 
                    <span className="font-light"> $ {total} </span> 
                    
                </p>

                <button
                
                    type="button"
                    className="flex items-center bg-red-800 py-2 px-5 text-white rounded leading-tight text-xs uppercase font-bold hover:bg-red-900"
                    onClick={() => confirmarEliminarPedido()}
                
                > 

                    Eliminar 

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

            </div>

        </div>

    );

};