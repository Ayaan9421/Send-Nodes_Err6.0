import React, { useState } from "react";
import "./StuVer.css";

const StuVer = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [school, setSchool] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [graduationMonth, setGraduationMonth] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [agreement, setAgreement] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [feeReceipt, setFeeReceipt] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!fullName) newErrors.fullName = "Full name is required.";
    if (!email) newErrors.email = "Email address is required.";
    if (!institution) newErrors.institution = "Institution type must be selected.";
    if (!school) newErrors.school = "Please select your college.";
    if (!fieldOfStudy) newErrors.fieldOfStudy = "Field of study must be selected.";
    if (!graduationMonth) newErrors.graduationMonth = "Select graduation month.";
    if (!graduationYear) newErrors.graduationYear = "Select graduation year.";
    if (!feeReceipt) newErrors.feeReceipt = "Upload your fee receipt.";
    if (!studentId) newErrors.studentId = "Upload your student ID.";
    if (!agreement) newErrors.agreement = "You must select an agreement option.";
    if (!eligibility) newErrors.eligibility = "You must confirm your student status.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="form-container">
      <h1 className="bold-heading">STUDENT VERIFICATION DETAILS</h1>
      
      <form onSubmit={handleSubmit}>
        <label>Enter your full name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        
        <label>Enter your student email address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your student email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label>What type of institution do you attend?</label>
        <select value={institution} onChange={(e) => setInstitution(e.target.value)}>
          <option value="">Select type of institution</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
          <option value="Junior College">Junior College</option>
        </select>
        {errors.institution && <p className="error-message">{errors.institution}</p>}

        <button type="submit" className="submit-btn" disabled={!agreement || !eligibility}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default StuVer;
