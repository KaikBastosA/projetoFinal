import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/layout.tsx";
import Home from "./pages/home";
import Individual from './pages/pijamaIndividual'
import Login from './pages/login/login.tsx'
import FeedBack from "./pages/feedBack/feedBack.tsx";
import RegLayout from './layouts/regsLayout/regsLayout.tsx'
import Cadastro from './pages/cadastro/cadastro.tsx'
import Pijamas from "./pages/pijamas/index.tsx";
import Carrinho from "./pages/carrinho";
import Favoritos from "./pages/favoritos";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'pijama/:id',
                element: <Individual/>
            },
            {
                path: 'carrinho',
                element: <Carrinho/>
            },
            {
                path: 'pijamas',
                element: <Pijamas></Pijamas>
            },
            {
                path: 'favoritos',
                element: <Favoritos/>
            },
            {
                path: 'reg',
                element: <RegLayout></RegLayout>,
                children: [
                    {
                        path: 'cadastro',
                        element: <Cadastro></Cadastro>
                    },
                    {
                        path: 'feedback',
                        element: <FeedBack></FeedBack>
                    },
                    {
                        path: 'login',
                        element: <Login></Login>
                    }
                ]
            }
        ]
    },

]);

export default router;