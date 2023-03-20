import { createBrowserRouter } from "react-router-dom";
import About from "../components/About/About";
import Home from "../components/Home/Home";
import Users from "../components/Users/Users";
import Main from '../components/Main/Main';
import AddUser from "../components/Users/AddUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/users',
                element: <Users></Users>,
                loader: () => fetch('http://localhost:5000/users')
            },
            {
                path: '/addUser',
                element: <AddUser></AddUser>,
            },
            {
                path: '/about',
                element: <About></About>
            },
        ]
    }
])

export default router;