import autocannon from "autocannon";
import { PassThrough } from "stream";

function run (url) {

    const

    BUF            = [],
    OUT_PUT_STREAM = new PassThrough(), 
    INST           = autocannon({ 

        url, 
        connections: 100,
        duration: 20

    });

    autocannon.track(INST, { OUT_PUT_STREAM });

    OUT_PUT_STREAM.on("data", data => BUF.push(data));
    INST.on("done", function() {

        process.stdout.write(Buffer.concat(BUF));

    });

};

console.log("Cargando");

run("/info");