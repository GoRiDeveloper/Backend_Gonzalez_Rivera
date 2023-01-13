import React from "react";
import Layout from "../components/Layout.js";
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

  const ROUTER = useRouter();
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);                          

  if (loading) return null;
  debugger

  if (!data.obtenerClientesVendedor) {

    return ROUTER.push("/login");

  };

  return (

    <div>

      <Layout>

        <h1 className="text-2xl text-gray-800 font-light"> Clientes </h1>

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

              data.obtenerClientesVendedor.map(cliente => (

                <tr key={cliente.id}>

                  <td className="text-black text-center border px-4 py-2"> {cliente.nombre} {cliente.apellido} </td>
                  <td className="text-black text-center border px-4 py-2"> {cliente.empresa} </td>
                  <td className="text-black text-center border px-4 py-2"> {cliente.email} </td>

                </tr>

              ))
              
            }

          </tbody>

        </table>

      </Layout>

    </div>

  );
};