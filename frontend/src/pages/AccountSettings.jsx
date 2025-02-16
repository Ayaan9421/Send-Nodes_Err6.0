import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("Account Details");
  const user = {
    email: "aminsolkar5@gmail.com",
    firstName: "Amin",
    lastName: "Solkar",
    website: "https://profilepress.net",
    facebook: "https://www.facebook.com/profilepress",
    twitter: "https://twitter.com/profilepress",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe"
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
        <img src={user.profilePic} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
        <ul className="space-y-4">
          {["Dashboard", "Account Details", "Change Password", "Logout"].map((item) => (
            
            
            <Link to={'/'}>
            <li
              key={item}
              className={`p-3 rounded-lg cursor-pointer text-gray-700 font-semibold text-center ${
                activeTab === item ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(item)}
            >
                {item}
              
            </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white p-6 ml-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Email Address</label>
            <input type="email" value={user.email} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">First Name</label>
              <input type="text" value={user.firstName} className="w-full p-2 border rounded bg-gray-100" disabled />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Last Name</label>
              <input type="text" value={user.lastName} className="w-full p-2 border rounded bg-gray-100" disabled />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Website</label>
            <input type="text" value={user.website} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Facebook</label>
            <input type="text" value={user.facebook} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Twitter</label>
            <input type="text" value={user.twitter} className="w-full p-2 border rounded bg-gray-100" disabled />
          </div>
        </div>
        <button className="mt-6 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
