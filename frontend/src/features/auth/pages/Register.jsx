import { Link } from 'react-router';
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'; 
export const Register=()=>{

    const {loading,handleRegister}=useAuth()    

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")  
    const [error,setError]=useState("")

     async function handle(e){
        e.preventDefault();
        try {
            const result=await handleRegister({username,email,password})
            if(result.status===400){
                throw new Error(result.data.message)
            }
            console.log(result) 
        } catch (error) {
            console.log(error)
            setError(error.message)

        }


    }


    return(
       <main>
            <div className="form-container">


                <div className='heading' >Register Page</div>

                <form onSubmit={handle}>

              <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />

                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    </div>


                    <button className='button primary-button'>Register</button>



                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>



            </div>
        </main>
    )
}