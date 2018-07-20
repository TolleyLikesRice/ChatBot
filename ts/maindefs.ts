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
export function checkLink(linktotest: string, done, service) {
  const link = service || "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDWTb1kHSOaCXC9giBQ4zSAMoXVGeVubTM";
  post({
    url: link,
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
          { url: linktotest },
        ],
      },
    },
  }, (err, res, body) => {
    if (err) { throw err; }
    if ("error" in body) {
      throw new Error("ERROR: " + body.error.message);
    }
    if ("threatType" in body) {
      done(null, body.threatType);
    } else if (body === {}) {
      done(null, null);
    }
  });
}
