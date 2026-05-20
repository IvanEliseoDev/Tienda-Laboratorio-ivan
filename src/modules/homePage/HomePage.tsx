import React from "react";
import { useAuthStore } from "../../auth/store/auth.store";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50  sticky top-0 z-10 px-4 py-4 md:px-8 flex justify-between items-center">
      <Header />
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold px-4 py-4 bg-indigo-300">
          bienvenido
        </h1>

        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            <div>
               <button onClick={() => navigate("/post")} className=" border-b rounded-md w-200 h-100 bg-blue-500 text-sm text-white font-bold"> Enviar Mensajes</button>
            </div>
        </main>
      </div>
    </div>
  );
};
