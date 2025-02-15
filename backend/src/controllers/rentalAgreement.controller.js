import RentalAgreement from "../models/agreement.model.js";

export const getAgreements = async (req, res) => {
    try {
        const agreements = await RentalAgreement.find().populate("studentId", "name").populate("propertyId", "name");
        res.json(agreements);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const createAgreement = async (req, res) => {
    try {
        const agreement = new RentalAgreement({ ...req.body, studentId: req.user.id });
        await agreement.save();
        res.status(201).json(agreement);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};