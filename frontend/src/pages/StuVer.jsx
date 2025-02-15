import React, { useState } from "react";
import axios from "axios";
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
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
  
    if (!school) newErrors.school = "College name is required.";
    if (!studentId) newErrors.studentId = "Upload your student ID.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const formData = new FormData();
    formData.append("collegeName", school);
    formData.append("studentId", studentId); // Uploading only studentId
  
    try {
      const token = localStorage.getItem("token"); // ✅ Retrieve JWT token
  
      const response = await axios.post("http://localhost:5000/api/verify/student", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Send token for authentication
        },
      });
  
      console.log("Server Response:", response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage(error.response?.data?.error || "Error submitting form.");
    }
  };
  

  return (
    <div className="form-container">
      <h1>STUDENT VERIFICATION DETAILS</h1>
      {message && <p className="success-message">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <label>What type of institution do you attend?</label>
        <select value={institution} onChange={(e) => setInstitution(e.target.value)}>
          <option value="">Select type of institution</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
          <option value="Junior College">Junior College</option>
        </select>
        {errors.institution && <p className="error-message">{errors.institution}</p>}

        <label>What is your college's name?</label>
        <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Enter your college name" />
        {errors.school && <p className="error-message">{errors.school}</p>}

        <label>What is your primary field of study?</label>
        <input type="text" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} placeholder="Enter your field of study" />
        {errors.fieldOfStudy && <p className="error-message">{errors.fieldOfStudy}</p>}

        <label>Expected graduation date:</label>
        <div className="graduation-date">
          <select value={graduationMonth} onChange={(e) => setGraduationMonth(e.target.value)}>
            <option value="">Month</option>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)}>
            <option value="">Year</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <label>Upload fee receipt:</label>
        <input type="file" onChange={(e) => setFeeReceipt(e.target.files[0])} />
        {errors.feeReceipt && <p className="error-message">{errors.feeReceipt}</p>}

        <label>Upload student ID:</label>
        <input type="file" onChange={(e) => setStudentId(e.target.files[0])} />
        {errors.studentId && <p className="error-message">{errors.studentId}</p>}

        <p>By submitting this form, I agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.</p>

        <div className="radio-group">
          <label>
            <input type="radio" name="agreement" value="agree" checked={agreement === "agree"} onChange={() => setAgreement("agree")} />
            Yes, I agree
          </label>
          <label>
            <input type="radio" name="agreement" value="disagree" checked={agreement === "disagree"} onChange={() => setAgreement("disagree")} />
            No, I do not agree
          </label>
        </div>
        {errors.agreement && <p className="error-message">{errors.agreement}</p>}

        <p>I confirm that I am a student enrolled at the institution I provided.</p>

        <div className="radio-group">
          <label>
            <input type="radio" name="eligibility" value="agree" checked={eligibility === "agree"} onChange={() => setEligibility("agree")} />
            Yes, I agree
          </label>
          <label>
            <input type="radio" name="eligibility" value="disagree" checked={eligibility === "disagree"} onChange={() => setEligibility("disagree")} />
            No, I do not agree
          </label>
        </div>
        {errors.eligibility && <p className="error-message">{errors.eligibility}</p>}

        <button type="submit" className="submit-btn" disabled={!agreement || !eligibility}>Submit</button>
      </form>
    </div>
  );
};

export default StuVer;
