// src/hooks/useFetch.jsx
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axiosInstance({ url: url });
            setTimeout(() => {
                setData(response?.data); // Keep as response.data to match your API
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            setError(error);
            setIsLoading(false); // Move to finally block was unnecessary here
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]); // Add url as dependency to refetch if it changes

    return { data, isLoading, error }; // Return object instead of array
};