"use client"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Camera, Save, User } from "lucide-react"
import Layout from "../../components/Layout"

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState(null)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(URL.createObjectURL(file))
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-sm text-blue-600 hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold">Profile Management</h1>
          <p className="text-gray-500">Update your profile information and preferences</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[250px_1fr]">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 text-center">
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                  {profileImage ? (
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-full w-full p-4 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="sr-only">Upload profile picture</span>
                </label>
              </div>
              <div>
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">Buyer Account</p>
              </div>
            </div>

            <nav className="space-y-1 rounded-lg border bg-white overflow-hidden">
              <button
                className={`w-full px-4 py-3 text-left text-sm font-medium ${
                  activeTab === "personal" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Information
              </button>
              <button
                className={`w-full px-4 py-3 text-left text-sm font-medium ${
                  activeTab === "company" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("company")}
              >
                Company Details
              </button>
              <button
                className={`w-full px-4 py-3 text-left text-sm font-medium ${
                  activeTab === "security" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
              <button
                className={`w-full px-4 py-3 text-left text-sm font-medium ${
                  activeTab === "preferences" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("preferences")}
              >
                Preferences
              </button>
            </nav>
          </div>

          <div className="rounded-lg border bg-white p-6">
            {activeTab === "personal" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input id="first-name" defaultValue="John" className="w-full rounded-md border px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input id="last-name" defaultValue="Doe" className="w-full rounded-md border px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        readOnly
                      />
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Verified
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      defaultValue="123 Business Street, Suite 100, New York, NY 10001"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "company" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Company Details</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                      Company name
                    </label>
                    <input
                      id="company-name"
                      defaultValue="Acme Corporation"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select
                      id="industry"
                      defaultValue="technology"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="manufacturing">Manufacturing</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="logistics">Logistics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company-size" className="block text-sm font-medium text-gray-700">
                      Company size
                    </label>
                    <select
                      id="company-size"
                      defaultValue="medium"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="small">1-50 employees</option>
                      <option value="medium">51-200 employees</option>
                      <option value="large">201-1000 employees</option>
                      <option value="enterprise">1000+ employees</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="company-description" className="block text-sm font-medium text-gray-700">
                      Company description
                    </label>
                    <textarea
                      id="company-description"
                      rows={4}
                      defaultValue="Acme Corporation is a leading technology company specializing in innovative solutions for businesses worldwide."
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      id="website"
                      type="url"
                      defaultValue="https://www.acmecorp.com"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tax-id" className="block text-sm font-medium text-gray-700">
                      Tax ID / VAT Number
                    </label>
                    <input
                      id="tax-id"
                      defaultValue="US123456789"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Security</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current password
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <input id="new-password" type="password" className="w-full rounded-md border px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm new password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-4 rounded-md border p-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Status: <span className="text-red-600">Disabled</span>
                    </span>
                    <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                      Enable
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Save className="h-4 w-4" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Preferences</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-inquiries" className="text-sm">
                        New inquiry notifications
                      </label>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" id="notify-inquiries" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-quotations" className="text-sm">
                        Quotation updates
                      </label>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" id="notify-quotations" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-messages" className="text-sm">
                        New messages
                      </label>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" id="notify-messages" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-marketing" className="text-sm">
                        Marketing and promotional emails
                      </label>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" id="notify-marketing" className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language & Region</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <select id="language" defaultValue="en" className="w-full rounded-md border px-3 py-2 text-sm">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        defaultValue="america_new_york"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                      >
                        <option value="america_new_york">America/New York (UTC-5)</option>
                        <option value="america_los_angeles">America/Los Angeles (UTC-8)</option>
                        <option value="europe_london">Europe/London (UTC+0)</option>
                        <option value="asia_tokyo">Asia/Tokyo (UTC+9)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfileManagement

