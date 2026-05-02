import { createBrowserRouter } from "react-router"
import { Login } from "./features/auth/pages/Login"
import { Register } from "./features/auth/pages/Register"
// import ProtectedRoute from "./features/auth/components/ProtectedRoute"  
export const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login />
    }, {

        path: "/register",
        element: <Register />

    }
    ,{
        path:"/",
        element: <h1>Welcome to HireMatch.ai</h1>
        // :<ProtectedRoute>         
         
        // </ProtectedRoute>
    
    }
])