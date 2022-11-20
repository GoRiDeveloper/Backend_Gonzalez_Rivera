const { Server: HttpServer } = require("http"),
{ Server: IOServer }         = require("socket.io"),
{ handleSocket }             = require("./controllers/web_controllers.js"),
{ webRouter }                = require("./routers/web_router.js"),
{ engine }                   = require("express-handlebars"),
express                      = require("express"),
app                          = express(),
httpServer                   = new HttpServer(app),
io                           = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", webRouter);

app.engine("handlebars", engine({ 

    extname: "handlebars",
    defaultLayout: "layout.handlebars",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",

}));

app.set("views", "./src/views");
app.set("view engine", "handlebars");

io.on("connection", (socket) => {

    handleSocket(socket, io.sockets);

});

const serverConect = (port = 0) => {

    return new Promise((res, rej) => {

        const serverConected = httpServer.listen(port, () => {

            res(serverConected);

        });
        serverConected.on("Error : ", err => rej(err));

    });

};

module.exports = { 
    
    serverConect

};