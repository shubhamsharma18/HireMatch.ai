import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U'
    }

    const handleLogout =  () => {
        
        navigate('/login')
        setShowDropdown(false)
    }

    return (
        <nav className='navbar'>
            <div className='navbar__container'>
                {/* Logo */}
                <div className='navbar__logo' onClick={() => navigate('/dashboard')}>
                    <h2>HireMatch.ai</h2>
                </div>

                {/* User Profile */}
                <div className='navbar__profile'>
                    <div 
                        className='profile-avatar'
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {user?.username ? getInitial(user.username) : 'U'}
                    </div>

                    {/* Dropdown */}
                    {showDropdown && (
                        <div className='profile-dropdown'>
                            <button onClick={() => { navigate('/profile'); setShowDropdown(false) }}>
                                Profile
                            </button>
                            <button onClick={() => { navigate('/settings'); setShowDropdown(false) }}>
                                Settings
                            </button>
                            <hr />
                            <button onClick={handleLogout} className='logout-btn'>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar