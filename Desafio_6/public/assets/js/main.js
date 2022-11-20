const d       = document,
listMeessages = d.querySelector(".messages-chat"),
buttonSend    = d.querySelector(".button-chat"),
inputAutor    = d.querySelector(".input-autor"),
inputMessage  = d.querySelector(".input-mensaje"),
formProds     = d.querySelector(".form-input"),
inputProd     = d.querySelector("#name-prod"),
inputPrice    = d.querySelector("#price-prod"),
inputIMG      = d.querySelector("#img-prod"),
table         = d.querySelector(".table"),
SOCKET        = io();

function showTable(prods) {

    const tableToDisplay = prods.map(({ product, price, thumbnail }) => {

        return `
            
            <tr>
    
                <td> ${product} </td>
                <td> $ ${price} </td>
                <td class="td-img"><img src="${thumbnail}" /></td>
    
            </tr>
            
        `;
    }).join(" ");
    
    table.innerHTML = tableToDisplay;
        
};

SOCKET.on("updateProds", prods => {

    showTable(prods);

});

formProds.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (inputProd.value && inputPrice.value && inputIMG.value) {
      
        const newBody = {

            product : inputProd.value,
            price : inputPrice.value,
            thumbnail : inputIMG.value
    
        };
    
        await fetch("/", {
    
            method: "POST",
            body: JSON.stringify(newBody),
            headers: { "Content-type": "application/json; charset=UTF-8" }
    
        });

        SOCKET.emit("newProd");
        
    } else {
      
        alert("No dejes vacios los campos");
        
    };

});

function showMessages(messages) {

    const messageToDisplay = messages.map(({ date, autor, text }) => {

        return `<li class="chat">${date} - ${autor}: ${text}</li>`;

    });

    const menssageHTML = `
    
    <ul class="list-chat">
    
        ${messageToDisplay.join("\n")}
    
    </ul>
    
    `;

    listMeessages.innerHTML = menssageHTML;

};

SOCKET.on("updateMessages", messages => {

    showMessages(messages);

});

buttonSend.addEventListener("click", e => {

    e.preventDefault();
    
    if (inputAutor.value && inputMessage.value) {

        const message = {

            autor : inputAutor.value,
            text : inputMessage.value

        };

        SOCKET.emit("newMessage", message);

    } else {
   
        alert("Ingresa un Mensaje.");
        
    };

});