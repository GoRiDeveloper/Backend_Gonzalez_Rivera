import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useMutation, gql } from "@apollo/client";
import Layout from "../components/Layout.js";

const AUTENTICAR_USUARIO = gql`

    mutation autenticarUsuario($input: AutenticarInput) {

        autenticarUsuario(input: $input) {

            token

        }

    }

`;

export default function Login () {
    
    const 
    
    ROUTER                    = useRouter(),  
    [mensaje, guardarMensaje] = useState(null),
    [autenticarUsuario]       = useMutation(AUTENTICAR_USUARIO),
    FORMIK                    = useFormik({

        initialValues: {

            email: "",
            password: ""

        },
        validationSchema: object({

            email: string()
                    .email("El E-Mail no es válido.")
                    .required("El E-Mail es obligatorio."),

            password: string()
                        .required("La Contraseña es obligatoria.")

        }),
        onSubmit: async valores => {

            const { email, password } = valores;

            try {

                const { data } = await autenticarUsuario({

                    variables: {

                        input: {

                            email,
                            password

                        }

                    }

                });

                guardarMensaje(`Autenticando el Usuario : "${email}"`);

                const { token } = data.autenticarUsuario;
                localStorage.setItem("token", token);

                setTimeout(() => {

                    guardarMensaje(null);
                    ROUTER.push("/");

                }, 2500);

            } catch (err) {

                guardarMensaje(err.message);

                setTimeout(() => guardarMensaje(null) , 3500);

            };

        }

    });

    if (typeof window !== "undefined") {

        if (localStorage.getItem("token")) {
    
            ROUTER.push("/");
        
        };

    };

    function mostrarMensaje () {

        return (

            <div className="bg-white rounded py-2 px-3 w-full my-3 max-w-sm text-center text-black mx-auto">

                <p>{mensaje}</p>

            </div>

        );

    };

    return (

        <>

            <Layout>

                {mensaje && mostrarMensaje()}

                <h1 className="text-center text-2xl text-white font-light"> Login </h1>

                <div className="flex justify-center mt-5">

                    <div className="w-full max-w-sm">

                        <form className="bg-white rounded shadow-md px-8 pb-8 mb-4" onSubmit={FORMIK.handleSubmit}>

                            <div className="pb-4">

                                <label className="block text-gray-700 text-sm font-bold mb-2 pt-8" htmlFor="email"> E-mail : </label>

                                <input
                                
                                    className= "bg-white border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    id="email"
                                    type="email"
                                    placeholder="Ingresa tu E-Mail :"
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

                            <div className="pb-4">

                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Contraseña : </label>

                                <input
                                
                                    className= "bg-white border border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    id="password"
                                    type="password"
                                    placeholder="Ingresa tu Contraseña :"
                                    onChange={FORMIK.handleChange}
                                    onBlur={FORMIK.handleBlur}
                                    value={FORMIK.values.password}
                                
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
                                    :null

                            }

                            <input
                            
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                                value="Iniciar Sesión"

                            />

                        </form>

                    </div>

                </div>

            </Layout>

        </>

    );

};