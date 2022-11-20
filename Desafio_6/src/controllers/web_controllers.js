const { Methods } = require("./classes.js"),
   { randomUUID } = require("crypto");

const methods = new Methods("./src/files/products.txt", "./src/files/messages.txt");

const range = (price, min, max) => {

    return price >= min && price <= max;

};

const controllerGetProducts = async ({ query }, res) => {

    let result;
    const products = await methods.getAll();
    
    if (query.min || query.max) {
        
        result = products.filter(({ price }) => range(price, query.min, query.max));

    } else {
        
        result = products;

    };

    res.render("body", result);

};

const controllerPostProducts = async ({ body }, res) => {

    if (!body.product || !body.price || !body.thumbnail) {
        
        res.status(404);
        res.send("No se puede guardar un objeto vacío.");

    } else {
      
        const newBody = {

            id: randomUUID(),
            ...body,
            price: parseFloat(body.price)

        };

        await methods.postProd(newBody);

        res.redirect("/");
        
    };

};

const handleSocket = async (socket, sockets) => {

    const msg = await methods.getTxt();
    socket.emit("updateMessages", msg);

    socket.on("newMessage", async (message) => {

        message.date = new Date().toLocaleString();
        const postTxt = await methods.postTxt(message);

        sockets.emit("updateMessages", postTxt);

    });

    const prods = await methods.getAll();

    socket.emit("updateProds", prods);

    socket.on("newProd", async () => {

        const prods = await methods.getAll();
        sockets.emit("updateProds", prods);

    });

};

const handleSocketProducts = async (socket, sockets) => {

    socket.emit("updateProds", await methods.getAll());

    socket.on("newProd", async (prod) => {
        
        sockets.emit("updateProds", await methods.getAll());

    });

};

module.exports = { 

    controllerGetProducts,
    controllerPostProducts,
    handleSocket,
    handleSocketProducts

};