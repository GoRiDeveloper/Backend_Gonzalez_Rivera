import { admin } from "../routers/router_api.js";

export default function adminAuthorized ({ route: { path, methods } }, res, next) {
    
    if (admin) {

        next();
    
    } else {

        res.status(403)
        .send(`¡¡ERROR : No estas autorizado en la ruta "${path}", Método : "${JSON.stringify(methods)}"`);
    
    };

};