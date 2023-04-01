export default class ErrorProps extends Error {

    constructor (props) {
        super(`No se pudo encontrar la información con las propiedades: ${JSON.stringify(props)}.`);
        this.type = "NO_SE_ENCONTRO_POR_PROPIEDADES";
    };

};