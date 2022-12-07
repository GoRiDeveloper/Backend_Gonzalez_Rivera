import express, {json, urlencoded} from "express";

const APP = express();

APP.use(json());
APP.use(urlencoded({ extended: true }));

export default (port = 0) => {

    return new Promise((res, rej) => {

        const SERVER_CONECTED = APP.listen(port, () => {

            res(SERVER_CONECTED);

        });
        SERVER_CONECTED.on("ERROR :", err => rej(err));

    });

};