// import axios from '../utils/axios'
import axios from 'axios'
// const decode = require("jwt-decode");
import auth from '../utils/auth'

const base = {
    baseUrl: "http://127.0.0.1:3001/api",
    register_token: "/register",
    register: "/register",
    login: "/login",
    onboarding: "/onboarding",
    employee: "/employee",
    allOnboardingReview: "/hire/onboarding",
    oneOnboardReview: "/hire/onboarding/", //:eid
    empHousingDetail: "/housing/get-detail",
    empHousingReports: "/housing/get-reports"
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
    getOneOnboarding(){
        return axios.get(base.baseUrl + base.oneOnboardReview)
    },
    getEmpHousingDetail(){
        return axios.get(base.baseUrl + base.empHousingDetail, {headers: { "userID": auth.getUser().id}})
    },
    getEmpHousingReports(){
        return axios.get(base.baseUrl + base.empHousingReports, {headers: { "userID": auth.getUser().id}})
    },
}
export default api
