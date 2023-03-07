import admin from "firebase-admin";
import { readFile } from "fs/promises";

const SERVICE_ACCOUNT = JSON.parse(
    await readFile(
        "./src/config/clients/firestore_client/firestore.json", 
        "utf-8"
    )
);

admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT)
});

export const FIRESTORE_DB = admin.firestore();