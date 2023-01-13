import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`

    query obtenerUsuario{

        obtenerUsuario {

            id
            nombre
            apellido

        }

    }

`;

export default function Header () {

    const ROUTER = useRouter();
    const { data, loading, error } = useQuery(OBTENER_USUARIO);                    

    if (loading) return null;
debugger
    if (!data) { 

        return ROUTER.push("/login");
        
    };

    const { nombre, apellido } = data.obtenerUsuario;

    function cerrarSesion () {

        localStorage.removeItem("token");
        ROUTER.push("/login");

    };

    return (

        <div className="flex justify-between mb-6">

            <p className="text-black mr-2"> Hola : {nombre} {apellido} </p>
            <button onClick={() => cerrarSesion()} type="button" className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md"> Cerrar Sesión </button>

        </div>

    );

};