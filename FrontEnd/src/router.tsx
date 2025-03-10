import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Infantil from "./pages/infantil";
import Home from "./pages/home";
import Individual from './pages/pijamaIndividual'

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
            },
            {
                path: 'pijama',
                element: <Individual/>
            }
        ]
    },

]);

export default router;