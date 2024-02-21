import axios from "axios"

export default axios.create({
    // baseURL : "http://localhost:9000",
    baseURL : "http://172.24.141.72:9000"
    // baseURL : "http://172.20.10.2:9000"
})