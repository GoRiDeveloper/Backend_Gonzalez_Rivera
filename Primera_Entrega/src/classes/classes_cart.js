import fs from "fs";

const FS = fs.promises;

export default class Carts {

    #file
    #carts

    constructor (file) {

        this.#file = file;
        this.#carts = [];

    };

    async getCarts () {

        const DATA = await FS.readFile(this.#file, "utf-8");

        if (DATA) {

            const ARR = JSON.parse(DATA);

            if (ARR.length > 0) {

                return ARR;

            } else {

                return null;

            };
            
        } else {

            return null;
            
        };

    };

    async postCart (cart) {

        this.#carts.push(cart);
        await FS.writeFile(this.#file, JSON.stringify(this.#carts, null, "\t"));

        const CARTS = await this.getCarts();

        if (CARTS) {

            return CARTS;
            
        } else {

            return CARTS;
            
        };

    };

    async emptyCart (id) {

        let DATA = await this.getCarts();

        if (DATA) {

            const CART = DATA.findIndex(i => i.id === id);
            
            if (CART === -1) {

                return null;
                
            } else {

                this.#carts = [];
                this.#carts.push(...DATA);

                const EMPTY_CART = this.#carts[CART];

                await Object.defineProperty(EMPTY_CART, "products", { value: [], writable: true });
                await FS.writeFile(this.#file, JSON.stringify(this.#carts, null, "\t"));

                DATA = await this.getCarts();

                if (DATA) {

                    return EMPTY_CART;
                    
                } else {

                    return DATA;
                    
                };

            };
            
        } else {

            return DATA;
            
        };

    };

    async addProductToCart (id, prod) {

        let DATA = await this.getCarts();

        if (DATA) {

            const CART = DATA.findIndex(i => i.id === id);

            if (CART === -1) {

                return null;

            } else {

                this.#carts = [];
                this.#carts.push(...DATA);

                const CART_TO_ADD = this.#carts[CART],
                     { products } = CART_TO_ADD;

                if (products) {

                    await products.push(prod);
                    await FS.writeFile(this.#file, JSON.stringify(this.#carts, null, "\t"));

                    DATA = this.getCarts();

                    if (DATA) {

                        return CART_TO_ADD;
                        
                    } else {

                        return DATA;
                        
                    };

                } else {

                    return null;
                    
                };

                //await Object.defineProperty(ADD_PROD, "products", { value: , writable: true});
                
            };
            
        } else {

            return DATA;

        };

    };

    async getIdCart (id) {

        const DATA = await this.getCarts();

        if (DATA) {

            const CART = DATA.find(carts => carts.id === id);

            if (CART) {

                return CART;
                
            } else {

                return null;
                
            };
            
        } else {

            return DATA;
            
        };

    };

    async deleteProductToCart (idCart, idProd) {

        const DATA = await this.getCarts();

        if (DATA) {

            const CART = DATA.findIndex(i => i.id === idCart);  
            
            if (CART === -1) {

                return null;
                
            } else {

                this.#carts = [];
                this.#carts.push(...DATA);

                const CART_TO_DELETE = this.#carts[CART],
                        { products } = CART_TO_DELETE;

                if (products.length > 0) {

                    const PROD = products.findIndex(i => i.id === idProd);

                    if (PROD === -1) {

                        return null;

                    } else {
                        
                        const ERASED = products.splice(PROD, 1);
                        await FS.writeFile(this.#file, JSON.stringify(this.#carts, null, "\t"));

                        const NEW_DATA = await this.getCarts();

                        if (NEW_DATA) {

                            return ERASED;
                            
                        } else {

                            return NEW_DATA;
                            
                        };

                    };
                    
                } else {

                    return null;
                    
                };
                
            };
            
        } else {

            return DATA;
            
        };

    };

};