import { createContext,useState,useEffect } from "react";
import {getme} from "./services/auth.api"
export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getme()
                if (userData.success) {
                    setUser(userData.data.user)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error("Failed to fetch user:", error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}