import type { PropsWithChildren } from "react"
import { useAuthStore } from "../../auth/store/auth.store"
import { Navigate } from "react-router"


export const AuthenticatedRoute = ({children}:PropsWithChildren) => {
  const {isAuthenticated} = useAuthStore()
  if(isAuthenticated){
    return <Navigate to="/" />
  } 
  return <>{children}</>
}

export const NotAuthenticatedRoute = ({children}:PropsWithChildren) => {
  const {isAuthenticated} = useAuthStore()
  if(!isAuthenticated){
    return <Navigate to="/login" />
  } 
  return <>{children}</>
}