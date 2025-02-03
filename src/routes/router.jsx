import Layout from "../layout/Layout";
import Login from "../auth/Login";
import Register from "../auth/Register";
//import PrivateRoute from "../routes/PrivateRoute";
import test from "../pages/test";

const routes = [
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/todo',
        element: <Layout/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/test",
        element: <test/>
    }
];

export default routes;