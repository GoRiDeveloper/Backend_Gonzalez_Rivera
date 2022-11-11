const getRoot = (req, res) => {

    res.send("Todo Bien");

};

const getWelcome = (req, res) => {

    res.json({ mensaje: "Hola" });

};

const getBye = (req, res) => {

    res.send("Chau");

};

exports.getRoot = getRoot;
exports.getWelcome = getWelcome;
exports.getBye = getBye;