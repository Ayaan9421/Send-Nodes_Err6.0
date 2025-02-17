import React, { useEffect, useState } from "react";
import axios from "../lib/axios"; // Axios instance for API calls

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/me"); // Backend API to get logged-in user data
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-600">No user data available.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Email Address</label>
          <input type="email" value={user.email} className="w-full p-2 border rounded bg-gray-100" disabled />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input type="text" value={user.fullName} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input type="text" value={user.username} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Date of Birth</label>
            <input type="date" value={user.dateOfBirth.split("T")[0]} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Gender</label>
            <input type="text" value={user.gender} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Role</label>
          <input type="text" value={user.role} className="w-full p-2 border rounded bg-gray-100" disabled />
        </div>
      </div>

      {/* Student or Landlord Specific Fields */}
      {user.role === "Student" && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Details</h3>
          <div>
            <label className="block font-medium text-gray-700">College Name</label>
            <input type="text" value={user.student?.collegeName || "N/A"} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
          <div>
            <label className="block font-medium text-gray-700">College ID Proof</label>
            <a href={user.student?.collegeIdProofUrl} target="_blank" className="text-blue-600 underline">
              View ID Proof
            </a>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Current PG</label>
            <input type="text" value={user.student?.currentPG || "Not in a PG"} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
        </div>
      )}

      {user.role === "Landlord" && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Landlord Details</h3>
          <div>
            <label className="block font-medium text-gray-700">Government ID Proof</label>
            <a href={user.landlord?.governmentIdProofUrl} target="_blank" className="text-blue-600 underline">
              View ID Proof
            </a>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Properties Owned</label>
            <input type="text" value={user.landlord?.propertiesOwned.length || "No properties"} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Verification Status</label>
            <input type="text" value={user.landlord?.verified ? "Verified" : "Not Verified"} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
        </div>
      )}

      <button className="mt-6 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
        Edit Profile
      </button>
    </div>
  );
};

export default AccountSettings;
