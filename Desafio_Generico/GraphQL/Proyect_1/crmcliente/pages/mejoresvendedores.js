import React, { useEffect } from "react";
import Layout from "../components/Layout.js";
import { useQuery, gql } from "@apollo/client";
import {

    BarChart,
    Bar, 
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend

} from "recharts";

const MEJORES_VENDEDORES = gql`

    query mejoresVendedores { 
        
        mejoresVendedores {

            vendedor {

                nombre
                email

            }
            total

        }
    
    }

`;

export default function MejoresVendedores () {

    const 
    
    VENDEDOR_GRAFICA = [],

    {

        data, 
        loading, 
        error, 
        startPolling, 
        stopPolling

    } = useQuery(MEJORES_VENDEDORES);

    useEffect(() => {

        startPolling(1000);
        
        return () => {

            stopPolling();

        }

    }, [startPolling, stopPolling]); 

    if (loading) return null;

    const { mejoresVendedores } = data;

    mejoresVendedores.map((vendedor, index) => {

        VENDEDOR_GRAFICA[index] = {

            ...vendedor.vendedor[0],
            total: vendedor.total

        }

    });

    return (

        <Layout>

            <h1 className="text-2xl text-gray-800 font-light"> Mejores Vendedores </h1>

            <BarChart
            
                className="mt-10"
                width={600}
                height={500}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5
                }}
            
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3182CE" />

            </BarChart>

        </Layout>

    );

};