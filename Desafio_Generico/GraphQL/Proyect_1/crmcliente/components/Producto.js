import React from "react";
import Swal from "sweetalert2";
import Router from "next/router";
import { useMutation, gql } from "@apollo/client";

const 

ELIMINAR_PRODUCTO = gql`

    mutation eliminarProducto($id: ID!) {

        eliminarProducto(id: $id)

    }

`,

OBTENER_PRODUCTOS = gql`

    query obtenerProductos {

        obtenerProductos {

            id
            nombre
            precio
            existencia

        }

    }

`;

export default function Producto ({ producto }) {

    const 
    
    { 
        
        nombre, 
        precio, 
        existencia, 
        id 

    }                    = producto,
    [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO, {

        update(cache) {

            const 
            
            QUERY                = cache.readQuery({ query: OBTENER_PRODUCTOS }),
            { obtenerProductos } = QUERY;

            cache.writeQuery({

                query: OBTENER_PRODUCTOS,
                data: {

                    obtenerProductos: obtenerProductos
                                        .filter(productoActual => productoActual.id !== id)

                }

            });

        }

    });

    function confirmarEliminarProducto () {

        Swal.fire({

            title: "¿Deseas Eliminar este Producto?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "rgb(22, 163, 74)",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "No, Cancelar"

        }).then(async result => {

            if (result.value) {

                try {
                    
                    const { data } = await eliminarProducto({ variables: { id } });

                    Swal.fire(

                        "Eliminado Correctamente",
                        data.eliminarProducto,
                        "success"

                    );

                } catch (err) {

                    console.log(err);

                };

            };

        })

    };

    function editarProducto () {

        Router.push({

            pathname: "/editarproducto/[id]",
            query: { id }

        })

    };

    return (
    
        <tr>

            <td className="text-black text-center border px-4 py-2"> {nombre} </td>
            <td className="text-black text-center border px-4 py-2"> {existencia} Disponibles </td>
            <td className="text-black text-center border px-4 py-2"> $ {precio} </td>
            <td className="text-black text-center border px-4 py-2">

                <button
                
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-red-900"
                    onClick={() => confirmarEliminarProducto()}
                
                > 

                    Eliminar 

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

            </td>
            <td className="text-black text-center border px-4 py-2">

                <button 

                    type="button" 
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-green-800"
                    onClick={() => editarProducto()}

                > 

                    Editar 

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>

                </button>

            </td>

        </tr>
    );

};