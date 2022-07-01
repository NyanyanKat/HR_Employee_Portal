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
    employeeInfo: "/employee/info/:id",
    onboard: "/hire/onboarding",
    housing: "/housing",
    allOnboardingReview: "/hire/onboarding",
    oneOnboardReview: "/hire/onboarding/", //:eid
    empHousingDetail: "/housing/get-detail",
    empHousingReports: "/housing/get-reports",
    empAddHousingReport: "/housing/add-report",
    empAddHousingComment: "/housing/add-comment",
    empUpdHousingComment: "/housing/update-comment",
    empHousingComments: "/housing/get-comments",
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
//     onboarding(params) {
//         return axios.post(base.baseUrl + base.onboard, params)
//     },
    getEmployee() {
        return axios.get(base.baseUrl + base.employee)
    },
    getEmployeeInfo(){
        return axios.get(base.baseUrl + base.employeeInfo)
    },
    getHousing(){
        return axios.get(base.baseUrl + base.housing)
    },
    onboarding(params) {
        return axios.post(base.baseUrl + base.onboarding, params, {headers: { "Content-Type": "multipart/form-data" }})
    },
    getAllOnboarding(){
        return axios.get(base.baseUrl + base.allOnboardingReview)
    },
    getOneOnboarding(){
        return axios.get(base.baseUrl + base.oneOnboardReview)
    },
    getEmpHousingDetail(){
        return axios.get(base.baseUrl + base.empHousingDetail, {params: { "userID": auth.getUser().id}})
    },
    getEmpHousingReports(){
        return axios.get(base.baseUrl + base.empHousingReports, {params: { "userID": auth.getUser().id}})
    },
    addEmpHousingReport(params){
        return axios.post(base.baseUrl + base.empAddHousingReport, params, {params: { "userID": auth.getUser().id}})
    },
    getEmpHousingComments(reportID){
        return axios.get(base.baseUrl + base.empHousingComments + '/' + reportID, {params: { "userID": auth.getUser().id}})
    },
    addEmpHousingComment(params){
        return axios.post(base.baseUrl + base.empAddHousingComment, params, {params: { "userID": auth.getUser().id}})
    },
    updateEmpHousingComment(params, commentID){
        return axios.post(base.baseUrl + base.empUpdHousingComment + '/' + commentID, params, {params: { "userID": auth.getUser().id}})
    },
   
}
export default api
