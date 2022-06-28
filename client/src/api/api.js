// import axios from '../utils/axios'
import axios from 'axios'
// const decode = require("jwt-decode");

const base = {
    baseUrl: "http://127.0.0.1:3001/api",
    register_token: "/register",
    register: "/register",
    login: "/login"
}


const api = {
    registerToken() {
        return axios.get(base.baseUrl + base.register_token)
    },
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    login(params){
        return axios.post(base.baseUrl + base.login, params)
    }    
}

export default api