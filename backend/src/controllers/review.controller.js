import Review from "../models/review.model.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("studentId", "name").populate("propertyId", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const createReview = async (req, res) => {
    try {
        const review = new Review({ ...req.body, studentId: req.user.id });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
