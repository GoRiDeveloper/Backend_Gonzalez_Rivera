const { randomUUID } = require("crypto"),
               cosas = [];

const range = (age, min = 0, max = 10000) => {

    return age >= min && age <= max;

};

const controllerGetThings = ({ query }, res) => {

    let result

    if (query.min || query.max) {

        result = cosas.filter(({ age }) => range(age, query.min, query.max));

    } else {

        result = cosas;

    }

    res.json(result);

};

const controllerGetIdThings = ({ params: { id } }, res) => {

    const thing = cosas.find(item => item.id === id);

    if (thing) {
        
        res.json(thing);
 
    } else {
        
        res.status(404);
        res.json({ mensaje: `No se encontró una cosa con el id : ${id}` });

    }

};

const controllerPostThings = (req, res) => {

    const newThing = req.body;
    newThing.id = randomUUID();
    cosas.push(newThing);
    res.status(201);
    res.json(newThing);

};   

const controllerPutIdThings = ({ body, params: { id } }, res) => {

    const thingI = cosas.findIndex(item => item.id === id);

    if (thingI === -1) {
        
        res.status(404);
        res.json({ mensaje: `No se encontró una cosa con el ID : ${id}` });

    } else {
        
        cosas[thingI] = body;
        res.json(body);

    }

};

const controllerPatchIdThings = ({body, params: { id } }, res) => {

    const thingI = cosas.findIndex(item => item.id === id);

    if (thingI === -1) {

        res.status(404);
        res.json({ mensaje: `No se encontró una cosa con el ID : ${id}` });

    } else { 

        cosas[thingI] = { ...cosas[thingI], ...body };
        res.json(cosas[thingI]);

    };

};

const controllerDeleteIdThings = ({ params: { id } }, res) => {

    const thingI = cosas.findIndex(item => item.id === id);

    if (thingI === -1) {

        res.status(404);
        res.json({ mensaje: `No se encontró una cosa con el ID : ${id}` });

    } else {

        const deleteThing = cosas.splice(thingI, 1);
        //res.sendStatus(204);
        res.json(deleteThing[0]);

    };

};

exports.controllerGetThings = controllerGetThings;
exports.controllerGetIdThings = controllerGetIdThings;
exports.controllerPostThings = controllerPostThings;
exports.controllerPutIdThings = controllerPutIdThings;
exports.controllerPatchIdThings = controllerPatchIdThings;
exports.controllerDeleteIdThings = controllerDeleteIdThings;