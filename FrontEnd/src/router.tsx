import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/layout.tsx";
import Infantil from "./pages/infantil";
import Home from "./pages/home";
import Individual from './pages/pijamaIndividual'
import Login from './pages/login/login.tsx'
import FeedBack from "./pages/feedBack/feedBack.tsx";
import RegLayout from './layouts/regsLayout/regsLayout.tsx'
import Cadastro from './pages/cadastro/cadastro.tsx'
import Pijamas from "./pages/pijamas/pijamas.tsx";
//import Carrinho from "./pages/carrinho";

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
                path: 'infantil',
                element: <Infantil/>
            },
            {
                path: 'pijama/:id',
                element: <Individual/>
            },
            {
                path: 'carrinho',
                //element: <Carrinho/>
            },
            {
                path: 'pijamas/:type',
                element: <Pijamas></Pijamas>
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