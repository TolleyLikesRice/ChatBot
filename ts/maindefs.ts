/* eslint-disable */
// Imports
import * as fs from "fs";
import * as GphApiClient from "giphy-js-sdk-core";
import * as toml from "toml";
// import * as serviceAccount from "../firebasekey.json";

// Define Vars
const config = toml.parse(fs.readFileSync("./config/config.toml", "utf-8"));
const giphy = GphApiClient(config.Giphy.apikey);

// Init

/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});*/

// const db = admin.firestore();

// Exports

export { giphy };
export { config };
export function textToArray(path: string) {
    if (typeof path !== "string") {
        throw new TypeError("Path supplyed is not a string");
    }
    const text = fs.readFileSync(path, "utf-8");
    const textByLine = text.split("\n");
    return textByLine;
}
