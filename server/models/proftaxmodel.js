import mongoose from 'mongoose';

const taxSlabSchema = new mongoose.Schema({
    incomeFrom: { type: Number, required: true }, // Lower limit of the income slab
    incomeTo: { type: Number, required: true },   // Upper limit of the income slab
    taxAmount: { type: Number, required: true },  // Tax amount for this slab
});

const TaxSlab = mongoose.model('TaxSlab', taxSlabSchema);

export default TaxSlab;