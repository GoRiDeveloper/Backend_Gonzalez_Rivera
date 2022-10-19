const fs = require("fs").promises;

class Container {

    #product

    constructor() {

        this.#product = [];

    }

    async save(object) {

        try {

            //object['id'] = this.#product.length + 1; o Date.now();
            this.#product.push(object);
            await fs.writeFile("./products.json", JSON.stringify(this.#product, null, "\t"));
            console.log("ID agregado : " + object.id + "\n");

        } catch (err) {
            
            console.log("Error :" + err);

        }

    }

    async getById(number) {

        try {
            
            await fs.readFile("./products.json", "utf-8")
                .then(file => {

                    const arr = JSON.parse(file);
                    arr.length > 0

                        ? arr.filter(el => el.id === number) 
                        : null;

                    console.log("Producto Obtenido :");
                    console.log(arr.filter(el => el.id === number));
                    console.log("\n");

                });

        } catch (err) {

            console.log("Error :" + err);

        }

    }

    async getAll() {

        try {

            await fs.readFile("./products.json", "utf-8")
                .then(file => {

                    const arr = JSON.parse(file);
                    console.log("Todos los Productos : ");
                    console.log(arr || null);
                    console.log("\n");

                });

        } catch (err) {

            console.log("Error :" + err);

        }

    }

    async deleteById(number) {

        let del = this.#product.map(el => el.id).indexOf(number);

        try {
            
            this.#product.splice(del, 1);
            await fs.writeFile("./products.json", []);
            await fs.writeFile("./products.json", JSON.stringify(this.#product, null, "\t"));
            console.log("ID del Producto Eliminado : " + number);
            console.log("Todos los Productos :");
            console.log(this.#product || null);
            console.log("\n");

        } catch (err) {

            console.log("Error :" + err);

        }
        /*let newArr = this.#product.filter(el => el.id !== number);
        try {
            
            await fs.writeFile("./products.json", []);
            await fs.writeFile("./products.json", JSON.stringify(newArr, null, "\t");
            console.log("ID del Producto Eliminado : " + number);
            console.log("Todos los Productos :");
            console.log(newArr);

        } catch (err) {

            console.log("Error :" + err);

        }*/

    }

    async deleteAll() {

        try {
            
            console.log("Eliminando todos los Productos...");
            this.#product.splice(0, this.#product.length);
            await fs.writeFile("./products.json", []);
            console.log(this.#product);


        } catch (err) {

            console.log("Error :" + err);

        }

    }

};

const element1 = new Container(); 

const elements = async () => {

    await element1.save({

        id: 1,
        product: "Auto", 
        price: 10000, 
        thumbnail: "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"
    
    });
    
    await element1.save({
    
        id: 2,
        product: "Celular", 
        price: 250, 
        thumbnail: "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"
    
    });
    
    await element1.save({
    
        id: 3,
        product: "Laptop", 
        price: 500, 
        thumbnail: "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"
    
    });

    await element1.getById(1);

    await element1.getAll();

    await element1.deleteById(2);

    await element1.deleteAll();

};

elements();