import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch.jsx';  // Import the useFetch hook
import { FaTools } from 'react-icons/fa';

export const TaxSlabForm = ({ slab, onSave }) => {
    const [incomeFrom, setIncomeFrom] = useState(slab ? slab.incomeFrom : '');
    const [incomeTo, setIncomeTo] = useState(slab ? slab.incomeTo : '');
    const [taxAmount, setTaxAmount] = useState(slab ? slab.taxAmount : '');

    const { fetchData, isLoading, error } = useFetch(); // Use the useFetch hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        const slabData = { incomeFrom, incomeTo, taxAmount };

        try {
            if (slab) {
                // Edit existing slab
                const response = await fetchData(`/tax-slabs/${slab._id}`, 'PUT', slabData);
                if (response.ok) {
                    onSave();
                } else {
                    console.error('Error updating tax slab:', response.message);
                }
            } else {
                // Add new slab
                const response = await fetchData('/tax-slabs', 'POST', slabData);
                if (response.ok) {
                    onSave();
                } else {
                    console.error('Error adding tax slab:', response.message);
                }
            }
        } catch (error) {
            console.error('Error saving tax slab:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaTools /> {slab ? 'Edit Tax Slab' : 'Add Tax Slab'}
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Income From</label>
                    <input
                        type="number"
                        value={incomeFrom}
                        onChange={(e) => setIncomeFrom(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Income To</label>
                    <input
                        type="number"
                        value={incomeTo}
                        onChange={(e) => setIncomeTo(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tax Amount</label>
                    <input
                        type="number"
                        value={taxAmount}
                        onChange={(e) => setTaxAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isLoading ? 'Saving...' : (slab ? 'Update Slab' : 'Add Slab')}
                </button>
            </div>
        </form>
    );
};