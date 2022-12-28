import admin from "firebase-admin";
import fs from "fs";

const FS = fs.promises;

const SERVICE_ACCOUNT = JSON.parse(

    await FS.readFile(

        "./src/persistence/config/shop-ggr-backend-firebase-adminsdk-l30m3-6531527db2.json", 
        "utf-8"

    ));

admin.initializeApp({

    credential: admin.credential.cert(SERVICE_ACCOUNT)

});

export const FIRESTOREDB = admin.firestore();