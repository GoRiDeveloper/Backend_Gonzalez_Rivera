const fs = require("fs");

async function crearArchivo (base) {

    console.log("====================================");
    console.log("         Tabla del :", base);
    console.log("====================================");

    let tabla = "";

    for (let i = 1; i <= 10; i++) {

        tabla += `${base} x ${i} = ${base*i}\n`;    

    };

    console.log(tabla); 

    try {
        fs.writeFileSync(`Tabla_del_${base}.txt`, tabla);
        return `Tabla_del_${base}.txt`;
    } catch (err) {

        throw err;

    };

};

module.exports = { crearArchivo };