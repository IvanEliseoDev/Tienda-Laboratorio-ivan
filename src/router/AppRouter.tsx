import { createBrowserRouter } from "react-router";
import { PostPage } from "../modules/post/PostPage";
import { LoginPage } from "../modules/auth/LoginPage";
import { AuthenticatedRoute, NotAuthenticatedRoute } from "./custom/ProtectedRoute";
import { HomePage } from "../modules/homePage/HomePage";

export const appRouter = createBrowserRouter([
    {
        index: true,
        element: <AuthenticatedRoute > <HomePage/> </AuthenticatedRoute>
    },
    {
        path: "post",
        element: <AuthenticatedRoute > <PostPage/> </AuthenticatedRoute>
    },
    {
        path: "login",
        element: <NotAuthenticatedRoute> <LoginPage /> </NotAuthenticatedRoute>
    }
])