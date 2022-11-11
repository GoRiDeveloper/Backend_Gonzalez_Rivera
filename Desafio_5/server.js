const { webRouter } = require("./elements/router/web_router"),
         { engine } = require("express-handlebars"),
                 fs = require("fs").promises,
            express = require("express"),
                app = express();

//app.use(express.json());
app.use(express.urlencoded({ extend: true }));

app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(webRouter);
//app.use("/api/products", routerApi);

const serverConect = (port = 0) => {

    return new Promise((res, rej) => {
       
        const serverConected = app.listen(port, () => {

            res(serverConected);

        });
        serverConected.on("Error : ", err => rej(err));

    });

};

module.exports = { serverConect };