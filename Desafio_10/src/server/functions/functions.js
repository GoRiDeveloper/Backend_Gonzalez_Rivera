import { MESSAGES as MSG } from "../containers/server_containers/messages_container.js";

async function handleSocket (socket, sockets) {

    const MESSAGES = await MSG.getMsgs();

    sockets.emit("allMessages", MESSAGES);

    socket.on("newMessage", async message => {

        const 
        
        POST_MESSAGE = await MSG.postMsg(message),
        NEW_MESSAGES = await MSG.getMsgs();

        sockets.emit("allMessages", NEW_MESSAGES);

    });

};

function msgValidation (msg) {

    const 
    
    { author} = msg,
    { 

        name, 
        lastname, 
        email, 
        age, 
        avatar 

    } = author;

    const ALPHABETIC_PARAMS = [

        name,
        lastname

    ];

    emptyFieldValidation(msg);
    alphabeticValidation(ALPHABETIC_PARAMS);

    const 
    
    NEW_AGE      = intValidation(age),
    MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email),
    IMG_REG_EXP  = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(avatar);

    if (!MAIL_REG_EXP)
        throw new Error("ERROR: El E-Mail no es válido.");

    if (!IMG_REG_EXP)
        throw new Error("ERROR : La URL de la imágen no es válida.");

    msg.author.age = NEW_AGE;

    const MSG = {

        ...msg

    };

    return MSG;

};

function emptyFieldValidation ({ author: { email, name, lastname, alias }, message }) {

    if (emptyField(email))
        throw new Error("ERROR : El E-Mail no puede estar vacío.");

    if (emptyField(name))
        throw new Error("ERROR : El Nombre no puede estar vacío.");

    if (emptyField(lastname))
        throw new Error("ERROR : El campo Apellido/s no puede estar vacío.");

    if (emptyField(alias))
        throw new Error("ERROR : El Alias no puede estar vacío");

    if (emptyField(message))
        throw new Error("ERROR : El Mensaje no puede estar vacío.");

};

function emptyField (item) {

    return item.indexOf(" ") === 0;

};

function alphabeticValidation (params) {

    params.forEach(param => {

        const

        NEW_PARAM     = param.toLowerCase(),
        PARAM_REG_EXP = /^[a-zñáéíóú\s]+$/g.test(NEW_PARAM);

        if (!PARAM_REG_EXP)
            throw new Error(`ERROR : El campo "${param}" sólo puede contener létras.`);

    });

};

function intValidation (item) {

    itsNumber(item);

    const NEW_INT = parseInt(item);

    if (NEW_INT === NaN)
        throw new Error(`ERROR : El campo "${item}" debe ser un número entero.`);

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
    msgValidation

};