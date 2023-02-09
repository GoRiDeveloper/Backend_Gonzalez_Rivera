import React from "react";
import Swal from "sweetalert2";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { object, string, number } from "yup";
import { Formik } from "formik";
import { useQuery, useMutation, gql } from "@apollo/client";

const 

OBTENER_PRODUCTO = gql`

    query obtenerProducto($id: ID!) {

        obtenerProducto(id: $id) {

            nombre
            existencia
            precio

        }

    }

`,

ACTUALIZAR_PRODUCTO = gql`

    mutation actualizarProducto($id: ID!, $input: ProductoInput) {

        actualizarProducto(id: $id, input: $input) {

            id
            nombre
            existencia
            precio

        }

    }

`;

export default function EditarProducto () {

    const 
    
    ROUTER                 = useRouter(),
    { pid }                = ROUTER.query,

    {data, loading, error} = useQuery(OBTENER_PRODUCTO, {

        variables: { id: pid }

    }),
    
    [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO),
    SCHEMA_VALIDATION      = object({

        nombre: string()
                    .required("El Nombre es un campo Obligatorio."),

        existencia: number()
                        .required("La Existencia es un campo Obligatorio.")
                        .positive("No se Aceptan Valores Negativos.")
                        .integer("No se Aceptan Valores Decimales."),

        precio: number()
                    .required("El Precio es un campo Obligatorio.")
                    .positive("No se Aceptan Valores Negativos.")

    });

    if (loading) return null;

    const { obtenerProducto } = data;

    async function actualizarInfoProducto (valores) {

        const {nombre, existencia, precio} = valores;

        try {
        debugger
            const { data } = await actualizarProducto({

                variables: {

                    id: pid,
                    input: {

                        nombre,
                        existencia,
                        precio

                    }

                }

            })

            Swal.fire(

                "Producto Actualizado",
                "El Producto se actualizó correctamente",
                "success"

            );

            ROUTER.push("/productos");

        } catch (err) {
          
            console.log(err);

        };

    };

    return (

        <Layout>

            <h1 className="text-2xl text-gray-800 font-light"> Editar Producto </h1>

            <div className="flex justify-center mt-5">

                <div className="w-full max-w-lg">

                    <Formik
                    
                        validationSchema={ SCHEMA_VALIDATION }
                        enableReinitialize
                        initialValues={ obtenerProducto }
                        onSubmit={valores => actualizarInfoProducto(valores)}
                    
                    >

                        { props => {

                            return (
                            
                                <form 
                                
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                                    onSubmit={props.handleSubmit}
                                    
                                >

                                    <div className="mb-4">

                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre"> Nombre : </label>

                                        <input
                                        
                                            className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                            id="nombre"
                                            type="text"
                                            placeholder="Nombre del Producto :"
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            value={props.values.nombre}
                                        
                                        />

                                    </div>

                                    { 

                                        props.touched.nombre && props.errors.nombre

                                            ? (
                                            
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                                    <p className="font-bold"> Error </p>
                                                    <p>{props.errors.nombre}</p>

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
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            value={props.values.existencia}

                                        />

                                    </div>

                                    { 

                                        props.touched.existencia && props.errors.existencia

                                            ? (
                                        
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                                    <p className="font-bold"> Error </p>
                                                    <p>{props.errors.existencia}</p>

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
                                            placeholder="Precio :"
                                            onBlur={props.handleBlur}
                                            onChange={props.handleChange}
                                            value={props.values.precio}

                                        />

                                    </div>


                                    { 

                                        props.touched.precio && props.errors.precio

                                            ? (
                                            
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                                    <p className="font-bold"> Error </p>
                                                    <p>{ props.errors.precio }</p>

                                                </div>
                                                
                                            )
                                            : null

                                    }

                                    <input
                                    
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                                        value="Actualizar Producto"

                                    />

                                </form>
                                
                            )

                        }}

                    </Formik>

                </div>

            </div>

        </Layout>

    );

};