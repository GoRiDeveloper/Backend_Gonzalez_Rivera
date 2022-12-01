import { mySqlConfig } from "../../db/db_config.js";

class Products {

    constructor (client, table) {

        this.client = client;
        this.table = table;

    };

    async getAll() {

        const DATA = await this.client(this.table).select();

        if (DATA && DATA.length > 0) {

            return DATA;
            
        } else {

            return null;
            
        };

    };

    async getProd (id) {

        const PROD = await this.client(this.table).select().where("id", id);

        if (PROD && PROD.length > 0) {

            return PROD;
            
        } else {

            return null;
            
        };

    };

    async postProd (prod) {

        let DATA = await this.getAll();

        if (DATA) {

            const EXIST = DATA.find(item => item.name === prod.name);

            if (EXIST) {

                const { id, stock } = EXIST,
                          NEW_STOCK = stock + prod.stock;

                await this.client(this.table).where("id", id).update({ stock: NEW_STOCK });

                DATA = await this.getAll();

                if (DATA) {

                    return DATA;
                    
                } else {

                    return DATA;
                    
                }; 
                
            } else {

                await this.client(this.table).insert(prod);

                DATA = await this.getAll();

                if (DATA) {

                    return DATA;

                } else {

                    return DATA;

                };
                
            };
        
        } else {

            await this.client(this.table).insert(prod);

            DATA = await this.getAll();

            if (DATA) {

                return DATA;

            } else {

                return DATA;

            };
        
        };

    };

    async putProd (modify) {

        let DATA = await this.getAll();

        if (DATA) {

            const PROD = DATA.find(items => items.id === modify.id);

            if (PROD) {

                let price, stock;
                const { id, body } = modify;

                let NEW_PROD = {

                    ...PROD,
                    ...body

                };

                if (body.price) {
                  
                    price = parseFloat(body.price);
                    Object.defineProperty(NEW_PROD, "price", { value: price, writable: true });
                    
                };

                if (body.stock) {
                    
                    stock = parseFloat(body.stock);
                    Object.defineProperty(NEW_PROD, "stock", { value: stock, writable: true });

                };

                await this.client(this.table).where("id", id).update(NEW_PROD);

                DATA = await this.client(this.table).select();

                if (DATA) {

                    return DATA;
                    
                } else {

                    return DATA;
                    
                };
                
            } else {

                return null;
                
            };

        } else {

            return DATA;

        };

    };
    
    async deleteProd (id) {

        let DATA = await this.getAll();

        if (DATA) {

            const PROD = DATA.find(item => item.id === id);

            if (PROD) {

                await this.client(this.table).where("id", id).del();

                DATA = await this.getAll();

                if (DATA) {

                    const CONFIRMATION = DATA.some(item => item.id === id);

                    if (CONFIRMATION) {

                        return null;
                        
                    } else {

                        return PROD;
                        
                    };
                    
                } else {

                    return PROD;
                    
                };
                
            } else {

                return null;
                
            };
            
        } else {

            return DATA;
            
        };

    };

};

export const prods = new Products(mySqlConfig, "Products");