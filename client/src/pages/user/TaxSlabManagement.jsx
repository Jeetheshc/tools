import React, { useState, useEffect } from 'react';
import { TaxSlabForm } from './TaxSlabForm';
import { useFetch } from '../../hooks/useFetch.jsx'; // Import the useFetch hook

export const TaxSlabManagement = () => {
    const [slabs, setSlabs] = useState([]);
    const [selectedSlab, setSelectedSlab] = useState(null);

    const { fetchData, isLoading, error } = useFetch(); // Use the useFetch hook

    // Fetch tax slabs from the database
    const fetchSlabs = async () => {
        const response = await fetchData('/tax-slabs', 'GET');
        if (response.ok) {
            setSlabs(response.data);
        } else {
            console.error('Error fetching tax slabs:', response.message);
        }
    };

    // Fetch slabs on component mount
    useEffect(() => {
        fetchSlabs();
    }, []);

    // Handle save (refresh the list after saving)
    const handleSave = () => {
        fetchSlabs();
        setSelectedSlab(null); // Clear the selected slab
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Tax Slab Management</h1>
            <TaxSlabForm slab={selectedSlab} onSave={handleSave} />
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Tax Slabs</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <ul className="space-y-2">
                        {slabs.map((slab) => (
                            <li key={slab._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                                <span>
                                    {slab.incomeFrom} - {slab.incomeTo}: ₹{slab.taxAmount}
                                </span>
                                <button
                                    onClick={() => setSelectedSlab(slab)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};