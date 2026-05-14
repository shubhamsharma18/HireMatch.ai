import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Loader from '../../../ui/Loader'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await handleLogin({email,password})
        if (result.success) {
            navigate('/')
        } else {
            setError(result.error || 'Login failed')
        }
    }

    if (loading) {
        return (
            <main>
                <Loader fullScreen={true} type='spinner' text='Signing you in...' />
            </main>
        )
    }

    return (
        <main>
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-brand">
                        <div className="brand-logo">HireMatch AI</div>
                        <p className="brand-tag">Smart interview prep for smarter career moves</p>
                    </div>

                    <div className="auth-header">
                        <h1>Welcome back</h1>
                        <p className="form-subtitle">Login to access your interview insights and personalized report.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name='email'
                                placeholder='Enter your email address'
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name='password'
                                placeholder='Enter your password'
                            />
                        </div>

                        {error && <p className='form-error'>{error}</p>}
                        <button className='button primary-button'>Login</button>
                    </form>

                    <p className="switch-text">Don't have an account? <Link to={'/register'}>Create one</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login