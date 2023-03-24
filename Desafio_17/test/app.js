import axios from "axios";
import SERVER from "../src/server/containers/server/index.js";
import { randomUUID as generateID } from "crypto";
import { CONFIG } from "../src/config/config.js";

axios.defaults.baseURL = `http://localhost:${CONFIG.port}`;

describe("Pruebas de integración", () => {

    before(async () => await SERVER.connect(CONFIG.port));

    after(async () => await SERVER.disconnect());

    describe("Servidor", () => {

        it("Creación de un usuario ('registro')", async () => {

            let data = {

                id: generateID(),
                name: "Prueba",
                lastName: "Integración",
                user: "prueba1",
                email: "prueba1@email.com",
                pass: "pruebauno",
                age: 20,
                avatar: "https://www.google.com/img.png"

            };
            const {data: result, status} = await axios.post("/register", data);

            if (status !== 200)
                throw new Error("Fallo el Registro");
            if (result.Message !== "k")
                throw new Error("Haz iniciado sesión.");

        });

    });

});