import React, { useState } from "react";
import Layout from "../components/Layout.js";
import { useFormik } from "formik";
import { object, string } from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const 

OBTENER_CLIENTES_USUARIO = gql`

    query obtenerClientesVendedor {

        obtenerClientesVendedor {

            id
            nombre
            apellido
            empresa
            email

        }

    }

`,

NUEVO_CLIENTE = gql`

    mutation nuevoCliente($input: ClienteInput) {

        nuevoCliente(input: $input) {

            id
            nombre
            apellido
            empresa 
            email
            telefono

        }

    }

`;

export default function NuevoCliente () {

    const 
    
    ROUTER                     = useRouter(),
    [ mensaje, guardarMensaje] = useState(null),
    [ nuevoCliente ]           = useMutation(NUEVO_CLIENTE, {

        async update(cache, { data: { nuevoCliente } }) {

            const QUERY = cache.readQuery(

                { query: OBTENER_CLIENTES_USUARIO }

            );

            const { obtenerClientesVendedor } = QUERY;

            cache.writeQuery({

                query: OBTENER_CLIENTES_USUARIO,
                data: {

                    obtenerClientesVendedor: [
                        
                        ...obtenerClientesVendedor,
                        nuevoCliente
                    
                    ]

                }

            });

        }

    }),
    FORMIK = useFormik({

        initialValues: {

            nombre: "",
            apellido: "",
            empresa: "",
            email: "",
            telefono: ""

        },
        validationSchema: object({

            nombre: string()
                        .required("El Nombre es un campo Obligatorio."),

            apellido: string()
                        .required("El apellido es un campo Obligatorio."),

            empresa: string()
                        .required("La Empresa es un campo Obligatorio."),

            email: string()
                        .email("El E-Mail no es válido.")
                        .required("El E-Mail es un campo Obligatorio.")

        }),
        onSubmit: async valores => {

            const { nombre, apellido, empresa, email, telefono } = valores;

            try {

                const { data } = await nuevoCliente({

                    variables: {

                        input: {

                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono

                        }

                    }

                });

                ROUTER.push("/");
                
            } catch (err) {

                guardarMensaje(err.message);

                setTimeout(() => guardarMensaje(null), 2150);

            };

        }

    });

    function mostrarMensaje () {

        return (

            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">

                <p className="text-black">{mensaje}</p>

            </div>

        );

    };

    return (
    
        <Layout>

            <h1 className="text-2xl text-gray-800 font-light"> Nuevo Cliente </h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">
                
                <div className="w-full max-w-lg">

                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={FORMIK.handleSubmit}>

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre"> Nombre : </label>

                            <input 
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="nombre"
                                type="text"
                                placeholder="Nombre del Cliente :"
                                onChange={FORMIK.handleChange}
                                onBlur={FORMIK.handleBlur}
                                value={FORMIK.values.nombre}
                            
                            />

                        </div>

                        { 

                            FORMIK.touched.nombre && FORMIK.errors.nombre

                                ? (
                                
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                        <p className="font-bold"> Error </p>
                                        <p>{FORMIK.errors.nombre}</p>

                                    </div>
                                    
                                )
                                : null

                        }

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido"> Apellido : </label>

                            <input
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="apellido"
                                type="text"
                                placeholder="Apellido del Cliente :"
                                onChange={FORMIK.handleChange}
                                onBlur={FORMIK.handleBlur}
                                value={FORMIK.values.apellido}
                            
                            />

                        </div>

                        {

                            FORMIK.touched.apellido && FORMIK.errors.apellido

                                ? (
                                
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                        <p className="font-bold"> Error </p>
                                        <p>{FORMIK.errors.apellido}</p>

                                    </div>
                                    
                                )
                                : null

                        }

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa"> Empresa del Cliente : </label>

                            <input 
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="empresa"
                                type="text"
                                placeholder="Empresa del Cliente :"
                                onChange={FORMIK.handleChange}
                                onBlur={FORMIK.handleBlur}
                                value={FORMIK.values.empresa}
                            
                            />

                        </div>

                        {

                            FORMIK.touched.empresa && FORMIK.errors.empresa

                                ? (
                                
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                        <p className="font-bold"> Error </p>
                                        <p>{FORMIK.errors.empresa}</p>

                                    </div>
                                    
                                )
                                : null

                        }

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"> E-mail del Cliente : </label>

                            <input 
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="email"
                                type="email"
                                placeholder="E-Mail del Cliente :"
                                onChange={FORMIK.handleChange}
                                onBlur={FORMIK.handleBlur}
                                value={FORMIK.values.email}
                            
                            />

                        </div>

                        {

                            FORMIK.touched.email && FORMIK.errors.email

                                ? (
                                
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                        <p className="font-bold"> Error </p>
                                        <p>{FORMIK.errors.email}</p>

                                    </div>
                                    
                                )
                                : null

                        }

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono"> Teléfono del Cliente : </label>

                            <input
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="telefono"
                                type="tel"
                                placeholder="Teléfono del Cliente :"
                                onChange={FORMIK.handleChange}
                                onBlur={FORMIK.handleBlur}
                                value={FORMIK.values.telefono}
                            
                            />

                        </div>

                        <input
                        
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                            value="Registrar Cliente"

                        />

                    </form>

                </div>
                
            </div>

        </Layout>

    );

};