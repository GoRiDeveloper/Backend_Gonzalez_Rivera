import { engine } from "express-handlebars";

export const HBS = engine({

    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: "./src/views/layouts",
    partialsDir: "./src/views/partials"

});