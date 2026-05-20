import { createBrowserRouter } from "react-router";
import { PostPage } from "../modules/post/PostPage";
import { LoginPage } from "../modules/auth/LoginPage";

export const appRouter = createBrowserRouter([
    {
        index: true,
        element: <PostPage/>
    },
    {
        path: "/login",
        element: <LoginPage />
    }
])