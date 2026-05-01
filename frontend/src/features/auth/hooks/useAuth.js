import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register,logout } from "../services/auth.api";

export const useAuth=()=>{

    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}=context


    const handleLogin=async({email,password})=>{
        setLoading(true)
        try {
            const data=await login({email,password})
            if(data.user){

                 setUser(data.user)
                            setLoading(false)
            return data
            }

   
        } catch (error) {
              setLoading(false)
          
            return error
        }
       

    }

    const handleRegister=async({username,email,password})=>{
        setLoading(true)
        try {

            const data=await register({username,email,password})
            console.log(data)
            setUser(data.user)
            setLoading(false)
           
            
        } catch (error) {
            setLoading(false)
            console.log(error)
            return error
           
            
        }
    }

    const handleLogout=async()=>{
        setLoading(true)
        try {
            const data=await logout()
            setUser(null)
            setLoading(false)
    
            
        } catch (error) {
            setLoading(false)
            console.log(error)  
            
        }
    }

    return {user,loading,handleLogin,handleLogout,handleRegister}
}