import React, { useState } from "react";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "Student",
    gender: "Male",
    dateOfBirth: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
            <p className="text-gray-500">Sign up to get started</p>
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input type="text" name="username" className="w-full p-3 border rounded-lg bg-white" placeholder="yourusername" value={formData.username} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input type="text" name="fullName" className="w-full p-3 border rounded-lg bg-white" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input type="email" name="email" className="w-full p-3 border rounded-lg bg-white" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" className="w-full p-3 border rounded-lg bg-white" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
