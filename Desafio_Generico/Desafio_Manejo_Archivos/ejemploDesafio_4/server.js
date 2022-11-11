const  express = require("express"),
           app = express(),
 { routerWeb } = require("./routers/router_web.js"),
 { routerApi } = require("./routers/router_api.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("files"));
app.use("/views", express.static("views"));

app.use("/", routerWeb);
app.use("/api/cosas", routerApi);

const server = app.listen(8080, () => {

    console.log(`Conectado en el Puerto : ${server.address().port}`);

}); 