import fetch, { RequestInit } from "node-fetch";
import { debugRequests } from "./vars";

export function makeRequest(url: string, args: RequestInit) {
    return fetch(url, args)
        .then(r => {
            if (debugRequests) {
                console.log(`[Request] Url: ${args.method} ${url} Status: ${r.status}`);
            }
            return r;
        })
        .then(r => r.json())
        .then(r => {
            if (debugRequests) {
                console.log(`[Request] Response : ${JSON.stringify(r)}`);
            }
            return r;
        })
}