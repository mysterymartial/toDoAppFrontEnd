import Layout from "../layout/Layout";
import Login from "../auth/Login"
import Register from "../auth/Register";

const routes = [
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Register/>
    },
    {
        path: '/todo',
        element: <Layout/>
    },
    {
        path: "/login",
        element: <Login/>

    }
]

export default routes;