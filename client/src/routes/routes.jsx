import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/user/Home";
import { UserLayout } from "../layout/UserLayout";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import ErrorPage from "../pages/shared/ErrorPage";
import { AdminProtectedRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import { AdminLayout } from "../layout/AdminLayout";
import { UserHome } from "../pages/user/UserHome";
import { ProfTax } from "../pages/user/ProfTax";
import { TaxSlabForm } from "../pages/user/TaxSlabForm";
import { TaxSlabManagement } from "../pages/user/TaxSlabManagement";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { UserProfile } from "../pages/user/UserProfile";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "login",
                element: <Login />,
            },


            {
                element: <ProtectedRoutes />,
                path: "user",
                children:
                    [

                        {
                            path: "userhome",
                            element: <UserHome />,
                        },
                        {
                            path: "proftax",
                            element: <ProfTax />,
                        },
                        {
                            path: "userprofile",
                            element: <UserProfile />,
                        },
                        {
                            path: "taxslabform",
                            element: <TaxSlabForm />,
                        },
                        {
                            path: "taxslabm",
                            element: <TaxSlabManagement />,
                        },
                    ]

            },


        ]
    },

    {
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "adminlogin",
                element: <AdminLogin />,
            },
            {
                element: <AdminProtectedRoutes />,
                path: "admin",
                children:
                    [
                        {
                            path: "adminlogin",
                            element: <AdminLogin />,
                        },
                    
                    ]

            },


        ]
    },

]);
