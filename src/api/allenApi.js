import {allen, dygie} from "./allenAxios"

export function oieRequest(data) {
    return allen.post("/api/oie", data);
}

export function gptRequest(data) {
    return allen.post("/api/gpt", data);
}

export function dygieRequest(data) {
    return dygie.post("/api/dygie", data);
}