// import axios from '../utils/axios'
import axios from 'axios'

const base = {
    baseUrl:"http://127.0.0.1:3001/api",
    register_token:"/register",
    register: "/register"
}


const api = {
    registerToken(){
        return axios.get(base.baseUrl + base.register_token)
    },
    register(params){
        return axios.post(base.baseUrl + base.register,params)
    },
    
}

export default api