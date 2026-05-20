import { data } from "react-router";
import { Tienda_API } from "../api/TiendaApi";
import type { postI } from "../interfaces/postI.interrface";

export const putPostAction = async(id, payload):Promise<postI[]> => {
    try {
        const {data} = await Tienda_API.put(`/posts/${id}`, payload)
        return data
    } catch (error) {
        console.log(error)
        return 
    }
}