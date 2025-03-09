import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Infantil from "./pages/infantil";
import Home from "./pages/home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'infantil',
                element: <Infantil/>
            }
        ]
    },

]);

export default router;