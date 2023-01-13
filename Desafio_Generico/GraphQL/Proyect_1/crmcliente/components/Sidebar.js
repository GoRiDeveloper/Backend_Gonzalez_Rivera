import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar () {

    const ROUTER = useRouter();

    return (

        <aside className="bg-gray-800 sm:min-h-screen sm:w-1/3 xl:w-1/5 p-5">

            <div>

                <p className="text-white text-2xl font-black"> CRM Clientes </p>

            </div>

            <nav className="mt-5 list-none">

                <li className={ 

                    ROUTER.pathname === "/" 
                        ? "bg-blue-800 p-2" 
                        : "p-3" 
                    
                }>

                    <Link href="/" className="text-white block">
                        Clientes
                    </Link>

                </li>

                <li className={
                    
                    ROUTER.pathname === "/pedidos"
                        ? "bg-blue-800 p-2"
                        : "p-3"
                    
                }>

                    <Link href="/pedidos" className="text-white block">
                        Pedidos
                    </Link>

                </li>

                <li className={
                    
                    ROUTER.pathname === "/productos"
                        ? "bg-blue-800 p-2"
                        : "p-3"
                    
                }>

                    <Link href="/productos" className="text-white block"> 
                        Productos 
                    </Link>

                </li>

            </nav>

        </aside>

    );

};