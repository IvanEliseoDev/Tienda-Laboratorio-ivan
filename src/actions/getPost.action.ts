import { Tienda_API } from "../api/TiendaApi";
import type { postI } from "../interfaces/postI.interrface";

export const getPostAction = async():Promise<postI[]> => {
    try {
        const {data} = await Tienda_API.get<postI[]>("/post")
        return data
    } catch (error) {
        console.log(error)
        return 
    }
}