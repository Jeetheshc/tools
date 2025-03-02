import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DarkMode } from '../shared/Darkmode'
import { FaTools } from "react-icons/fa";
function Header() {
    const navigate = useNavigate()
    return (
        <div className="w-full bg-gradient-to-r from-white via-green-500 to-blue-500 text-base-content shadow-md z-50 relative">
            <div className="container mx-auto flex items-center justify-between py-2 px-6">
                {/* Left Side: Easy Tools Logo */}
                <Link
                    to={"/"}
                    className="text-2xl font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-700 flex items-center gap-2 animate-pulse"
                >
                    <FaTools className="text-3xl text-blue-700" />
                    Easy Tools
                </Link>

                {/* Right Side: Login, Signup, and DarkMode */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300"
                    >
                        Signup
                    </button>
                    <DarkMode />
                </div>
            </div>
        </div>

    )
}

export default Header