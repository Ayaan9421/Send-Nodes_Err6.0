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
      <h1>STUDENT VERIFICATION DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter your full name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}

        <label>Enter your student email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your student email" />
        {errors.email && <p className="error-message">{errors.email}</p>}

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

        <p>
          By submitting this form, I agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
        </p>

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

        <p>
          I confirm that I am a student enrolled at the institution I provided.
        </p>

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
