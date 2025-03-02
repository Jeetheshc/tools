// src/pages/user/UpdateProfile.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance'; // Adjust path
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        address: '',
        designation: '',
        phone: '',
        email: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Fetch initial profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosInstance.get('/user/profile');
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Failed to load profile data");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.put('/user/updateprofile', profile);
            setProfile(data);
            setSuccess("Profile updated successfully!");
            setError(null);
            setTimeout(() => navigate('/user/proftax'), 2000); // Redirect after 2s
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile");
            setSuccess(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Profile</h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={profile.designation}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/user/proftax')}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};