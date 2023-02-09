import React, { useState } from "react";
import Layout from "../components/Layout.js";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { gql, useMutation } from "@apollo/client";

const 

OBTENER_PRODUCTOS = gql`

    query obtenerProductos {

        obtenerProductos {

            id
            nombre
            existencia
            precio

        } 

    }

`,

NUEVO_PRODUCTO = gql`

    mutation nuevoProducto ($input: ProductoInput) {

        nuevoProducto (input: $input) {

            id
            nombre 
            existencia
            precio

        }

    }

`;

export default function NuevoProducto () {

    const 

    ROUTER            = useRouter(),
    [ mensaje, guardarMensaje ] = useState(null),

    [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO, {
    
        update(cache, { data: { nuevoProducto } }) {

            const 
            
            QUERY = cache.readQuery({ query: OBTENER_PRODUCTOS }),
            { obtenerProductos } = QUERY;

            cache.writeQuery({

                query: OBTENER_PRODUCTOS,
                data: {

                    obtenerProductos: [
                        
                        ...obtenerProductos, 
                        nuevoProducto
                    
                    ]

                }

            });

        }
        
    }),

    FORMIK            = useFormik({

        initialValues: {

            nombre: "",
            existencia: "",
            precio: ""

        },
        validationSchema: object({

            nombre: string()
                        .required("El Nombre es un campo Obligatorio."),

            existencia: number()
                            .required("La Existencia es un campo Obligatorio.")
                            .positive("No se Aceptan Valores Negativos.")
                            .integer("No se Aceptan Valores Decimales."),

            precio: number()
                        .required("El Precio es un campo Obligatorio.")
                        .positive("No se Aceptan Valores Negativos.")

        }),
        onSubmit: async valores => {

            const { nombre, existencia, precio } = valores;

            try {
              
                const { data } = await nuevoProducto({

                    variables: {

                        input: {

                            nombre,
                            existencia,
                            precio

                        }

                    }

                });

                Swal.fire(

                    "Producto Creado Correctamente",
                    "Se creo un nuevo producto",
                    "success"

                );

                ROUTER.push("/productos");
                
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
        
            <h1 className="text-2xl text-gray-800 font-light"> Crear Nuevo Producto </h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">

                <div className="w-full max-w-lg">

                    <form
                    
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={FORMIK.handleSubmit}

                    >

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre"> Nombre : </label>

                            <input
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="nombre"
                                type="text"
                                placeholder="Nombre del Producto :"
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

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia"> Cantidad Disponible : </label>

                            <input
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="existencia"
                                type="number"
                                placeholder="Cantidad Disponible :"
                                onChange={FORMIK.handleChange}
                                onBlur={FORMIK.handleBlur}
                                value={FORMIK.values.existencia}
                            
                            />

                        </div>

                        {

                            FORMIK.touched.existencia && FORMIK.errors.existencia

                                ? (
                                
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                        <p className="font-bold"> Error </p>
                                        <p>{FORMIK.errors.existencia}</p>

                                    </div>
                                    
                                )
                                : null

                        }

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio"> Precio : </label>

                            <input
                            
                                className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="precio"
                                type="number"
                                placeholder="Precio Producto :"
                                onChange={FORMIK.handleChange}
                                onBlur={FORMIK.handleBlur}
                                value={FORMIK.values.precio}
                            
                            />

                        </div>

                        {

                            FORMIK.touched.precio && FORMIK.errors.precio

                                ? (
                                
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                        <p className="font-bold"> Error </p>
                                        <p>{FORMIK.errors.precio}</p>

                                    </div>
                                    
                                )
                                : null

                        }

                        <input
                        
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                            value="Agregar Nuevo Producto"

                        />

                    </form>

                </div>

            </div>
        
        </Layout>
        
    );

};