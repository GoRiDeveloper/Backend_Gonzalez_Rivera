const express = require("express"),
{ routerApi } = require("./elements/routers/router_api.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static("public"));

app.use("/api/products", routerApi);

const serverConect = (port = 0) => {

    return new Promise ((res, rej) => {

        const serverConected = app.listen(port, () => {

            res(serverConected);

        });
        serverConected.on("¡¡Error :",  err => rej(err));

    });

};

module.exports = { serverConect };