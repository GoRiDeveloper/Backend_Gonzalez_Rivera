import React from "react";
import Layout from "../components/Layout.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

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

export default function Index() {

  const 
  
  ROUTER = useRouter(),
  {

    data, 
    loading, 
    error 
    
  } = useQuery(OBTENER_CLIENTES_USUARIO);                          

  if (loading) return null;

  if (typeof window !== "undefined") {

    if (!data.obtenerClientesVendedor && !localStorage.getItem("token")) ROUTER.push("/login");
    if (!data.obtenerClientesVendedor && localStorage.getItem("token")) ROUTER.reload();

  };

  return (

    <div>

      <Layout>

        <h1 className="text-2xl text-gray-800 font-light"> Clientes </h1>

        <Link href="/nuevocliente" className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"> 
          Nuevo Cliente 
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">

          <thead className="bg-gray-800">

            <tr className="text-white">

              <th className="w-1/5 py-2"> Nombre </th>
              <th className="w-1/5 py-2"> Empresa </th>
              <th className="w-1/5 py-2"> E-Mail </th>

            </tr>

          </thead>

          <tbody className="bg-white">

            { 

              data.obtenerClientesVendedor

                ? data.obtenerClientesVendedor.map(cliente => (

                  <tr key={cliente.id}>

                    <td className="text-black text-center border px-4 py-2"> {cliente.nombre} {cliente.apellido} </td>
                    <td className="text-black text-center border px-4 py-2"> {cliente.empresa} </td>
                    <td className="text-black text-center border px-4 py-2"> {cliente.email} </td>

                  </tr>

                ))
                : <h1 className="text-black"> Cargando... </h1>
              
            }

          </tbody>

        </table>

      </Layout>

    </div>

  );
};
