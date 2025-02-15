import mongoose from "mongoose";

const RentalAgreementSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // References Students collection
        required: true
    },
    landlordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Landlord", // References Landlords collection
        required: true
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property", // References Properties collection
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    monthlyRent: {
        type: Number,
        required: true
    },
    depositAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Active", "Completed"], // Status of the agreement
        default: "Pending"
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const RentalAgreement = mongoose.model("RentalAgreement", RentalAgreementSchema);
export default RentalAgreement;

