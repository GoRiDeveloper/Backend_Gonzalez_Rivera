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

        EMAIL_MSG.value &&
        NAME_MSG.value &&
        LASTNAME_MSG.value &&
        AGE_MSG.value &&
        AVATAR_MSG.value &&
        ALIAS_MSG &&
        MSG_MSG

    ) {

        const NEW_BODY = {

            autor: {

                email: EMAIL_MSG.value,
                name: NAME_MSG.value,
                lastname: LASTNAME_MSG.value,
                age: AGE_MSG.value,
                alias: ALIAS_MSG.value,
                avatar: AVATAR_MSG.value

            },
            message: MSG_MSG.value

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

    if (messages) showMessages(messages);

});

LOGOUT_BUTTON && LOGOUT_BUTTON.addEventListener("click", async e => {

    e.preventDefault();

    await fetch("/logout", {

        method: "DELETE",
        headers: {

            "Content-Type": "application/json charset=UTF-8"

        }

    })
    .catch(err => console.log(err));

});

WELCOME && loadLogin();

function loadLogin () {

    setTimeout(() => window.location.assign("/login"), 3150);

};

LOGOUT && loadLogin();

ERROR && loadHome();

function loadHome () {

    setTimeout(() => window.location.assign("/"), 4000);

};