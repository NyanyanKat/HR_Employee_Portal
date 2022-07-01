// import axios from '../utils/axios'
import axios from 'axios'
// const decode = require("jwt-decode");

const base = {
    baseUrl: "http://127.0.0.1:3001/api",
    register_token: "/register",
    register: "/register",
    login: "/login",
    onboarding: "/onboarding",
    employee: "/employee",
    allOnboardingReview: "/hire/onboarding",
    oneOnboardingReview: "/hire/onboarding", //:eid
    changeOboardingStatus:"/hire/onboarding"
}

const api = {
    registerToken() {
        return axios.get(base.baseUrl + base.register_token)
    },
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    onboarding(params) {
        return axios.post(base.baseUrl + base.onboarding, params, {headers: { "Content-Type": "multipart/form-data" }})
    },
    getEmployee(params) {
        return axios.get(base.baseUrl + base.employee, params)
    },
    getAllOnboarding(){
        return axios.get(base.baseUrl + base.allOnboardingReview)
    },
    getOneOnboarding(params){
        return axios.get(base.baseUrl + base.oneOnboardingReview + '/' + params)
    },
    changeOboardingStatus(params){
        return axios.post(base.baseUrl + base.changeOboardingStatus, params)
    }

}
export default api
