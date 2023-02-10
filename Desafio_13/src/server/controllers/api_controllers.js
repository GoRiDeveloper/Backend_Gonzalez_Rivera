import { fork } from "child_process";

function controllerRandoms ({ query }, res) {

    let { amount } = query;

    const CHILD_PROCESS = fork("./src/utils/randoms.js");

    if (!amount || amount.indexOf(" ") === 0) {

        CHILD_PROCESS.send({ order: "start", amount: 100_000_000});
        CHILD_PROCESS.on("message", msg => res.json({ mensaje: msg }));

    } else {

        const NEW_AMOUNT = parseInt(amount);

        if (NEW_AMOUNT == NaN) return res.status(500).send("No se ingreso un número correctamente.");

        CHILD_PROCESS.send({ order: "start", amount: NEW_AMOUNT }); 
        CHILD_PROCESS.on("message", msg => res.json({ mensaje: msg }));

    };

};

export { controllerRandoms };