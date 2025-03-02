import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaTools } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export const UserHome = () => {
    const navigate = useNavigate();

    // Button data with labels, paths, and icons
    const buttons = [
        { label: "Profession Tax", path: "/user/proftax", icon: <FaBriefcase className="text-2xl" />, isUnderConstruction: false },
        { label: "Under Construction", path: "/user/userhome", icon: <FaTools className="text-2xl" />, isUnderConstruction: true },
        { label: "Under Construction", path: "/user/userhome", icon: <FaTools className="text-2xl" />, isUnderConstruction: true },
        { label: "Under Construction", path: "/user/userhome", icon: <FaTools className="text-2xl" />, isUnderConstruction: true },
        { label: "Under Construction", path: "/user/userhome", icon: <FaTools className="text-2xl" />, isUnderConstruction: true },
        { label: "Under Construction", path: "/user/userhome", icon: <FaTools className="text-2xl" />, isUnderConstruction: true }
    ];

    // Function to handle button clicks
    const handleClick = (button) => {
        if (button.isUnderConstruction) {
            toast((t) => (
                <span className="text-blue-700">
                    🚧 Wait for a while, we are on the way for innovation!
                    <button
                        className="ml-4 text-red-600 hover:underline"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Close
                    </button>
                </span>
            ), {
                duration: 3000,
                icon: '🚀',
            });
        } else {
            navigate(button.path);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-300 to-blue-400">
            <h1 className="text-4xl font-bold text-white mb-10">Panchayath Toolbox</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {buttons.map((button, index) => (
                    <motion.button
                        key={index}
                        onClick={() => handleClick(button)}
                        className="w-60 h-28 flex flex-col justify-center items-center bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        {button.icon}
                        <span className="mt-2">{button.label}</span>
                    </motion.button>
                ))}
            </div>

            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};
