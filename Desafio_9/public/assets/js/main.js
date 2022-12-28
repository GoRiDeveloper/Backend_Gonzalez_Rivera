let msgs = [];
const 
d               = document,
SOCKET          = io(),
SCHEMA          = normalizr.schema,
NORMALIZE       = normalizr.normalize,
DENORMALIZE     = normalizr.denormalize,
BUTTON_PRODS    = d.querySelector(".show-prods"),
TABLE_CONTAINER = d.querySelector(".table"),
MSG_CONTAINER   = d.querySelector(".messages-chat"),
FORM_MSG        = d.querySelector(".form-input"),
EMAIL_INPUT     = d.querySelector("#email"),
NAME_INPUT      = d.querySelector("#name"),
LAST_NAME_INPUT = d.querySelector("#lastname"),
AGE_INPUT       = d.querySelector("#age"),
ALIAS_INPUT     = d.querySelector("#alias"),
AVATAR_INPUT    = d.querySelector("#avatar"),
MSG_INPUT       = d.querySelector("#message");

function showTable (prods) {

    const TABLE_TO_DISPLAY = prods.map(({ name, price, img }) => {

        return `
        
            <tr>
            
                <td> ${name} </td>
                <td> ${price} $ </td>
                <td class="td-img"> <img class="img-table" src="${img}" alt="prod-img"/> </td>
            
            </tr>
        
        `;

    }).join(" ");

    TABLE_CONTAINER.innerHTML = TABLE_TO_DISPLAY;

};

BUTTON_PRODS.addEventListener("click", async (e) => {

    e.preventDefault();

    await fetch("/api/products-test", {

        method: "GET",
        headers: { 

            "Content-Type": "application/json charset=UTF-8" 
        
        }

    })
    .then(res => res.json())
    .then(data => showTable(data))
    .catch((err) => console.log(err));

});

function showMessages (messages) {
debugger
    const MESSAGE_TO_DISPLAY = messages.map(msg => {

        return `<li class="chat"> ${msg.date} - ${msg.author.alias} : ${msg.message} </li>`;

    });

    const MESSAGE_HTML = `
    
        <ul class="list-chat">
        
            ${MESSAGE_TO_DISPLAY.join("\n")}
        
        </ul>
    
    `;

    MSG_CONTAINER.innerHTML = MESSAGE_HTML;

};

SOCKET.on("updateMessages", messages => {
debugger

    const AUTHOR_SCHEMA = new SCHEMA.Entity("author", {}, { idAttribute: "email" }),
       MESSAGES_SCHEMA = new SCHEMA.Entity("messages", {

        author: AUTHOR_SCHEMA

    });

    //const MESSAGE_NORMALIZED = NORMALIZE(messages, MESSAGES_SCHEMA);

    const MESSAGE = DENORMALIZE(messages.result, MESSAGES_SCHEMA, messages.entities);

    msgs.push(MESSAGE);
    showMessages(msgs);

});

FORM_MSG.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (

        EMAIL_INPUT.value && 
        NAME_INPUT.value && 
        LAST_NAME_INPUT.value &&
        AGE_INPUT.value &&
        ALIAS_INPUT.value &&
        AVATAR_INPUT.value &&
        MSG_INPUT.value

    ) {

        const NEW_BODY = {

            author: {

                email : EMAIL_INPUT.value,
                name : NAME_INPUT.value,
                lastname : LAST_NAME_INPUT.value,
                age : AGE_INPUT.value,
                alias : ALIAS_INPUT.value,
                avatar : AVATAR_INPUT.value,

            },
            message : MSG_INPUT.value

        };

        SOCKET.emit("newMessage", NEW_BODY);

    } else {

        alert("No dejes campos vacios.");

    };

});