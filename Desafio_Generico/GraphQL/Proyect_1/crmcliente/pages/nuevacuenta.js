import React, { useState } from "react";
import Layout from "../components/Layout.js";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVA_CUENTA = gql`

    mutation nuevoUsuario($input: UsuarioInput) {

        nuevoUsuario(input: $input) {

            id
            nombre
            apellido
            email

        }

    }

`;

export default function NuevaCuenta () {

    const 
    
    ROUTER                    = useRouter(),
    [mensaje, guardarMensaje] = useState(null),
    [ nuevoUsuario ]          = useMutation(NUEVA_CUENTA);
                        
    const FORMIK = useFormik({

        initialValues: {

            nombre: "",
            apellido: "",
            email: "",
            password: ""

        },
        validationSchema: object({

            nombre: string()
                        .required("El Nombre es obligatorio."),

            apellido: string()
                        .required("El Apellido es obligatorio."),

            email: string()
                        .email("El E-Mail no es valido.")
                        .required("El E-Mail es obligatorio."),

            password: string()
                        .required("La Contraseña es obligatoria.")
                        .min(6, "La Contraseña debe ser de al menos 6 caracteres.")

        }),
        onSubmit: async valores => {

            const { nombre, apellido, email, password } = valores;

            try {

                const { data } = await nuevoUsuario({

                    variables: {

                        input: {

                            nombre,
                            apellido,
                            email,
                            password

                        }

                    }

                });
                console.log(data);

                guardarMensaje(`Bienvenido "${data.nuevoUsuario.nombre}", has sido registrado.`);

                setTimeout(() => {

                    guardarMensaje(null);
                    ROUTER.push("/login");

                }, 2500);

            } catch (err) {

                guardarMensaje(err.message);

                setTimeout(() => guardarMensaje(null), 3500);

            };

        }

    });

    const mostarMensaje = () => {

        return (

            <div className="bg-white rounded py-2 px-3 w-full my-3 max-w-sm text-center text-black mx-auto">

                <p>{mensaje}</p>

            </div>

        );

    };

    return (

        <>

            <Layout>

                {mensaje && mostarMensaje()}

                <h1 className="text-center text-2xl text-white font-light"> Nueva Cuenta </h1>

                <div className="flex justify-center mt-5">

                    <div className="w-full max-w-sm">

                        <form className="bg-white rounded shadow-md px-8 pb-8 mb-4" onSubmit={FORMIK.handleSubmit}>

                            <div className="pb-4">

                                <label className="block text-gray-700 text-sm font-bold mb-2 pt-8" htmlFor="nombre"> Nombre : </label>

                                <input
                                
                                    className= "bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    id="nombre"
                                    type="text"
                                    placeholder="Ingresa tu Nombre :"
                                    value={FORMIK.values.nombre}
                                    onChange={FORMIK.handleChange}
                                    onBlur={FORMIK.handleBlur}
                                
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

                            <div className="pb-4">

                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido"> Apellidos : </label>

                                <input
                                
                                    className= "bg-white border border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    id="apellido"
                                    type="text"
                                    placeholder="Ingresa tus Apellidos :"
                                    value={FORMIK.values.apellido}
                                    onChange={FORMIK.handleChange}
                                    onBlur={FORMIK.handleBlur}
                                
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

                            <div className="pb-4">

                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"> E-Mail : </label>

                                <input
                                
                                    className= "bg-white border border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    id="email"
                                    type="email"
                                    placeholder="Ingresa tu E-Mail :"
                                    value={FORMIK.values.email}
                                    onChange={FORMIK.handleChange}
                                    onBlur={FORMIK.handleBlur}
                                
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

                            <div className="pb-4">

                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Contraseña : </label>

                                <input
                                
                                    className= "bg-white border border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    id="password"
                                    type="password"
                                    placeholder="Ingresa tu Contraseña :"
                                    value={FORMIK.values.password}
                                    onChange={FORMIK.handleChange}
                                    onBlur={FORMIK.handleBlur}
                                
                                />

                            </div>

                            { 
                            
                                FORMIK.touched.password && FORMIK.errors.password

                                    ? (

                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">

                                            <p className="font-bold"> Error </p>
                                            <p>{FORMIK.errors.password}</p>

                                        </div>

                                    )
                                    : null
                        
                            }

                            <input
                            
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                                value="Crear Cuenta"

                            />

                        </form>

                    </div>

                </div>

            </Layout>

        </>

    );

};