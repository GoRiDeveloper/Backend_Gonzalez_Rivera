function randoms(cant) {

    let arrayNums = [];

    for (let i = 0; i < cant; i++) {

        const 
        
        RANDOM_NUM = Math.round(Math.random() * 1000),
        FIND_ARRAY = arrayNums.find(element => element.num == RANDOM_NUM);

        if (FIND_ARRAY != undefined) {

            FIND_ARRAY.i++

        } else {

            arrayNums.push({ num: RANDOM_NUM, i: 1 });

        };

    };

    return arrayNums;

};

process.on("message", message => {

    const { order, cant } = message;

    if (order == "start") {

        const RESPONSE = randoms(cant);

        process.send(RESPONSE);
        process.exit();

    }

});