import { USER_SERVICE } from "../service/user/index.js";

export function controllerGetUser ({ headers }, res) {

    const DATA = USER_SERVICE.getDataUser(headers);

    DATA
        ? res.status(200).json(DATA)
        : res.status(500).json({ Error: "Algo salio mal."});

};

export function controllerPostUser (req, res) {

    //obtener el token => 

    res.header("authorization", TOKEN);

    req.get("authorization")
        ? res.status(201).json({ Message: "You logged in" })
        : res.status(500).json({ Error: "Algo salio mal" });

};