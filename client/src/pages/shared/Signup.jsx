import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import backgroundImage from "../../assets/background.jpg";

export const Signup = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { fetchData } = useFetch();

    const onSubmit = async (formData) => {
        try {
            console.log("Form data:", formData);

            const response = await fetchData("/user/signup", "POST", formData);

            if (response.ok) {
                toast.success("Signup successful!");
                navigate("/user/userhome");
                reset();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <div className="hero bg-blue-50 dark:bg-base-100 dark:text-base-content min-h-screen">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-blue-700 mb-4">Sign Up Now!</h1>
                </div>
                <div className="card bg-black bg-opacity-20 w-full max-w-3xl shrink-0 shadow-lg border dark:bg-base-100 dark:bg-opacity-20 dark:text-base-content border-blue-200">
                    <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <label className="text-zinc-50 font-medium">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter your name"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500 w-full md:col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <label className="text-zinc-50 font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500 w-full md:col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <label className="text-zinc-50 font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                placeholder="Enter your password"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500 w-full md:col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <label className="text-zinc-50 font-medium">Phone</label>
                            <input
                                type="text"
                                {...register("phone", { required: "Phone is required" })}
                                placeholder="Enter your phone number"
                                maxLength={10}
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500 w-full md:col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <label className="text-zinc-50 font-medium">Address</label>
                            <input
                                type="text"
                                {...register("address", { required: "Address is required" })}
                                placeholder="Enter your address"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500 w-full md:col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                            <label className="text-zinc-50 font-medium">Designation</label>
                            <input
                                type="text"
                                {...register("designation", { required: "Designation is required" })}
                                placeholder="Enter your designation"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200 focus:border-blue-500 w-full md:col-span-2"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-300 hover:scale-105 border-blue-200"
                            >
                                Sign Up
                            </button>
                        </div>
                        <label className="label">
                            <Link to="/login" className="text-zinc-50 hover:text-blue-700 transition-colors duration-200">
                                Already have an account? Login here.
                            </Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};
