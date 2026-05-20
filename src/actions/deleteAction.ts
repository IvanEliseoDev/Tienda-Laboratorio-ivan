
import { Tienda_API } from "../api/TiendaApi";
export const deletePostAction = async(id:any) => {
    try {
        const {data} = await Tienda_API.delete(`/posts/${id}`)
        return data
    } catch (error) {
        console.log(error)
        return 
    }
}