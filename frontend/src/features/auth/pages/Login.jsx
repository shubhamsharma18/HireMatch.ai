import React from 'react'
import '../auth.form.scss'
import { useState } from 'react'
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
export const Login = () => {


    const { loading, handleLogin } = useAuth()

    const [error,setError]=useState("")


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function handle(e) {
        e.preventDefault();
      try {
         const result = await handleLogin({ email, password })
         if(result.status===400){
            throw new Error(result.data.message)
         }  
      } 
      catch (error) {
        console.log(error)
        setError(error.message)
      }
       
    }

    if (loading) {
        return(
            <div style={{ minHeight: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

                <div>
                    <h1 style={{ color: "white" }}>Loading... </h1>
                </div>
            </div>
        )
    }

    return (
        <main>



            <div className="form-container">


                <div className='heading'>Login Page</div>

                <form onSubmit={handle}>


                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Enter your email' />
{error.includes("email") && <p className="text-red-500">{error}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='Enter your password' />

                    </div>
                    {error.includes("password") && <p style={{color: "red"}}>{error}</p>}


                    <button className='button primary-button' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>



                </form>

                <p>Don't have an account? <Link to="/register">Register</Link></p>

            </div>
        </main>
    )
}