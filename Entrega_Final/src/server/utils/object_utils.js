import ErrObject from "../models/errors/error_object.js";
import ErrIndex from "../models/errors/error_index.js";

export function getKey (item, index) {

    if (!item) throw new ErrObject();
    if (typeof item !== "object") throw new ErrObject();
    if (!index) throw new ErrIndex();
    if (typeof index !== "number") throw new ErrIndex();
    
    return Object.keys(item)[index];

};

export function getValue (item, index) { 

    if (!item) throw new ErrObject();    
    if (typeof item !== "object") throw new ErrObject();
    if (!index) throw new ErrIndex();
    if (typeof index !== "number") throw new ErrIndex();

    return Object.values(item)[index]

};