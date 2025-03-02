import React, { useEffect } from 'react';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import { axiosInstance } from '../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, saveUserData } from '../redux/features/UserSlice';

export const UserLayout = () => {
    const { isUserAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/check-user",
            });
            dispatch(saveUserData(response.data.user));
        } catch (error) {
            dispatch(clearUserData());
            console.error("Error in checkUser:", error);
        }
    };

    useEffect(() => {
        checkUser(); // Re-run checkUser whenever the route changes
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen">


            {/* Main Layout */}
            {isUserAuth ? <UserHeader /> : <Header />}
            <div className='min-h-screen flex flex-col'>
                <div className='flex-grow'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default UserLayout;
