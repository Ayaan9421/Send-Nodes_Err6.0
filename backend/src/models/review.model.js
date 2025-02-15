import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // Reference to Students collection
        required: true
    },
    landlordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Landlord", // Reference to Landlords collection
        required: true
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property", // Reference to Properties collection
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Ratings on a scale of 1-5
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Enables createdAt & updatedAt timestamps automatically

const Review = mongoose.model("Review", ReviewSchema);
export default Review;

