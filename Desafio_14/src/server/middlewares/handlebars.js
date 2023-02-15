import { engine } from "express-handlebars";

export const HBS = engine({

    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials"

});