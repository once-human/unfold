// ...rest of your imports
"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building } from "lucide-react";
import Layout from "../../components/Layout";

const Login = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState("");

  const sendOtp = (e) => {
    e.preventDefault();
    if (!inputValue) {
      alert("Please enter your email or phone number.");
      return;
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setOtpSent(true);
    alert(`OTP has been sent to ${inputValue}: ${otpCode}`);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (usePassword) {
      if (inputValue && password) {
        setLoginSuccess(true);
      } else {
        alert("Please enter your credentials.");
      }
    } else {
      if (otp === generatedOtp) {
        setLoginSuccess(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto flex h-screen w-full items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
          <div className="text-center space-y-2">
            <Building className="h-10 w-10 text-blue-600 mx-auto" />
            <h1 className="text-2xl font-bold">Sign In</h1>
          </div>

          {loginSuccess ? (
            <div className="mt-6 text-center text-green-600 font-semibold text-lg">
              ✅ Login Successful! 🎉
            </div>
          ) : (
            <>
              <form onSubmit={otpSent && !usePassword ? handleLogin : sendOtp} className="mt-6 space-y-4">
                {/* Email / Phone Toggle */}
                <div className="flex rounded-md border overflow-hidden">
                  <button
                    type="button"
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeTab === "email"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("email")}
                    disabled={otpSent && !usePassword}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 text-center text-sm font-medium ${
                      activeTab === "phone"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab("phone")}
                    disabled={otpSent && !usePassword}
                  >
                    Phone
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-2">
                  <label htmlFor="input" className="block text-sm font-medium text-gray-700">
                    {activeTab === "email" ? "Email" : "Phone Number"}
                  </label>
                  <input
                    id="input"
                    type={activeTab === "email" ? "email" : "tel"}
                    placeholder={activeTab === "email" ? "name@example.com" : "+1 (555) 000-0000"}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    disabled={otpSent && !usePassword}
                  />
                </div>

                {/* Password or OTP */}
                {usePassword ? (
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  otpSent && (
                    <div className="space-y-2">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                        Enter OTP
                      </label>
                      <input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                  )
                )}

                {/* Toggle Method */}
                <div className="text-sm text-center">
                  {usePassword ? (
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setUsePassword(false);
                        setOtpSent(false);
                        setOtp("");
                        setPassword("");
                      }}
                    >
                      Use OTP instead
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setUsePassword(true);
                        setOtpSent(false);
                        setOtp("");
                        setPassword("");
                      }}
                    >
                      Login with password instead
                    </button>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  {usePassword ? "Login" : otpSent ? "Verify OTP" : "Send OTP"}
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">OR</span>
                </div>
              </div>

              {/* Social Logins */}
              <div className="flex flex-col gap-3">
                {/* Google */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  Continue with Google
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/157810/facebook.svg"
                    alt="Facebook"
                    className="h-5 w-5"
                  />
                  Continue with Facebook
                </button>
              </div>
            </>
          )}

          {/* Sign up Link */}
          {!loginSuccess && (
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
