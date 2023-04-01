import {writeFileSync, readFileSync, existsSync} from "fs";

const archive = "./src/persistence/data.json";

function saveData (data) {
    writeFileSync(archive, JSON.stringify(data, null, "\t"));
};

function readData () {
    if (!existsSync(archive)) return;
    const info = readFileSync(archive, "utf-8");
    return JSON.parse(info);
};

export {
    saveData,
    readData
};