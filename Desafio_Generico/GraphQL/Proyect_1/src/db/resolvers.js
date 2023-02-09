import { MODELO as Usuario } from "../models/Usuario.js";
import { MODELO as Producto } from "../models/Producto.js";
import { MODELO as Cliente } from "../models/Clientes.js";
import { MODELO as Pedido } from "../models/Pedidos.js";
import { config } from "dotenv";
import pkgJSON from "jsonwebtoken";
import pkgBCRYPT from "bcryptjs";

config({ path: "variables.env" });

const { genSalt, hash, compare } = pkgBCRYPT,
                { sign, verify } = pkgJSON;

function crearToken (usuario, secreta, expiracion) {

    const { id, email, nombre, apellido } = usuario;

    return sign({ id, email, nombre, apellido }, secreta, { expiresIn: expiracion });

};

const resolvers = {

    Query: {

        obtenerUsuario: async (_, {}, ctx) => {

            //const USUARIO_ID = verify(token, process.env.SECRET);
            return ctx.USUARIO;

        },
        obtenerProductos: async () => {

            try {

                const PRODUCTOS = await Producto.find({});
                return PRODUCTOS;

            } catch (err) {

                console.log(err);

            };

        },
        obtenerProducto: async (_, { id }) => {

            const PRODUCTO = await Producto.findById(id);

            if (!PRODUCTO) 
                throw new Error(`El producto con el ID : "${id}", no existe.`);

            return PRODUCTO;

        },
        obtenerClientes: async () => {

            try {

                const CLIENTES = await Cliente.find({});
                return CLIENTES;

            } catch(err) {

                console.log(err);

            };

        },
        obtenerClientesVendedor: async (_, {}, ctx) => {

            if (!ctx.USUARIO)
                throw new Error("No se pudo Autenticar el Usuario.");

            try {
                
                const CLIENTES = await Cliente.find({ vendedor: ctx.USUARIO.id.toString() });
                return CLIENTES;

            } catch (err) {
              
                console.log(err);

            };

        },
        obtenerCliente: async (_, { id }, ctx) => {

            const CLIENTE = await Cliente.findById(id);

            if (!CLIENTE)
                throw new Error(`El cliente con el ID : "${id}", no existe.`);

            if (CLIENTE.vendedor.toString() !== ctx.USUARIO.id) 
                throw new Error("No tienes las credenciales.");

            return CLIENTE;

        },
        obtenerPedidos: async () => {

            try {

                const PEDIDOS = await Pedido.find({});
                return PEDIDOS;
                
            } catch (err) {

                console.log(err);

            };

        },
        obtenerPedidosVendedor: async (_, {}, ctx) => {

            try {

                const PEDIDOS = await Pedido.find({ vendedor: ctx.USUARIO.id })
                                                .populate("cliente");

                return PEDIDOS;
                
            } catch (err) {
              
                console.log(err);
                
            };

        },
        obtenerPedido: async (_, { id }, ctx) => {

            const PEDIDO = await Pedido.findById(id);

            if (!PEDIDO)
                throw new Error(`El Pedido con el ID : "${id}", no existe.`);

            if (PEDIDO.vendedor.toString() !== ctx.USUARIO.id)
                throw new Error("No tienes las credenciales.");

            return PEDIDO;

        },
        obtenerPedidosEstado: async (_, { estado }, ctx) => {

            const PEDIDOS = await Pedido.find({ vendedor: ctx.USUARIO.id, estado });
            return PEDIDOS;

        },
        mejoresClientes: async () => {

            const CLIENTES = await Pedido.aggregate([

                { $match: { estado: "COMPLETADO" } },
                { $group: {

                    _id: "$cliente",
                    total: { $sum: "$total" }

                }},
                { $lookup: {

                    from: "clientes",
                    localField: "_id",
                    foreignField: "_id",
                    as: "cliente"

                }},
                { $limit: 10 },
                { $sort: { total: -1 } }

            ]);

            return CLIENTES;

        },
        mejoresVendedores: async () => {

            const VENDEDORES = await Pedido.aggregate([

                { $match: { estado : "COMPLETADO" } },
                { $group: { 

                    _id: "$vendedor",
                    total: { $sum: "$total" }

                }},
                { $lookup: {

                    from: "usuarios",
                    localField: "_id",
                    foreignField: "_id",
                    as: "vendedor"

                }},
                { $limit: 5 },
                { $sort: { total: -1 } }

            ]);

            return VENDEDORES;

        },
        buscarProducto: async (_, { texto }) => {

            const PRODUCTOS = await Producto.find({ $text: { $search: texto } }).limit(10);
            return PRODUCTOS;

        }

    },
    Mutation: {

        nuevoUsuario: async (_, { input }) => {
            
            const { email, password } = input,
                               EXISTE = await Usuario.findOne({email});

            if (EXISTE) 
                throw new Error(`El Usuario con el E-Mail "${email}" ya esta registrado.`);

            const SALT = await genSalt(10);
            input.password = await hash(password, SALT);

            try {

                const USUARIO = await new Usuario(input);
                USUARIO.save();

                return USUARIO;
                
            } catch (err) {

                console.log(err);

            };

        },
        autenticarUsuario: async (_, { input }) => {

            const { email, password } = input,
                               EXISTE = await Usuario.findOne({email});

            if (!EXISTE)
                throw new Error(`El Usuario "${email}" no existe.`);

            const CONTRASEÑA = await compare(password, EXISTE.password);

            if (!CONTRASEÑA) 
                throw new Error("La Contraseña es incorrecta.");

            return {

                token: crearToken(EXISTE, process.env.SECRET, "24hr")

            };

        },
        nuevoProducto: async (_, { input }) => {

            try {

                const PRODUCTO = new Producto(input),
                     RESULTADO = await PRODUCTO.save();

                return RESULTADO;
                
            } catch (err) {
              
                console.log(err);

            };

        },
        actualizarProducto: async (_, {id, input}) => {

            let producto = await Producto.findById(id);

            if (!producto)
                throw new Error(`El Producto con el ID : "${id}", no existe.`);

            producto = await Producto.findOneAndUpdate({ _id: id }, input, { new: true });
            return producto;

        },
        eliminarProducto: async (_, { id }) => {

            const PRODUCTO = await Producto.findById(id);

            if (!PRODUCTO)
                throw new Error(`El Producto con el ID : "${id}", no existe.`)

            await Producto.findOneAndDelete({ _id: id });

            return `El Producto con el ID : "${id}", eliminado.`;

        },
        nuevoCliente: async (_, { input }, ctx) => {

            const { email } = input,
                    CLIENTE = await Cliente.findOne({ email });

            if (CLIENTE) 
                throw new Error(`El Cliente con el E-Mail : "${email}", ya esta registrado.`);

            const NUEVO_CLIENTE = new Cliente(input);
        
            NUEVO_CLIENTE.vendedor = ctx.USUARIO.id;
        
            try {
                
                const RESULTADO = await NUEVO_CLIENTE.save();
                return RESULTADO; 

            } catch(err) {

                console.log(err);

            };

        },
        actualizarCliente: async (_, {id, input}, ctx) => {

            let cliente = await Cliente.findById(id);

            if (!cliente)
                throw new Error(`El Cliente con el ID : "${id}", no existe.`);

            if (cliente.vendedor.toString() !== ctx.USUARIO.id)
                throw new Error("No tienes las credenciales.");

            cliente = await Cliente.findOneAndUpdate({ _id: id }, input, { new: true });
            return cliente;

        },
        eliminarCliente: async (_, { id }, ctx) => {

            const CLIENTE = await Cliente.findById(id);

            if (!CLIENTE)
                throw new Error(`El Cliente con el ID : "${id}", no existe.`)

            if (CLIENTE.vendedor.toString() !== ctx.USUARIO.id)
                throw new Error("No tienes las credenciales.");

            await Cliente.findOneAndDelete({ _id: id });

            return `Cliente con el ID : "${id}", eliminado.`

        },
        nuevoPedido: async (_, { input }, ctx) => {

            const { cliente } = input;

            let existe = await Cliente.findById(cliente);

            if (!existe)
                throw new Error(`El Cliente : "${cliente}", no existe.`)

            if (existe.vendedor.toString() !== ctx.USUARIO.id)
                throw new Error("No tienes las credenciales.");

            for await (const ITEM of input.pedido) {

                const { id, cantidad } = ITEM,
                    PRODUCTO = await Producto.findById(id);

                if (cantidad > PRODUCTO.existencia) {

                    throw new Error(`El Producto : "${PRODUCTO.nombre}", excede el stock.`);

                } else {

                    PRODUCTO.existencia = PRODUCTO.existencia - cantidad;
                    await PRODUCTO.save();

                };

            };

            const NUEVO_PEDIDO = new Pedido(input);

            NUEVO_PEDIDO.vendedor = ctx.USUARIO.id;

            const RESULTADO = await NUEVO_PEDIDO.save();
            return RESULTADO;

        },
        actualizarPedido: async (_, {id, input}, ctx) => {

            const { cliente } = input,
                EXISTE_PEDIDO = await Pedido.findById(id);

            if (!EXISTE_PEDIDO)
                throw new Error(`El Pedido con el ID : "${id}", no existe.`);

            const EXISTE_CLIENTE = await Cliente.findById(cliente);

            if (!EXISTE_CLIENTE)
                throw new Error(`El Cliente con el ID : "${id}", no existe.`);

            if (EXISTE_CLIENTE.vendedor.toString() !== ctx.USUARIO.id)
                throw new Error("No tienes las credenciales.");
            
            if (input.pedido) {

                for await (const ITEM of input.pedido) {

                    const { id, cantidad } = ITEM,
                                PRODUCTO = await Producto.findById(id);

                    if (cantidad > PRODUCTO.existencia) {

                        throw new Error(`El Producto : "${PRODUCTO.nombre}", excede el stock.`);

                    } else {

                        PRODUCTO.existencia = PRODUCTO.existencia - cantidad;
                        await PRODUCTO.save();

                    };

                };

            };

            const RESULTADO = await Pedido.findOneAndUpdate({ _id: id }, input, { new: true });
            return RESULTADO;

        },
        eliminarPedido: async (_, { id }, ctx) => {

            const PEDIDO = await Pedido.findById(id);

            if (!PEDIDO)
                throw new Error(`El Pedido con el ID : ${id}, no existe.`);

            if (PEDIDO.vendedor.toString() !== ctx.USUARIO.id)
                throw new Error("No tienes las credenciales.");

            await Pedido.findOneAndDelete({ _id: id });

            return `Pedido con el ID : "${id}", eliminado.`;

        },
        //a: async () => {}

    }

};

export { resolvers };