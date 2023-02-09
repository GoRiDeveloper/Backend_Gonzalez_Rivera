import React from "react";
import Swal from "sweetalert2";
import Layout from "../../components/Layout.js";
import { useRouter } from "next/router";
import { object, string } from "yup";
import { Formik } from "formik";
import { useQuery, useMutation, gql } from "@apollo/client";

const

OBTENER_CLIENTE = gql`

    query obtenerCliente($id: ID!) {

        obtenerCliente(id: $id) {

            nombre
            apellido
            email
            telefono
            empresa

        }

    }

`,

ACTUALIZAR_CLIENTE = gql`

    mutation actualizarCliente($id: ID!, $input: ClienteInput) {

        actualizarCliente(id: $id, input: $input) {

            nombre
            email

        }

    }

`;

export default function EditarCliente () {

    const 
    
    ROUTER                 = useRouter(),
    { pid }                = ROUTER.query,

    {data, loading, error} = useQuery(OBTENER_CLIENTE, {

        variables: { id: pid }

    }),

    [ actualizarCliente ]  = useMutation(ACTUALIZAR_CLIENTE),
    SCHEMA_VALIDATION      = object({

        nombre: string()
                    .required("El Nombre es un campo Obligatorio."),

        apellido: string()
                    .required("El apellido es un campo Obligatorio."),

        empresa: string()
                    .required("La Empresa es un campo Obligatorio."),

        email: string()
                    .email("El E-Mail no es válido.")
                    .required("El E-Mail es un campo Obligatorio.")

    });

    if (loading) return null;

    const { obtenerCliente } = data;

    async function actualizarInfoCliente (valores) {

        const {nombre, apellido, email, empresa, telefono} = valores;

        try {

            const { data } = await actualizarCliente({

                variables: {

                    id: pid,
                    input: {

                        nombre,
                        apellido,
                        email,
                        empresa,
                        telefono

                    }

                }

            });

            Swal.fire(

                "Cliente Actualizado",
                "El Cliente se actualizó correctamente.",
                "success"

            );

            ROUTER.push("/");
            
        } catch (err) {

            console.log(err);

        };

    };

    return (

        <Layout>

            <h1 className="text-2xl text-gray-800 font-light"> Editar Cliente </h1>

            <div className="flex justify-center mt-5">
                
                <div className="w-full max-w-lg">

                    <Formik
                    
                        validationSchema={ SCHEMA_VALIDATION }
                        enableReinitialize
                        initialValues={ obtenerCliente }
                        onSubmit={valores => actualizarInfoCliente(valores)}
                    
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
                                            placeholder="Nombre del Cliente :"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
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

                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido"> Apellido : </label>

                                        <input
                                        
                                            className="bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                            id="apellido"
                                            type="text"
                                            placeholder="Apellido del Cliente :"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.apellido}
                                        
                                        />

                                    </div>

                                    {

                                        props.touched.apellido && props.errors.apellido

                                            ? (
                                            
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                                    <p className="font-bold"> Error </p>
                                                    <p>{props.errors.apellido}</p>

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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.empresa}
                                        
                                        />

                                    </div>

                                    {

                                        props.touched.empresa && props.errors.empresa

                                            ? (
                                            
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                                    <p className="font-bold"> Error </p>
                                                    <p>{props.errors.empresa}</p>

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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        
                                        />

                                    </div>

                                    {

                                        props.touched.email && props.errors.email

                                            ? (
                                            
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                                    <p className="font-bold"> Error </p>
                                                    <p>{props.errors.email}</p>

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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.telefono}
                                        
                                        />

                                    </div>

                                    <input
                                    
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                                        value="Actualizar Cliente"

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