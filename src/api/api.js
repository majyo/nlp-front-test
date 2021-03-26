import instance from "./axios";

export function nerSubmit(data) {
    return instance.post("/api/allennlp/ner", data);
}

export function axiosTest() {
    return instance.get("/v1/bpi/currentprice.json");
}