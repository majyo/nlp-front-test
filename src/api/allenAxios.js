import axios from "axios";

const allen = axios.create({
    baseURL: "//192.168.40.7:8101",
    timeout: 30000
});

const dygie = axios.create({
    baseURL: "//192.168.40.7:8102",
    timeout: 30000
});

allen.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

allen.interceptors.response.use(res => {
    const {code, msg} = res.data;
    if (code === 500) {
        console.log(msg);
    }
    return res;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

dygie.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

dygie.interceptors.response.use(res => {
    const {code, msg} = res.data;
    if (code === 500) {
        console.log(msg);
    }
    return res;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export {
    allen,
    dygie
};
