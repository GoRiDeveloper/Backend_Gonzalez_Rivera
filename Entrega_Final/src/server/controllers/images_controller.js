export function controllerImages (req, res) {
debugger
    const re = req;

    req.file
        ? res.status(400)
        : res.status(201);

};