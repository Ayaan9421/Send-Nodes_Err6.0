import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References User (Landlord)
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String], // List of amenities (WiFi, AC, Gym, etc.)
        default: []
    },
    tenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student" // References students currently renting the property
    }],
    availability: {
        type: Number,
        default: 0 // If the PG is available for new tenants
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review" // References the Reviews collection
    }],
    photos: [{
        type: String // URLs to uploaded images of the property
    }],
    model3D: {
        type: String, // URL to 3D model of the PG
        default: null
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Property = mongoose.model("Property", PropertySchema);
export default Property;
