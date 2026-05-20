import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { getPostAction } from "../../actions/getPost.action";
import type { postI } from "../../interfaces/postI.interrface";
import { PostForm } from "../../components/PostForm";
import { deletePostAction } from "../../actions/deleteAction";

export const PostPage = () => {
  const [search, setSearch] = useState("");
  const [isModelOpen, setisModelOpen] = useState(false);
  const [editingPost, seteditingPost] = useState<postI | null>(null);
  const [activeMenuId, setactiveMenuId] = useState<any>(null);
  const [posts, setPosts] = useState<postI[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostAction();
        
       
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && typeof data === 'object' && 'posts' in data && Array.isArray((data as any).posts)) {
       
          setPosts((data as any).posts);
        } else {
          console.error("La API no devolvió un array válido:", data);
          setPosts([]);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchPost();
  }, []);

  const handleDelete = async(id:any) => {
    try {
        await deletePostAction(id)
        setPosts((prevPost) => prevPost.filter((post) => post.id !== id))
    } catch (error) {
        console.error(error, "Error al eliminar")
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-white sticky top-0 z-10 px-4 py-4 md:px-8 flex justify-between items-center border-b border-slate-200">
          <Header />
          <h1 className="text-lg font-bold px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg">
            Administra los mensajes
          </h1>
        </div>

        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Buscar producto o categoría..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2" onClick={() => setisModelOpen(true)}>
              <span>Agregar Producto</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    <th className="px-6 py-4">Título</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
       
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                        <td className="px-6 py-4 text-right relative">
                          <button
                            className="inline-flex flex-col gap-0.5 justify-center items-center p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={() =>
                              setactiveMenuId(
                                activeMenuId === post.id ? null : post.id
                              )
                            }
                          >
                            <span className="block w-1 h-1 rounded-full bg-slate-600"></span>
                            <span className="block w-1 h-1 rounded-full bg-slate-600"></span>
                            <span className="block w-1 h-1 rounded-full bg-slate-600"></span>
                          </button>
                          
                          {activeMenuId === post.id && (
                            <div className="absolute right-6 top-12 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-32 z-20 text-left">
                              <button onClick={() => { seteditingPost(post), setisModelOpen(true) }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                Editar
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={() => handleDelete(post.id)}>
                                Eliminar
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-6 py-8 text-center text-slate-400">
                        No se encontraron resultados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {isModelOpen && (
            <PostForm editingPost={editingPost} onClose={() => setisModelOpen(false)}/>
          )}
          </div>
          
        </main>

    
      </div>
    </>
  );
};