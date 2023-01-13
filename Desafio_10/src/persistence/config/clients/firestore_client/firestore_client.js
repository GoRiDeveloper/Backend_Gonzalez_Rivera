import admin from "firebase-admin";
import fs from "fs";

const FS = fs.promises;

const SERVICE_ACCOUNT = JSON.parse(

    await FS.readFile(

        "./src/persistence/config/clients/firestore_client/firestore.json",
        "utf-8"

    )

);

admin.initializeApp({

    credential: admin.credential.cert(SERVICE_ACCOUNT)

});

const FIRESTORE_DB = admin.firestore();

export { FIRESTORE_DB };