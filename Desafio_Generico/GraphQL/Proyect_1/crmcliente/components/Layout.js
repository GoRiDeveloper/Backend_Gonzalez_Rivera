import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar.js";
import Header from "./Header.js";
import { useRouter } from "next/router";

export default function Layout ({children}) {

    const ROUTER = useRouter();

    return (

        <>

            <Head>

                <title> CRM - Administración de Clientes </title>

                <script defer src="https://cdn.tailwindcss.com"></script>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

            </Head>

            {

                ROUTER.pathname === "/login" || ROUTER.pathname === "/nuevacuenta"

                    ? (

                        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">

                            <div>

                                {children}
                                
                            </div>

                        </div>

                    )
                    : (

                        <div className="bg-gray-200 min-h-screen">

                            <div className="flex min-h-screen">

                                <Sidebar />

                                <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">

                                    <Header />
                                    {children}

                                </main>

                            </div>

                        </div>

                    )

            }
        
        </>

    );

};