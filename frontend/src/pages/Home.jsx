import React from "react";
import PropertyUpload from "../components/PropertyUpload";

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Transparent Student Housing</h1>
            <PropertyUpload />
        </div>
    );
};

export default Home;
