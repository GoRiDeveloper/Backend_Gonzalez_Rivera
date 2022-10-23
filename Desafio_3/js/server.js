const express = require("express"),
    newServer = express(),
           fs = require("fs").promises;

class Container {

    #file

    constructor(file) {

        this.#file = file;

    };

    async getAll() {

        const data = await fs.readFile(this.#file, "utf-8"),
               arr = JSON.parse(data);

        return arr;

    };

    async getRandom() {

        const data = await fs.readFile(this.#file, "utf-8"),
            ranNum = Math.floor(Math.random() * 3) + 1,
               arr = JSON.parse(data),
           product = arr.find(el => el.id === ranNum);

        return product;

    };

};

const element1 = new Container("./products.txt"); 

newServer.get("/products", (request, resolve) => {

    element1.getAll()
        .then((res) => resolve.send(res));

});

newServer.get("/product", (request, resolve) => {

    element1.getRandom()
        .then((res) => resolve.send(res));

});

const conect = (port = 0) => {

    return new Promise((resolve, reject) => {

        const serverConected = newServer.listen(port, () => {

            resolve(serverConected);

        });
        serverConected.on("Error : ", err => reject(err));

    });

};

module.exports = { conect };