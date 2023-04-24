export function pathNotFound (req, res) {

    res.status(404).json({ Error: "Ruta no implementada." });

};