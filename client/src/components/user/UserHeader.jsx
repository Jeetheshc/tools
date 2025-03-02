import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../shared/Darkmode';
import { axiosInstance } from '../../config/axiosInstance';
import { FaTools } from "react-icons/fa";

function UserHeader() {
    const navigate = useNavigate();
    const [address, setAddress] = useState("");

    // Fetch user address
    useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const { data } = await axiosInstance.get('user/address');
                setAddress(data.address || "Welcome");
            } catch (error) {
                console.error("Error fetching address:", error);
            }
        };

        fetchUserAddress();
    }, []);
    // Logout function
    const userLogout = async () => {
        try {
            await axiosInstance({ method: "PUT", url: '/user/Logout' });
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <div className="w-full bg-gradient-to-r from-white via-green-500 to-blue-500 text-base-content shadow-md z-50 relative">
            <div className="container mx-auto flex items-center justify-between py-2 px-6">
                {/* Left Side: Easy Tools Logo */}
                <Link
                    to={"/user/userhome"}
                    className="text-2xl font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-700 flex items-center gap-2 animate-pulse"
                >
                    <FaTools className="text-3xl text-blue-700" />
                    Easy Tools
                </Link>

                {/* Center: Address Display */}
                <div className="text-white font-semibold text-lg">
                    {address}
                </div>

                {/* Right Side: Profile and Logout Buttons */}
                <div className="flex items-center space-x-4">
                    <div>
                        <button
                            onClick={() => navigate('user/userprofile')}
                            className="bg-white mr-5 text-sky-700 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition-all duration-300"
                        >
                            Update Profile
                        </button>
                        <button
                            className="bg-white text-red-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition-all duration-300"
                            onClick={userLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <DarkMode />
                </div>
            </div>
        </div>
    );
}

export default UserHeader;
