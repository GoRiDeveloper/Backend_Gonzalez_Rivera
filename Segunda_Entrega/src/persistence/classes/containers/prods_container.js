import { containerProducts } from "./switch_containers.js";
import { PERSISTENCE } from "../../config/config.js";
import { 

    verifyExists, 
    productValidation,
    updateValidation 

} from "../../../functions/functions.js"

class ContainerProds {

    constructor () {

        this.container = containerProducts;

    };

    async getProds () {

        const DATA = await this.container.getAll();

        if (!DATA) return null;

        return DATA;

    };

    async getProd (id) {

        const PROD = await this.container.getOne(id);

        if (!PROD) return null;

        return PROD;

    };

    async postProd (prod) {

        let exists;
        const DATA = await this.getProds(),
                DB = PERSISTENCE === "mongodb";

        if (DATA) exists = verifyExists(DATA, prod);

        if (exists) {
            
            prod.stock = exists.stock;

            const NEW_PROD = productValidation(prod);

            DB
                ? NEW_PROD._id = exists.id
                : NEW_PROD.id = exists.id;

            if (DB) delete NEW_PROD.id;

            const UPDATE_PROD = await this.container.updateOne(NEW_PROD);

            if (!UPDATE_PROD) return null;

            return UPDATE_PROD;

        } else {

            const NEW_PROD = productValidation(prod),
                  ADD_PROD = await this.container.save(NEW_PROD);

            if (!ADD_PROD) return null;
            
            return ADD_PROD;

        };

    };

    async putProd (id, prod) {

        let item;
        const DATA = await this.getProds();

        if (!DATA) return DATA;
        if (PERSISTENCE === "mongodb") {
            
            item = DATA.find(items => items._id === id);

        } else {

            item = DATA.find(items => items.id === id);

        };
        if (!item) return null;

        const VERIFY_PROD = updateValidation(prod),
                 NEW_PROD = {

                    ...item,
                    ...VERIFY_PROD

                };

        const UPDATE_PROD = await this.container.updateOne(NEW_PROD);

        if (!UPDATE_PROD) return UPDATE_PROD;

        return UPDATE_PROD;

    };

    async deleteProd (id) {

        const DATA = await this.getProds();

        if (!DATA) return DATA;

        const DELETE = await this.container.deleteOne(id);

        if (!DELETE) return DELETE;

        return DELETE;

    };

};

const PRODS = new ContainerProds();

export { PRODS };