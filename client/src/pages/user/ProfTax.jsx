import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance'; // Adjust path
import { useFetch } from '../../hooks/useFetch'; // Adjust path
import { generatePDF } from '../../Utils/pdf'; // Adjust path

export const ProfTax = () => {
    const [employees, setEmployees] = useState(() => {
        const savedEmployees = localStorage.getItem('profTaxEmployees');
        return savedEmployees ? JSON.parse(savedEmployees) : [
            { name: '', designation: '', grossSalary: '', additionalSalary: '', total: '', tax: '' }
        ];
    });
    const [showSlabs, setShowSlabs] = useState(false);
    const [half, setHalf] = useState('First Half');
    const [financialYear, setFinancialYear] = useState(() => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    });
    const [userProfile, setUserProfile] = useState(null); // State for user profile data

    const { data: taxSlabs, isLoading, error } = useFetch("/user/getallslab");

    // Fetch user profile details
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axiosInstance.get('/user/profile');
                setUserProfile(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setUserProfile({ name: "Unknown", address: "Your Institution Name", designation: "N/A", phone: "N/A", email: "N/A" });
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        localStorage.setItem('profTaxEmployees', JSON.stringify(employees));
    }, [employees]);

    useEffect(() => {
        localStorage.setItem('profTaxHalf', half);
    }, [half]);

    useEffect(() => {
        localStorage.setItem('profTaxFinancialYear', financialYear);
    }, [financialYear]);

    const calculateTax = (total) => {
        const totalNum = parseFloat(total) || 0;
        console.log('Calculating Tax for Total:', totalNum, 'Slabs:', taxSlabs?.slabs);
        const slab = taxSlabs?.slabs?.find(
            (slab) => totalNum >= slab.incomeFrom && totalNum <= slab.incomeTo
        );
        const tax = slab ? slab.taxAmount.toString() : '0';
        console.log('Found Slab:', slab, 'Tax:', tax);
        return tax;
    };

    const handleChange = (index, field, value) => {
        setEmployees(prevEmployees => {
            const updatedEmployees = [...prevEmployees];
            updatedEmployees[index][field] = value;

            if (field === 'grossSalary' || field === 'additionalSalary') {
                const gross = parseFloat(updatedEmployees[index].grossSalary) || 0;
                const additional = parseFloat(updatedEmployees[index].additionalSalary) || 0;
                const total = (gross + additional).toFixed(2);
                updatedEmployees[index].total = total;
                updatedEmployees[index].tax = calculateTax(total);
            }
            return updatedEmployees;
        });
    };

    const addEmployee = () => {
        setEmployees([...employees, { name: '', designation: '', grossSalary: '', additionalSalary: '', total: '', tax: '' }]);
    };

    const deleteEmployee = (index) => {
        setEmployees(prevEmployees => prevEmployees.filter((_, i) => i !== index));
    };

    const handleShowSlabs = () => {
        setShowSlabs(!showSlabs);
    };

    const getPeriodDates = () => {
        const startYear = parseInt(financialYear.split('-')[0]);
        const startMonth = half === 'First Half' ? 3 : 9;
        const endMonth = half === 'First Half' ? 8 : 2;
        const periodFrom = new Date(startYear, startMonth, 1);
        const periodTo = new Date(half === 'First Half' ? startYear : startYear + 1, endMonth + 1, 0);
        return { periodFrom, periodTo };
    };

    const grandTotalSalary = employees
        .reduce((acc, emp) => acc + (parseFloat(emp.total) || 0), 0)
        .toFixed(2);
    const grandTotalTax = employees
        .reduce((acc, emp) => acc + (parseFloat(emp.tax) || 0), 0)
        .toFixed(2);

    const handleGeneratePDF = () => {
        const { periodFrom, periodTo } = getPeriodDates();
        console.log('Generating PDF with:', { employees, periodFrom, periodTo, grandTotalSalary, grandTotalTax, institution: userProfile?.address });
        generatePDF(employees, periodFrom, periodTo, grandTotalSalary, grandTotalTax, userProfile?.address);
    };

    const generateFinancialYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, i) => {
            const startYear = currentYear - 5 + i;
            return `${startYear}-${(startYear + 1).toString().slice(-2)}`;
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* User Profile Box */}
            {userProfile && (
                <div className="mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><span className="font-semibold">Name:</span> {userProfile.name}</p>
                        <p><span className="font-semibold">Designation:</span> {userProfile.designation}</p>
                        <p><span className="font-semibold">Address:</span> {userProfile.address}</p>
                        <p><span className="font-semibold">Phone:</span> {userProfile.phone}</p>
                        <p className="md:col-span-2"><span className="font-semibold">Email:</span> {userProfile.email}</p>
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Professional Tax</h1>

            {/* Half and Year Selection */}
            <div className="flex justify-center space-x-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Period</label>
                    <select
                        value={half}
                        onChange={(e) => setHalf(e.target.value)}
                        className="w-48 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="First Half">First Half (April - September)</option>
                        <option value="Second Half">Second Half (October - March)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Financial Year</label>
                    <select
                        value={financialYear}
                        onChange={(e) => setFinancialYear(e.target.value)}
                        className="w-48 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {generateFinancialYears().map(fy => (
                            <option key={fy} value={fy}>{fy}</option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <p className="text-center">Loading tax slabs...</p>
            ) : error ? (
                <p className="text-center text-red-600">Error: {error.message}</p>
            ) : (
                <div className="max-w-4xl mx-auto">
                    {/* Employee Form */}
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6 mb-6">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Designation</th>
                                    <th className="px-4 py-2 text-left">Gross Salary</th>
                                    <th className="px-4 py-2 text-left">Additional Salary</th>
                                    <th className="px-4 py-2 text-left">Total</th>
                                    <th className="px-4 py-2 text-left">Tax</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={employee.name}
                                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                className="min-w-[100px] w-full max-w-[300px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-x"
                                                style={{ width: `${Math.max(100, employee.name.length * 10)}px` }}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                placeholder="Designation"
                                                value={employee.designation}
                                                onChange={(e) => handleChange(index, 'designation', e.target.value)}
                                                className="min-w-[100px] w-full max-w-[300px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-x"
                                                style={{ width: `${Math.max(100, employee.designation.length * 10)}px` }}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                placeholder="Gross Salary"
                                                value={employee.grossSalary}
                                                onChange={(e) => handleChange(index, 'grossSalary', e.target.value)}
                                                min="0"
                                                step="0.01"
                                                className="min-w-[100px] w-full max-w-[200px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-x"
                                                style={{ width: `${Math.max(100, (employee.grossSalary.length || 1) * 10)}px` }}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                placeholder="Additional Salary"
                                                value={employee.additionalSalary}
                                                onChange={(e) => handleChange(index, 'additionalSalary', e.target.value)}
                                                min="0"
                                                step="0.01"
                                                className="min-w-[100px] w-full max-w-[200px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-x"
                                                style={{ width: `${Math.max(100, (employee.additionalSalary.length || 1) * 10)}px` }}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={employee.total}
                                                readOnly
                                                className="min-w-[100px] w-full max-w-[200px] px-3 py-2 border rounded-lg bg-gray-100"
                                                style={{ width: `${Math.max(100, (employee.total.length || 1) * 10)}px` }}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={employee.tax}
                                                readOnly
                                                className="min-w-[100px] w-full max-w-[200px] px-3 py-2 border rounded-lg bg-gray-100"
                                                style={{ width: `${Math.max(100, (employee.tax.length || 1) * 10)}px` }}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => deleteEmployee(index)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end mb-6 space-x-4">
                        <button
                            onClick={addEmployee}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Add New Employee
                        </button>
                        <button
                            onClick={handleShowSlabs}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            {showSlabs ? 'Hide Slabs' : 'Show Slabs'}
                        </button>
                    </div>

                    {/* Tax Slabs Table */}
                    {showSlabs && (
                        <div className="mb-6 max-w-4xl mx-auto">
                            <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4 text-center text-purple-600">Tax Slabs</h2>
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2 text-left">Income From</th>
                                            <th className="px-4 py-2 text-left">Income To</th>
                                            <th className="px-4 py-2 text-left">Tax Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxSlabs?.slabs?.length > 0 ? (
                                            taxSlabs.slabs.map((slab) => (
                                                <tr key={slab._id} className="border-b">
                                                    <td className="px-4 py-2">{slab.incomeFrom}</td>
                                                    <td className="px-4 py-2">{slab.incomeTo}</td>
                                                    <td className="px-4 py-2">{slab.taxAmount}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-4 py-2 text-center">No tax slabs available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Grand Total Row */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <table className="min-w-full">
                            <tbody>
                                <tr className="border-t">
                                    <td className="px-4 py-2 font-bold text-right" colSpan="4">Grand Total</td>
                                    <td className="px-4 py-2 text-right">{grandTotalSalary}</td>
                                    <td className="px-4 py-2 text-right">{grandTotalTax}</td>
                                    <td className="px-4 py-2"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Generate Form Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleGeneratePDF}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Generate Form
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};