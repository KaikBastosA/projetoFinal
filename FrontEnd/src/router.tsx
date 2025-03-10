import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/layout.tsx";
import Infantil from "./pages/infantil";
import Home from "./pages/home";
import Login from './pages/login/login.tsx'
import FeedBack from "./pages/feedBack/feedBack.tsx";
import RegLayout from './layouts/regsLayout/regsLayout.tsx'
import Cadastro from './pages/cadastro/cadastro.tsx'

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