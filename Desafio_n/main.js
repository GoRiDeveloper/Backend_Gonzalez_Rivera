function sumValues(numbers) {
    debugger
    let resultado = 0;

    for (let  i = 0; i < numbers.length; i++ ){
        resultado = (numbers[i] + resultado)
    };

    resultado = resultado + numbers.length;

    return resultado;
};

sumValues([1, 2, 3]);