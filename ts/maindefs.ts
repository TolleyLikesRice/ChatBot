// Imports
import { readFileSync } from "fs";
import * as GphApiClient from "giphy-js-sdk-core";
import { post } from "request";
import { parse } from "toml";

// Define Vars
const config = parse(readFileSync("./config/config.toml", "utf-8"));
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
    const text = readFileSync(path, "utf-8");
    const textByLine = text.split("\n");
    return textByLine;
}
export function checkLink(link: string) {
    post({
        url: "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDWTb1kHSOaCXC9giBQ4zSAMoXVGeVubTM",
        json: {
          client: {
            clientId: "chatbot",
            clientVersion: "2.0.0",
          },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [
              { url: link },
            ],
          },
        },
      }, (err, res, body) => {
        if (err) { throw console.log(err); }
        if (body !== {}) {
          return body.threatType;
        } else if (body === {}) {
          return null;
        } else {
          return new Error("Sorry, there was an error in reciving your request");
        }
      });
}
