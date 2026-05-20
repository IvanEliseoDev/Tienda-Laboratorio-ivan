export type UserRole = "admin" | "empleado"

export interface UserSession {
    username: String
    role: UserRole 
}

export interface AuthState{
    isAuthenticated: boolean ,
    user: UserSession | null,
    login: (username:String, password:String) => boolean
    logOut: () => void
}