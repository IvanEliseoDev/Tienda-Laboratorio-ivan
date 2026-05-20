import { RouterProvider } from "react-router"
import { appRouter } from "./router/AppRouter"

export const TiendaApp = () => {
  return (
    <>
        <RouterProvider router={appRouter}/>
    </>
  )
}
