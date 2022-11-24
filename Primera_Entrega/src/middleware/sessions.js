import { admin } from "../routers/api_router.js";

export default function adminAuthorized ({ route : { path, methods } }, res, next) {

    if (admin) {

        next();
        
    } else {

        res.status(403)
        .send(`

            ERROR : -1, 
            Description : No estas autorizado en la ruta "${path}" Método : "${JSON.stringify(methods)}".
            
        `);
        
    };

};