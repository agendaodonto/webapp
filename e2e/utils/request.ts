import fetch, { RequestInit } from "node-fetch";

export function makeRequest(url: string, args: RequestInit) {
    return fetch(url, args)
        .then(r => {
            console.log(`[Request] Url: ${args.method} ${url} Status: ${r.status}`);
            return r;
        })
        .then(r => r.json())
        .then(r => {
            console.log(`[Request] Response : ${JSON.stringify(r)}`);
            return r;
        })
}