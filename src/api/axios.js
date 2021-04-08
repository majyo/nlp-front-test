import axios from "axios";

const instance = axios.create({
    baseURL: "//192.168.40.7:8001",
    timeout: 60000
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
