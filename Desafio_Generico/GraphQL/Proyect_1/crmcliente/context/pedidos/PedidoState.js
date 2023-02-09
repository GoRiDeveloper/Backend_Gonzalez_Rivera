import react, { useReducer } from "react";
import { PedidoContext } from "./PedidoContext.js";
import PedidoReducer from "./PedidoReducer.js";
import {

    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL

} from "../../types";

export default function PedidoState ({ children }) {

    const 
    
    INITIAL_STATE = {

        cliente: {},
        productos: [],
        total: 0

    },
    [state, dispatch] = useReducer(PedidoReducer, INITIAL_STATE);

    function agregarCliente (cliente) {

        dispatch({

            type: SELECCIONAR_CLIENTE,
            payload: cliente

        });

    };

    function agregarProductos (nuevosProductosSeleccionados) {

        let nuevoState;

        if (state.productos.length > 0) {

            nuevoState = nuevosProductosSeleccionados

                            .map(producto => {

                                const NUEVO_OBJETO = state.productos.find(productoState => 

                                                            productoState.id === producto.id

                                                    );

                                return {...producto, ...NUEVO_OBJETO};

                            });

        } else {

            nuevoState = nuevosProductosSeleccionados;

        };

        dispatch({

            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState

        });

    };

    function cantidadProductos (nuevoProducto) {

        dispatch({

            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto

        });

    };

    function actualizarTotal () {

        dispatch({

            type: ACTUALIZAR_TOTAL

        });

    };

    return (

        <PedidoContext.Provider
        
            value={{

                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                agregarCliente,
                agregarProductos,
                cantidadProductos,
                actualizarTotal

            }}
        
        >

            {children}

        </PedidoContext.Provider>

    );

};