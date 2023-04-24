import multer from "multer";
import { getDate } from "../utils/get_date.js";

const 

storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "../../public/img")
    },
    filename: function (req, file, cb) {
        const FIELD_NAME = `${getDate()}-img-${file.fieldname}`;
        cb(null, FIELD_NAME)
    }

});

export const uploadFile = multer({ storage }).single("myFile");