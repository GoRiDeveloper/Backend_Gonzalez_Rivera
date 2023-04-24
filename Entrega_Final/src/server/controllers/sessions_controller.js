export function controllerPostAuth (req, res) {

    //obtener token
    Token
        ? res.status(200).json({ message: "You logged in." })
        : res.status(400).json({ error: "Algo salio mal." });
    
};