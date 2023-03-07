export default class ErrorProps extends Error {

    constructor (props) {
        super(`No se pudo encontrar la informacion con las propiedades: ${JSON.stringify(props)}.`);
        this.type = "NO_SE_ENCONTRO_POR_PROPIEDADES";
    };

};