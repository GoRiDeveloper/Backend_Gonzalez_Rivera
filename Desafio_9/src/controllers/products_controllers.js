import { PRODS } from "../persistence/containers/prods_container.js";

async function controllerGetProducts (req, res) {

    const PRODUCTS = await PRODS.getProds(5);

    PRODUCTS 

        ? res.status(200).json(PRODUCTS)
        : res.status(404).json({ Error: "No existen Productos" });

};

export { controllerGetProducts };