import { create } from "zustand";
import type { AuthState } from "../../interfaces/auth.state.interface";
import { MOCK_USER } from "../mocks/user.mock";

export const useAuthStore = create<AuthState>((set) =>({
    isAuthenticated: false,
    user: null,

    login: (username, password) => {
        const foundAdmi = MOCK_USER.find((usuario) => usuario.username.toLowerCase() === username.toLowerCase() && usuario.password === password)
        if(foundAdmi) {
            set({isAuthenticated: true, user:{username:foundAdmi.username, role:foundAdmi.role}})
            return true
        }
        return false
    },
    logOut: () => set({isAuthenticated: false, user:null})
}))