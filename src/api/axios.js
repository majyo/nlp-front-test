import axios from "axios";

const instance = axios.create({
    baseURL: "//183.2.147.17:10083",
    timeout: 12000
});

instance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(res => {
    const {code, msg} = res.data;
    if (code === 500) {
        console.log(msg);
    }
    return res;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;
