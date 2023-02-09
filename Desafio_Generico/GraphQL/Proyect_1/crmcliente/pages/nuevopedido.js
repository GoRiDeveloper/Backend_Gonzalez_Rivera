import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout.js";
import AsignarCliente from "../components/pedidos/AsignarCliente.js";
import AsignarProductos from "../components/pedidos/AsignarProductos.js";
import ResumenPedido from "../components/pedidos/ResumenPedido.js";
import Total from "../components/pedidos/Total.js";
import { PedidoContext } from "../context/pedidos/PedidoContext.js";
import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";

const 

NUEVO_PEDIDO = gql`

    mutation nuevoPedido($input: PedidoInput) {

        nuevoPedido(input: $input) {

            id

        }

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

`;

export default function NuevoPedido () {

    const 
    
    ROUTER                      = useRouter(),
    {cliente, productos, total} = useContext(PedidoContext),
    [mensaje, guardarMensaje]   = useState(null),
    [ nuevoPedido ]             = useMutation(NUEVO_PEDIDO, {

        update(cache, { data: { nuevoPedido } }) {

            const 

            QUERY                      = cache.readQuery({ query: OBTENER_PEDIDOS }),
            { obtenerPedidosVendedor } = QUERY;

            cache.writeQuery({

                query: OBTENER_PEDIDOS,
                data: {

                    obtenerPedidosVendedor: [

                        ...obtenerPedidosVendedor,
                        nuevoPedido

                    ]

                }

            });

        }

    });

    function validarPedido () {

        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 

            ? " opacity-50 cursor-not-allowed" 
            : "";

    };

    async function crearNuevoPedido () {

        const pedido = productos.map(({__typename, existencia, ...producto }) => producto);

        try {

            const 
            
            { id }   = cliente,
            { data } = await nuevoPedido({

                variables: {

                    input: {

                        cliente: id,
                        total,
                        pedido

                    }

                }

            });

            Swal.fire(

                "Registrado",
                "El pedido se registró correctamente.",
                "success"

            );

            ROUTER.push("/pedidos");
            
        } catch (err) {
          
            guardarMensaje(err.message);

            setTimeout(() => guardarMensaje(null), 3000);
            
        };

    };

    function mostrarMensaje () {

        return (

            <div className="bg-white text-black w-full py-2 px-3 my-3 max-w-sm text-center mx-auto">

                <p>{mensaje}</p>

            </div>

        );

    };

    return (

        <Layout>

            <h1 className="text-2xl text-gray-800 font-light"> Crear Nuevo Pedido </h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">

                <div className="w-full max-w-lg">

                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />

                    <button

                        className={`bg-gray-800 w-full mt-5 p-2 text-black font-bold uppercase font-bold hover:bg-gray-900 ${ validarPedido() }`}
                        type="button"
                        onClick={() => crearNuevoPedido()}

                    > 

                        Registrar Pedido 

                    </button>

                </div> 

            </div>

        </Layout>

    );

};