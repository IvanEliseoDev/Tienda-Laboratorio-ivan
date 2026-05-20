import axios from "axios"

const Tienda_API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
})

export{Tienda_API}