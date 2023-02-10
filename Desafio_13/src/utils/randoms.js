function randoms(amount) {

    let arrayNums = [];

    for (let i = 0; i < amount; i++) {

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

process.on("message", msg => {

    const { order, amount } = msg;

    if (order == "start") {

        const RESPONSE = randoms(amount);

        process.send(RESPONSE);
        process.exit();

    };

});