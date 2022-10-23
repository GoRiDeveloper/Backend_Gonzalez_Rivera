const http = require("http");

const server = http.createServer((petition, response) => {

    response.end("Todo OK.");

});

const conect = (port = 0) => {

    return new Promise((resolve, reject) => {

        const serverConected = server.listen(port, err => {

            err
                ? reject(err)
                : resolve(serverConected);

        });

    });

};

module.exports = { conect };