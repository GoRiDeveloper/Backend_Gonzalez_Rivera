import admin from "firebase-admin";
import { promises } from "fs";

const 

FS              = promises,

SERVICE_ACCOUNT = JSON.parse(

    await FS.readFile(

        "./src/persistence/config/clients/firestore_client/firestore.json",
        "utf-8"

    )

);

admin.initializeApp({

    credential: admin.credential.cert(SERVICE_ACCOUNT)

});

export const FIRESTORE_DB = admin.firestore();