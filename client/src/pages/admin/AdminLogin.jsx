import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import backgroundImage from "../../assets/background.jpg";

export const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { fetchData, isLoading, error, data } = useFetch();

    const onSubmit = async (formData) => {
        console.log("Form data:", formData); // Log form data
        await fetchData("/user/login", "POST", formData); // Call fetchData
    };

    // Handle successful login
    React.useEffect(() => {
        if (data) {
            toast.success("Login successful!");
            navigate("/user/userhome");
        }
    }, [data, navigate]);

    // Handle login error
    React.useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className="hero bg-blue-50 dark:bg-base-100 dark:text-base-content min-h-screen">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-blue-700 mb-4">Login now!</h1>
                </div>
                <div className="card bg-black bg-opacity-20 w-full max-w-sm shrink-0 shadow-lg border dark:bg-base-100 dark:bg-opacity-20 dark:text-base-content border-blue-200">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-zinc-50 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-zinc-50 font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                placeholder="Enter your password"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                            <label className="label">
                                <Link to="/signup" className="text-zinc-50 hover:text-blue-700 transition-colors duration-200">
                                    New User? Click to Register
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-300 hover:scale-105 border-blue-200"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};