"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building } from "lucide-react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    firmName: "",
    email: "",
    phone: "",
    password: "",
    verificationMethod: "email",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await register(form);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => navigate("/auth/login"), 1500);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
        <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl transition-all">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Building className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Create an Account</h1>
            <p className="mt-2 text-base text-gray-500">Fill in the details to get started</p>
          </div>
          {error && <div className="mt-4 text-center text-red-600 font-semibold text-sm">{error}</div>}
          {success && <div className="mt-4 text-center text-green-600 font-semibold text-sm">Registration successful! Redirecting...</div>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Firm Name</label>
                <input
                  type="text"
                  name="firmName"
                  placeholder="Company Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={form.firmName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@domain.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter a password"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Verification Method</label>
                <select
                  name="verificationMethod"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={form.verificationMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 shadow-md"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
