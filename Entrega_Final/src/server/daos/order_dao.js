export class OrderDAO {

    #persistence;

    constructor (daoPersistence) {

        this.#persistence = daoPersistence;

    };

    async saveNewOrder (order) {

        return await this.#persistence.save(order);

    };

    async getOrdersFromUser (query) {

        return await this.#persistence
                            .findByProp(
                                query, 
                                { 
                                    filter: true, 
                                    error: false 
                                }
                            );

    };

};