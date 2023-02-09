import React from "react";
import Layout from "../components/Layout.js";
import Pedido from "../components/Pedido.js";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

const OBTENER_PEDIDOS = gql`

    query obtenerPedidosVendedor {

        obtenerPedidosVendedor {

            id
            pedido {

                id
                nombre
                cantidad

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

export default function Pedidos () {

    const {data, loading, error} = useQuery(OBTENER_PEDIDOS);

    if (loading) return null;

    const { obtenerPedidosVendedor } = data;

    return (

        <div>

            <Layout>

                <h1 className="text-2xl text-gray-800 font-light"> Pedidos </h1>

                <Link
                    className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold" 
                    href={"/nuevopedido"}
                >
                    Nuevo Pedido
                </Link>

                { 

                    obtenerPedidosVendedor.length === 0 

                        ? (

                            <p className="mt-5 text-center text-2xl"> No hay Pedidos </p>

                        )
                        : (

                            obtenerPedidosVendedor.map(pedido => (

                                <Pedido key={pedido.id} pedidoVendedor={pedido} />

                            ))

                        )
                    
                }

            </Layout>

        </div>

    );

};