import { fork } from "child_process";

function controllerRandoms ({ query }, res) {

    let { cant } = query;
    const CHILD_PROCESS = fork("./src/utils/randoms.js");

    cant 
    
        ? CHILD_PROCESS.send({ order: "start", cant }) 
        : CHILD_PROCESS.send({ order: "start", cant: 100_000_000});

};

export { controllerRandoms };