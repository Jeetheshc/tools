import TaxSlab from '../models/proftaxmodel.js';

// Fetch all tax slabs
export const getTaxSlabs = async (req, res) => {
    try {
        const slabs = await TaxSlab.find().sort({ incomeFrom: 1 });
        res.status(200).json(slabs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tax slabs', error });
    }
};

// Add a new tax slab
export const addTaxSlab = async (req, res) => {
    const { incomeFrom, incomeTo, taxAmount } = req.body;

    try {
        // Check if the slab already exists
        const existingSlab = await TaxSlab.findOne({ incomeFrom, incomeTo });
        if (existingSlab) {
            return res.status(400).json({ message: 'Tax slab already exists' });
        }

        // Create a new tax slab
        const newSlab = new TaxSlab({ incomeFrom, incomeTo, taxAmount });
        await newSlab.save();

        res.status(201).json({ message: 'Tax slab added successfully', slab: newSlab });
    } catch (error) {
        res.status(500).json({ message: 'Error adding tax slab', error });
    }
};

// Edit an existing tax slab
export const editTaxSlab = async (req, res) => {
    const { id } = req.params; // ID of the slab to edit
    const { incomeFrom, incomeTo, taxAmount } = req.body;

    try {
        // Find the slab by ID
        const slab = await TaxSlab.findById(id);
        if (!slab) {
            return res.status(404).json({ message: 'Tax slab not found' });
        }

        // Update the slab details
        slab.incomeFrom = incomeFrom;
        slab.incomeTo = incomeTo;
        slab.taxAmount = taxAmount;

        await slab.save();

        res.status(200).json({ message: 'Tax slab updated successfully', slab });
    } catch (error) {
        res.status(500).json({ message: 'Error updating tax slab', error });
    }
};

export const getAllTaxSlabs = async (req, res) => {
    try {
        const taxSlabs = await TaxSlab.find().sort({ incomeFrom: 1 }); // Sort by incomeFrom ascending
        if (!taxSlabs || taxSlabs.length === 0) {
            return res.status(404).json({ message: 'No tax slabs found' });
        }
        res.status(200).json({ message: 'Tax slabs retrieved successfully', slabs: taxSlabs });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tax slabs', error });
    }
};