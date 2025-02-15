import Property from "../models/property.model.js";

export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate("owner", "name email");
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const createProperty = async (req, res) => {
    try {
        const property = new Property({ ...req.body, owner: req.user.id });
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
