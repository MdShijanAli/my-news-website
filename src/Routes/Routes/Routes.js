import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Category from "../../Pages/Category/Category/Category";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import News from "../../Pages/News/News";
import Profile from "../../Pages/others/Profile/Profile";
import TearmsAndCondition from "../../Pages/others/TearmsAndCondition/TearmsAndCondition";
import ViewProfile from "../../Pages/others/ViewProfile/ViewProfile";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/news')
            },
            {
                path: '/category/:id',
                element: <Category></Category>,
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
            },
            {
                path: '/news/:id',
                element: <PrivateRoute><News></News></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/news/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/terms',
                element: <TearmsAndCondition></TearmsAndCondition>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/view-profile',
                element: <ViewProfile></ViewProfile>
            }
        ]
    }
])