const fs = require("fs").promises;

class Container {

    #product

    constructor() {

        this.#product = [];

    }

    async save(object) {

        // ID Aleatorio :
        //object['id'] = this.#product.length + 1; o Date.now();
        this.#product.push(object);
        await fs.writeFile("./products.json", JSON.stringify(this.#product, null, "\t"));

    }

    async getById(number) {

        const data = await fs.readFile("./products.json", "utf-8");
        const arr = JSON.parse(data);
        const find = arr.find(el => el.id === number);

        return console.log(find);

    }

    async getAll() {

        const data = await fs.readFile("./products.json", "utf-8");
        const arr = JSON.parse(data);
        console.log("\n");
        console.log("Todos los Productos : ");
        console.log(arr || null);
        console.log("\n");

    }

    async deleteById(number) {

        // Metodo 1 :
        let del = this.#product.map(el => el.id).indexOf(number);
        this.#product.splice(del, 1);

        await fs.writeFile("./products.json", []);
        await fs.writeFile("./products.json", JSON.stringify(this.#product, null, "\t"));

        console.log("ID del Producto Eliminado : " + number);
        console.log("Todos los Productos :");
        console.log(this.#product || null);
        console.log("\n");

        /* Metodo 2 :
        let newArr = this.#product.filter(el => el.id !== number);

        await fs.writeFile("./products.json", []);
        await fs.writeFile("./products.json", JSON.stringify(newArr, null, "\t");
        console.log("ID del Producto Eliminado : " + number);
        console.log("Todos los Productos :");
        console.log(newArr);*/

    }

    async deleteAll() {

        console.log("Eliminando todos los Productos...");
        this.#product.splice(0, this.#product.length);
        await fs.writeFile("./products.json", []);
        console.log(this.#product);

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