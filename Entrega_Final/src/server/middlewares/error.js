const errorTypes = {

    idNotFound: "ID_NOT_FOUND",
    passRequired: "PASSWORDS_REQUIRED",
    passNeeded: "PASSWORD_NEEDED",
    notInfo: "COULD_NOT_GET_INFO",
    notSaved: "NOT_SAVED",
    notRead: "COULD_NOT_READ",
    notAnObject: "NOT_AN_OBJECT",
    notAnArray: "NOT_AN_ARRAY",
    noData: "THERE_IS_NO_DATA",
    notAdmin: "YOU_ARE_NOT_ADMIN",
    notFoundByProps: "NOT_FOUND_BY_PROPERTIES",
    failUpdate: "NOT_UPDATED",
    failDelete: "NOT_DELETE",
    failSend: "FAIL_SEND",
    userExists: "USER_ALREADY_EXISTS",
    productExists: "PRODUCT_ALREADY_EXISTS",
    wrongPass: "WRONG_PASS",
    userPassNeeded: "USER_AND_PASS_NEEDED",
    needAuth: "NEED_AUTH",
    emptyField: "EMPTY_FIELD",
    alphabetic: "MUST_BE_ALPHABETIC",
    invalidUrl: "URL_INVALID",
    invalidEmail: "EMAIL_INVALID",
    intInvalid: "INT_INVALID",
    invalidNumber: "INVALID_NUMBER",
    dbError: "ERROR_CONNECTING_DATABASE",
    invalidIndex: "INVALID_INDEX"

};

export function errorHandler (error, req, res, next) {

    switch (error.type) {

        case errorTypes.notSaved:
            res.status(502)
        break;

        case 
            errorTypes.dbError ||
            errorTypes.notRead ||
            errorTypes.notInfo ||
            errorTypes.failSend:

                res.status(500)

        break;

        case
            errorTypes.notFoundByProps ||
            errorTypes.idNotFound:

                res.status(404)

        break;

        case errorTypes.notAdmin:
            res.status(403)
        break;

        case errorTypes.needAuth:
            res.status(401)
        break;

        case
            errorTypes.userPassNeeded ||
            errorTypes.productExists ||
            errorTypes.invalidNumber ||
            errorTypes.passRequired ||
            errorTypes.invalidEmail ||            
            errorTypes.invalidIndex ||
            errorTypes.notAnObject ||
            errorTypes.notAnArray ||
            errorTypes.passNeeded ||
            errorTypes.failUpdate ||
            errorTypes.failDelete ||
            errorTypes.userExists ||
            errorTypes.emptyField ||
            errorTypes.invalidUrl ||
            errorTypes.wrongPass ||
            errorTypes.intInvalid:

                res.status(400)

        break;

        case errorTypes.noData:
            res.status(200)
        break;

        default:
            res.status(500)
        break;

    };

    res.json({ Error: error.message });

};