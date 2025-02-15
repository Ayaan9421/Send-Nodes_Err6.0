import React, { useState } from "react";
import "./PropVer.css";

const PropVer = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyAddress: "",
    city: "",
    pin: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    furnished: "",
    availableDate: "",
    ownershipProof: null,
    landlordLicense: null,
    propertyImages: [],
    amenities: [],
    rules: "",
    rentAmount: "",
    depositAmount: "",
    paymentMethods: [],
    leaseDuration: "",
    landlordContact: "",
    contactMethod: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "propertyImages") {
      setFormData({ ...formData, propertyImages: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="form-container">
      <h2>Property Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Property Name (Optional)</label>
          <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Property Address</label>
          <input type="text" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Pin</label>
          <input type="text" name="pin" value={formData.pin} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Property Type</label>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Shared Housing">Shared Housing</option>
            <option value="Dorm">Dorm</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number of Bedrooms</label>
          <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Number of Bathrooms</label>
          <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Furnished?</label>
          <select name="furnished" value={formData.furnished} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Available from</label>
          <input type="date" name="availableDate" value={formData.availableDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Proof of Ownership</label>
          <input type="file" name="ownershipProof" onChange={handleFileChange} required />
        </div>

        <div className="form-group">
          <label>Landlord License (if applicable)</label>
          <input type="file" name="landlordLicense" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Monthly Rent (INR)</label>
          <input type="number" name="rentAmount" value={formData.rentAmount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Deposit Amount (INR)</label>
          <input type="number" name="depositAmount" value={formData.depositAmount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Landlord Contact Info</label>
          <input type="text" name="landlordContact" value={formData.landlordContact} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default PropVer;
