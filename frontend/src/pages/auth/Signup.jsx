"use client";
import React from "react";
import { Link } from "react-router-dom";
import { Building } from "lucide-react";
import Layout from "../../components/Layout";

const Signup = () => {
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

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Firm Name</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="example@domain.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  placeholder="1234567890"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 shadow-md"
            >
              Create Account
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
