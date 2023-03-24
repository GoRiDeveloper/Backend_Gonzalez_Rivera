import { randomUUID as generateID } from "crypto";
import PRODS from "../src/server/containers/products/index.js";
import ErrorAlphabetic from "../src/server/errors/error_alphabetic.js";
import ErrorArray from "../src/server/errors/error_array.js";
import ErrorCouldNotGet from "../src/server/errors/error_could_not_get.js";
import ErrorNumber from "../src/server/errors/error_number.js";
// Variable para agregar un ID donde realizaremos pruebas de los métodos.
let pruebaID;
// Persistencia por defecto en las variables de entorno.
describe("Pruebas con guardado de datos en un archivo de texto", () => {
    describe("Pruebas unitarias de funciones del Contenedor de Productos", () => {

        it("Prueba del método addProd()", async () => {

            let

            data = {

                id: generateID(),
                name: "Laptop",
                description: "Lapotop de buena calidad.",
                img: "https://www.google.com/img.png",
                price: "20000",
                stock: "50"

            },
            prod = await PRODS.addProd(data);

            const {id, name, description: desc, img, price, stock} = prod;

            if (!prod) 
                throw new ErrorCouldNotGet();
            if (Object.keys(prod).length < 6)
                throw new ErrorCouldNotGet();
            if (!(typeof id === "string")) 
                throw new ErrorAlphabetic({ id });
            if (!(typeof name === "string")) 
                throw new ErrorAlphabetic({ name });
            if (!(typeof desc === "string")) 
                throw new ErrorAlphabetic({ desc });
            if (!(typeof img === "string")) 
                throw new ErrorAlphabetic({ img });
            if (!(typeof price === "number")) 
                throw new ErrorNumber({ price });
            if (!(typeof stock === "number")) 
                throw new ErrorNumber({ stock });
            // ID asignado a la variable para futuras pruebas.
            pruebaID = id;

        });

        it("Prueba del método getProds()", async () => {

            let 
            
            prods = await PRODS.getProds(),
            res   = prods.data();

            if (!res) 
                throw new ErrorCouldNotGet();
            if (!(products instanceof Array)) 
                throw new ErrorArray();

        });

        it("Prueba del método getProd()", async () => {

            let 

            prod = await PRODS.getProd(pruebaID);
            res  = prod.data();

            if (!res)
                throw new ErrorCouldNotGet();
            if (typeof res !== "object")
                throw new Error("El Producto no es un objeto.");

        });

        it("Prueba del método updatedProd()", async () => {

            let

            id      = pruebaID,
            data    = {

                name: "Nueva Laptop",
                description: "Laptop mejorada.",
                img: "https://www.google.com/img.jpg",
                price: "15000",
                stock: "100"

            },
            updated = await PRODS.updatedProd(id, data);

            const {id: newID, name, description: desc, img, price, stock} = updated;

            if (!updated) 
                throw new ErrorCouldNotGet();
            if (Object.keys(updated).length < 6)
                throw new ErrorCouldNotGet();
            if (!(typeof newID === "string")) 
                throw new ErrorAlphabetic({ id });
            if (!(typeof name === "string")) 
                throw new ErrorAlphabetic({ name });
            if (!(typeof desc === "string")) 
                throw new ErrorAlphabetic({ desc });
            if (!(typeof img === "string")) 
                throw new ErrorAlphabetic({ img });
            if (!(typeof price === "number")) 
                throw new ErrorNumber({ price });
            if (!(typeof stock === "number")) 
                throw new ErrorNumber({ stock });
            if (newID !== id)
                throw new Error("El ID cambió.");
            if (name !== data.name)
                throw new Error("El Nombre no cambio.");
            if (desc !== data.description)
                throw new Error("La descripción no cambio.");
            if (img !== data.img)
                throw new Error("La Imagén no cambio.");
            if (price !== data.price)
                throw new Error("El Precio no cambio.");
            if (stock !== data.stock)
                throw new Error("El Nombre no cambio.");            

        });

        it("Prueba del método deleteProd()", async () => {

            let

            id      = pruebaID,
            deleted = await PRODS.deleteProd(id);

            if (!deleted)
                throw new ErrorCouldNotGet();
            if (deleted.id !== id)
                throw new Error("El ID no coincide con el objeto eliminado.");

        });

    });
});