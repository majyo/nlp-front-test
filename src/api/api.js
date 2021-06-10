import instance from "./axios";

export function nerSubmit(data) {
    return instance.post("/api/allennlp/ner", data);
}

export function searchArticle(data) {
    return instance.post("/api/pdfSearch", data);
}

export function labelPdf(data) {
    return instance.post("/api/pdfLabeling", data);
}

export function searchProteinArticle(data) {
    return instance.post("/api/proteinSearch", data);
}

export function textClassification(data) {
    return instance.post("/api/textClassification", data);
}

// export function axiosTest() {
//     return instance.get("/v1/bpi/currentprice.json");
// }
