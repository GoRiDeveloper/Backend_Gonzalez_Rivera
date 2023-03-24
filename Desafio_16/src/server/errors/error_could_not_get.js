export default class ErrorCouldNotGet extends Error {

    constructor () {
        super("No se pudo obtener la información.");
        this.type = "NO_SE_PUDO_OBTENER_LA_INFORMACIÓN";
    };

};