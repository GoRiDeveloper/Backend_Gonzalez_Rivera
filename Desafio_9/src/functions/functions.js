import { MSG } from "../persistence/containers/msg_container.js";
import { normalize, schema } from "normalizr";
import { randomUUID } from "crypto";

async function handleSocket (socket, sockets) {

    const msg = await MSG.getAllMSG();

    socket.emit("updateMessage", msg);

    socket.on("newMessage", async (message) => {

        message.date = new Date().toLocaleString();

        const MESSAGE = msgValidation(message),
        MSG_NORMALIZE = normalizeMSG(MESSAGE),
             POST_TXT = await MSG.sendMSG(MSG_NORMALIZE);

        sockets.emit("updateMessages", POST_TXT);

    });

};

function normalizeMSG (data) {

    const AUTOR_SCHEMA = new schema.Entity("author", {}, { idAttribute: "email" }),
       MESSAGES_SCHEMA = new schema.Entity("messages", {

          author: AUTOR_SCHEMA

       });

    const MESSAGE_NORMALIZED = normalize(data, MESSAGES_SCHEMA);

    return MESSAGE_NORMALIZED;

};

function asObj (ref) {

    const OBJ = {

        id: ref.id,
        ...ref.data()

    };

    return OBJ;

};

function msgValidation (msg) {

    const ALPHABETIC_PARAMS = [

        msg.author.name,
        msg.author.lastname

    ];

    emptyFieldValidation(msg);
    alphabeticValidation(ALPHABETIC_PARAMS);

    const NUMBER = intValidation(msg.author.age);

    const MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(msg.author.email);

    if (!MAIL_REG_EXP)
        throw new Error("ERROR : El E-Mail no es válido.");

    const IMG_REG_EXP = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(msg.author.avatar);

    if (!IMG_REG_EXP)
        throw new Error("ERROR : La URL de la imágen no es válida.");

    msg.author.age = NUMBER;

    const NEW_MSG = {

        id: randomUUID(),
        ...msg

    };

    return NEW_MSG;

};

function emptyFieldValidation ({ author: { email, name, lastname, alias }, message }) {

    if (emptyField(email))
        throw new Error("ERROR : El E-Mail no puede estar vacío.");

    if (emptyField(name))
        throw new Error("ERROR : El Nombre no puede estar vacío.");

    if (emptyField(lastname))
        throw new Error("ERROR : El Apellido no puede estar vacío.");

    if (emptyField(alias))
        throw new Error("ERROR : El Alias no puede estar vacío.");

    if (emptyField(message))
        throw new Error("ERROR : El Mensaje ni puede estar vacío.");

};

function emptyField (item) {

    return item.indexOf(" ") === 0;

};

function alphabeticValidation (params) {

    params.forEach((param) => {

        const NEW_PARAM = param.toLowerCase(),
          PARAM_REG_EXP = /^[a-zñáéíóú\s]+$/g.test(NEW_PARAM);

        if (!PARAM_REG_EXP)
            throw new Error(`ERROR : El campo "${param}" sólo puede contener létras.`);

    });

};

function intValidation (param) {

    itsNumber(param);

    const NEW_INT = parseInt(param);

    if (NEW_INT === NaN)
        throw new Error(`ERROR : El campo "${param}" debe ser un número entero.`);

    return NEW_INT;

};

function itsNumber (item) {

    if (!typeof item === "number") {

        if (emptyField(item))
            throw new Error(`ERROR : El campo "${item}" no puede estar vacío.`);

    };

};

export { 
    
    handleSocket, 
    asObj,
    msgValidation 

};