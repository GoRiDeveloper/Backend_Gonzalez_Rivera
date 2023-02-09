import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo.js";
import PedidoState from "../context/pedidos/PedidoState.js";
import '../styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
  
    <ApolloProvider client={client}>

      <PedidoState>

        <Component {...pageProps} />

      </PedidoState>

    </ApolloProvider>

  );
  
};