const errorValues = {

    idNotFound: "ID_NO_ENCONTRADO",
    passParams: "SE_NECESITAN_CONTRASEÑAS",
    passNeeded: "SE_NECESITA_UNA_CONTRASEÑA",
    notInfo: "NO_SE_PUDO_OBTENER_LA_INFORMACIÓN",
    notSave: "NO_SE_GUARDO",
    notRead: "NO_SE_PUDO_LEER_EL_ARCHIVO",
    notData: "NO_HAY_DATOS",
    propsNotFound: "NO_SE_ENCONTRO_POR_PROPIEDADES",
    failUpdate: "NO_SE_ACTUALIZO",
    failDelete: "NO_SE_ELIMINO",
    needPort: "SE_NECESITA_UN_PUERTO",
    server: "ERROR_SERVER",
    userExists: "EL_USUARIO_YA_EXISTE",
    pass: "CONTRASEÑA_INCORRECTA",
    userAndPass: "SE_NECESITA_USUARIO_Y_CONTRASEÑA",
    mail: "NO_SE_ENVIO",
    auth: "NECESITAS_AUTENTICARTE",
    field: "CAMPO_VACÍO",
    alphabetic: "DEBE_SER_ALFABÉTICO",
    url: "URL_INVALIDA",
    email: "EMAIL_INVALIDO"

};

export default function errorHandler (error, req, res, next) {

    switch (error.type) {

        case errorValues.notSave:
            res.status(502)
        break;

        case 
            errorValues.needPort || 
            errorValues.notRead || 
            errorValues.notInfo || 
            errorValues.server || 
            errorValues.mail:

                res.status(500)

        break;

        case 
            errorValues.idNotFound || 
            errorValues.propsNotFound:    

                res.status(404)

        break;

        case errorValues.auth:
            res.status(401)
        break;

        case 
            errorValues.userAndPass || 
            errorValues.passParams || 
            errorValues.passNeeded || 
            errorValues.failUpdate || 
            errorValues.failDelete || 
            errorValues.userExists || 
            errorValues.field ||             
            errorValues.pass || 
            errorValues.url || 
            errorValues.email: 

                res.status(400)
                
        break;

        case errorValues.notData:
            res.status(200)
        break;

        default:
            res.status(500)
        break;

    };

    res.json({ Mensaje: error.message });

};