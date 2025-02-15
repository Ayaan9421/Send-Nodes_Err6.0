import React, { useState } from 'react';

const StudentVerificationForm = ({ userId }) => {
  const [collegeName, setCollegeName] = useState('');
  const [collegeIdProof, setCollegeIdProof] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCollegeIdProof(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('collegeName', collegeName); // Append string data
    formData.append('collegeIdProof', collegeIdProof); // Append file data
    formData.append('userId', userId); // Append userId as a foreign key

    try {
      // Send the FormData to the backend
      const response = await fetch('http://localhost:5000/api/verify/student', {
        method: 'POST',
        body: formData, // No need to set Content-Type header manually
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Student verification submitted successfully!');
      } else {
        setMessage(data.message || 'Failed to submit verification.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Student Verification Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
            College Name:
          </label>
          <input
            type="text"
            id="collegeName"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="collegeIdProof" className="block text-sm font-medium text-gray-700">
            College ID Proof (PDF/Image):
          </label>
          <input
            type="file"
            id="collegeIdProof"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default StudentVerificationForm;