import { validationError } from "../../server/models/error_model.js";
import { hashPassword } from "../../persistence/config/password.js";
import { MESSAGES as MSG } from "../../server/containers/messages_container.js";

function msgValidation (msg) {

    const

    { author } = msg,
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

    emptyMsgFieldValidation(msg);
    alphabeticValidation(ALPHABETIC_PARAMS);

    const

    NEW_AGE      = intValidation(age),
    MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email),
    IMG_REG_EXP  = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(avatar);

    if (!MAIL_REG_EXP)
        throw validationError(email);

    if (!IMG_REG_EXP)
        throw validationError(avatar);

    msg.author.age = NEW_AGE;

    const MSG = {

        ...msg

    };

    return MSG;

};

function emptyMsgFieldValidation ({ author: { email, name, lastname, alias }, message }) {

    if (emptyField(email))
        throw validationError(email);

    if (emptyField(name))
        throw validationError(name);

    if (emptyField(lastname))
        throw validationError(lastname);

    if (emptyField(alias))
        throw validationError(alias);

    if (emptyField(message))
        throw validationError(message);

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
            throw validationError(param);

    });

};

function intValidation (item) {

    itsNumber(item);

    const NEW_INT = parseInt(item);

    if (NEW_INT === NaN)
        throw validationError(item);

    return NEW_INT;

};

function itsNumber (item) {

    if (!typeof item === "number") {
        
        if (emptyField(item))
            throw validationError(item);

    };

};

async function userValidation (user) {

    const 
    
    { 

        name, 
        lastname,
        email, 
        password 

    } = user,
    ALPHABETIC_PARAMS = [

        name,
        lastname

    ];

    emptyUserFieldValidation(user);
    alphabeticValidation(ALPHABETIC_PARAMS);

    const MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email);

    if (!MAIL_REG_EXP)
        throw validationError(email);

    const NEW_PASS = await hashPassword(password);

    user.password = NEW_PASS;

    const USER = {

        ...user

    };

    return USER;

};

function emptyUserFieldValidation({ name, lastname, username, email, password }) {

    if (emptyField(name))
        throw validationError(name);

    if (emptyField(lastname))
        throw validationError(lastname);

    if (emptyField(username))
        throw validationError(username);

    if (emptyField(email))
        throw validationError(email);

    if (emptyField(password))
        throw validationError(password);

};

async function handleSocket (socket, sockets) {

    const MSGS = await MSG.getMsgs();

    sockets.emit("allMessages", MSGS);

    socket.on("newMessage", async message => {

        const

        POST_MESSAGE = await MSG.postMsg(message),
        NEW_MESSAGES = await MSG.getMsgs();

        sockets.emit("allMessages", NEW_MESSAGES);

    });

};

export { 

    msgValidation, 
    userValidation,
    handleSocket

}; 