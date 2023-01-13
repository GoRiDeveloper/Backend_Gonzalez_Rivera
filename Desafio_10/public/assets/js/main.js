const 

d               = document,
SOCKET          = io(),
BUTTON_PRODS    = d.querySelector(".show-prods"),
TABLE_CONTAINER = d.querySelector(".table"),
FORM            = d.querySelector(".form-input"),
MSG_CONTAINER   = d.querySelector(".messages-chat"),
LOGOUT          = d.querySelector(".logout"),
LOGOUT_BUTTON   = d.querySelector(".nav-button"),
NAME_LOGIN      = d.querySelector("#name-login"),
EMAIL_INPUT     = d.querySelector("#email"),
NAME_INPUT      = d.querySelector("#name"),
LAST_NAME_INPUT = d.querySelector("#lastname"),
AGE_INPUT       = d.querySelector("#age"),
ALIAS_INPUT     = d.querySelector("#alias"),
AVATAR_INPUT    = d.querySelector("#avatar"),
MSG_INPUT       = d.querySelector("#message");

BUTTON_PRODS && BUTTON_PRODS.addEventListener("click", async e => {

    e.preventDefault();

    await fetch("/products", {

        method: "GET",
        headers: {

            "Content-Type": "application/json charset=UTF-8"

        }

    })
    .then(res => res.json())
    .then(data => showTable(data))
    .catch(err => console.log(err));

});

function showTable (prods) {

    const TABLE_TO_DISPLAY = prods.map(({ name, price, img }) => {

        return `
        
            <tr>
            
                <td> ${name} </td>
                <td> ${price} </td>
                <td class="td-img"> 

                    <img class="img-table" src="${img}" alt="prod-img" /> 

                </td>
            
            </tr>      

        `;

    }).join(" ");

    TABLE_CONTAINER.innerHTML = TABLE_TO_DISPLAY;

};

FORM && FORM.addEventListener("submit", async e => {

    e.preventDefault();

    if (

        EMAIL_INPUT.value &&
        NAME_INPUT.value &&
        LAST_NAME_INPUT.value &&
        AGE_INPUT.value &&
        AVATAR_INPUT.value &&
        AVATAR_INPUT.value &&
        MSG_INPUT.value

    ) {

        const NEW_BODY = {

            author: {

                email: EMAIL_INPUT.value,
                name: NAME_INPUT.value,
                lastname: LAST_NAME_INPUT.value,
                age: AGE_INPUT.value,
                alias: ALIAS_INPUT.value,
                avatar: AVATAR_INPUT.value

            },
            message: MSG_INPUT.value

        };

        SOCKET.emit("newMessage", NEW_BODY);

    } else {

        alert("No dejes campos vacíos.");

    };

});

function showMessages (messages) {

    const MSG_TO_DISPLAY = messages.map(msg => {

        return `<li class="chat"> ${msg.date} - ${msg.author.alias} : ${msg.message} </li>`;

    });

    const MSG_HTML = `
    
        <ul>
        
            ${MSG_TO_DISPLAY.join("\n")}
        
        </ul>
    
    `;

    MSG_CONTAINER.innerHTML = MSG_HTML;

};

MSG_CONTAINER && SOCKET.on("allMessages", messages => {

    console.log(messages);
    if (messages) showMessages(messages);

});

LOGOUT_BUTTON && LOGOUT_BUTTON.addEventListener("click", async e => {

    e.preventDefault();

    window.location.assign("/sessions/logout");

});

LOGOUT && load(); 

function load () {

    setTimeout(() => {

        window.location.assign("/");

    }, 3000);

};
