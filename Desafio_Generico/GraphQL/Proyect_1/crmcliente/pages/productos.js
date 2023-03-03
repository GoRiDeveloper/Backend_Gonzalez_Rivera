import React from "react";
import Link from "next/link.js";
import Layout from "../components/Layout.js";
import Producto from "../components/Producto.js";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

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

export default function Productos () {

    const 
    
    ROUTER                   = useRouter(),
    { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    if (loading) return null;

    if (typeof window !== "undefined") {

        if (!data.obtenerProductos && !localStorage.getItem("token")) ROUTER.push("/login");
        if (data.obtenerProductos && !localStorage.getItem("token")) ROUTER.push("/login");
        if (!data.obtenerProductos && localStorage.getItem("token")) ROUTER.reload();

    };

    return (

        <div>

            <Layout>

                <h1 className="text-2xl text-gray-800 font-light"> Productos </h1>

                <Link 
                
                    href={"/nuevoproducto"} 
                    className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
                    
                >
                    Nuevo Producto
                </Link>

                <div className="overflow-x-scroll">

                    <table className="table-auto shadow-md mt-10 w-full w-lg">

                        <thead className="bg-gray-800">

                            <tr className="text-white">

                                <th className="w-1/5 py-2"> Nombre </th>
                                <th className="w-1/5 py-2"> Existencia </th>
                                <th className="w-1/5 py-2"> Precio </th>
                                <th className="w-1/5 py-2"> Eliminar </th>
                                <th className="w-1/5 py-2"> Editar </th>

                            </tr>

                        </thead>

                        <tbody className="bg-white">

                            { 
                            
                                data.obtenerProductos

                                    ? data.obtenerProductos.map(producto => (

                                        <Producto key={producto.id} producto={producto} />

                                    ))
                                    : <h1 className="text-black"> Cragando... </h1> 

                            } 

                        </tbody>

                    </table>

                </div>

            </Layout>

        </div>

    );

};