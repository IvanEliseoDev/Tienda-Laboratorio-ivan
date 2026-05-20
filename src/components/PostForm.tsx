import { useForm } from "react-hook-form";
import type { postI } from "../interfaces/postI.interrface";
import { useEffect } from "react";
import { putPostAction } from "../actions/putPost.action";
import { postPostAction } from "../actions/postPosts.action";

export interface FormProps {
  editingPost: postI | null;
  onClose: () => void;
}

export interface PostFormData {
  title: String; 
  body: String;  
}

export const PostForm = ({ editingPost, onClose }: FormProps) => {
  const { register, handleSubmit, reset } = useForm<PostFormData>({
    defaultValues: { title: "", body: "" },
  });

  useEffect(() => {
    if (editingPost) {
      reset({
        title: editingPost.title,
        body: editingPost.body,
      });
    } else {
      reset({
        title: "",
        body: "",
      });
    }
  }, [editingPost, reset]);

  const onSubmit = async (data: PostFormData) => {
    const formattedData = {
      title: data.title,
      body: data.body,
    };
    
    if (editingPost) {
        console.log("editando..")
        console.log(editingPost.id)
      await putPostAction(editingPost.id, formattedData);
    } else {
      await postPostAction(formattedData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl border w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 text-lg">
            {editingPost ? "Editar Post" : "Registrar Post"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-medium text-slate-700 capitalize">
              Título
            </label>
            <input 
              id="title"
              type="text" 
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
              placeholder="Escribe el título aquí..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="body" className="text-sm font-medium text-slate-700 capitalize">
              Contenido
            </label>
            <textarea 
              id="body"
              rows={4}
              {...register("body", { required: true })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 resize-none"
              placeholder="¿De qué trata este post?..."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              {editingPost ? "Guardar Cambios" : "Crear Post"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};