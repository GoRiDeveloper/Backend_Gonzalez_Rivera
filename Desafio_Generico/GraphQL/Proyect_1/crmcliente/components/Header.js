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

    const 
    
    ROUTER = useRouter(),
    
    { 
        
        data, 
        loading, 
        error 
    
    } = useQuery(OBTENER_USUARIO);                    

    if (loading) return null;

    function cerrarSesion () {

        localStorage.removeItem("token");
        ROUTER.push("/login");

    };

    return (

        <div className="flex justify-between mb-6">

            {

                data.obtenerUsuario

                    ? (<p className="text-black mr-2"> Hola : {data.obtenerUsuario.nombre} {data.obtenerUsuario.apellido} </p>)
                    : (<p className="text-black mr-2"> Cargando... </p>)

            }

            <button onClick={() => cerrarSesion()} type="button" className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md"> Cerrar Sesión </button>

        </div>

    );

};