"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Building } from "lucide-react"
import Layout from "../../components/Layout"

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(30)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleChange = (index, value) => {
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

  const handleResendOTP = () => {
    setIsResending(true)
    // Simulate API call
    setTimeout(() => {
      setTimeLeft(30)
      setIsResending(false)
    }, 1000)
  }

  const handleVerify = () => {
    const otpValue = otp.join("")
    console.log("Verifying OTP:", otpValue)
    // Add verification logic here
  }

  return (
    <Layout>
      <div className="container mx-auto flex h-screen w-full items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <Building className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Verify Your Account</h1>
            <p className="text-sm text-gray-500">
              We've sent a verification code to your email/phone. Enter the code below to continue.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-12 w-12 rounded-md border text-center text-lg font-bold"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in <span className="font-medium">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-sm text-blue-600 hover:underline disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              )}
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.some((digit) => !digit)}
              className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Verify
            </button>

            <div className="text-center">
              <Link to="/auth/login" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OTPVerification

