import { PRODUCTS as PRODS } from "../containers/server_containers/products_container.js";

export async function controllerGetProducts (req, res) {

    const PRODUCTS = await PRODS.getProducts(5);

    PRODUCTS

        ? res.status(200).json(PRODUCTS)
        : res.status(404).json({ Error: "No existen Productos." });

};