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
    // getProfile() {
    //     return decode(this.getToken());
    // },
    // loggedIn() {
    //     // Checks if there is a saved token and it's still valid
    //     const token = this.getToken();
    //     return !!token && !this.isTokenExpired(token);
    // },

    // isTokenExpired(token) {
    //     try {
    //         const decoded = decode(token);
    //         if (decoded.exp < Date.now() / 1000) {
    //             return true;
    //         } else return false;
    //     } catch (err) {
    //         return false;
    //     }
    // },

    // getToken() {
    //     // Retrieves the user token from localStorage
    //     return localStorage.getItem("id_token");
    // },

    // getUser() {
    //     // Retrieves the user token from localStorage
    //     return JSON.parse(localStorage.getItem("user"));
    // },

    // login(idToken, user) {
    //     // Saves user token to localStorage
    //     localStorage.setItem("id_token", idToken);
    //     localStorage.setItem("user", JSON.stringify(user));

    //     window.location.assign("/");
    // },

    // logout() {
    //     // Clear user token and profile data from localStorage
    //     localStorage.removeItem("id_token");
    //     localStorage.removeItem("user");
    //     // this will reload the page and reset the state of the application
    //     window.location.assign("/");
    // }
}

export default api