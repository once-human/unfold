"use client"
import React from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, FileUp, Info, Trash2 } from "lucide-react"
import Layout from "../../components/Layout"

// Mock inquiry data
const mockInquiry = {
  id: "INQ-001",
  title: "Industrial-grade steel bolts, 10mm, 1000 units",
  category: "Raw Materials",
  subcategory: "Metals",
  description:
    "We are looking for a supplier of industrial-grade steel bolts for our manufacturing process. The bolts should be 10mm in diameter and meet ISO 898-1 standards. We require 1,000 units initially with potential for regular orders.",
  specifications: [
    { key: "Material", value: "Steel" },
    { key: "Diameter", value: "10mm" },
    { key: "Standard", value: "ISO 898-1" },
    { key: "Finish", value: "Zinc-plated" },
  ],
  budget: "$1,000 - $1,500",
  quantity: "1,000 units",
  location: "United States",
  postedDate: "2023-07-15",
  deadline: "2023-07-30",
  buyerInfo: {
    name: "TechManufacturing Inc.",
    verified: true,
    rating: 4.8,
    memberSince: "2020",
  },
}

const SubmitQuotation = () => {
  const { inquiryId } = useParams()
  const [files, setFiles] = useState([])
  const [pricingType, setPricingType] = useState("fixed")
  const [includeShipping, setIncludeShipping] = useState(false)

  // In a real app, you would fetch the inquiry data based on the ID
  const inquiry = mockInquiry

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitting quotation for inquiry:", inquiryId)
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link
            to="/supplier/view-inquiries"
            className="inline-flex items-center text-sm text-blue-600 hover:underline mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inquiries
          </Link>
          <h1 className="text-3xl font-bold">Submit Quotation</h1>
          <p className="text-gray-500">Respond to inquiry #{inquiryId} with your best offer</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Pricing Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Pricing Type</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="fixed"
                          name="pricing-type"
                          value="fixed"
                          checked={pricingType === "fixed"}
                          onChange={() => setPricingType("fixed")}
                          className="h-4 w-4"
                        />
                        <label htmlFor="fixed" className="text-sm text-gray-700">
                          Fixed Price (Total)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="per-unit"
                          name="pricing-type"
                          value="per-unit"
                          checked={pricingType === "per-unit"}
                          onChange={() => setPricingType("per-unit")}
                          className="h-4 w-4"
                        />
                        <label htmlFor="per-unit" className="text-sm text-gray-700">
                          Per Unit Price
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        {pricingType === "fixed" ? "Total Price" : "Price Per Unit"}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                        <input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full rounded-md border pl-7 px-3 py-2 text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                        Currency
                      </label>
                      <select id="currency" className="w-full rounded-md border px-3 py-2 text-sm" defaultValue="usd">
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="inr">INR (₹)</option>
                        <option value="cny">CNY (¥)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="include-shipping" className="text-sm font-medium text-gray-700">
                        Include Shipping Cost
                      </label>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          id="include-shipping"
                          className="peer sr-only"
                          checked={includeShipping}
                          onChange={() => setIncludeShipping(!includeShipping)}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    </div>
                    {includeShipping && (
                      <div className="mt-2">
                        <label htmlFor="shipping-cost" className="block text-sm font-medium text-gray-700">
                          Shipping Cost
                        </label>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                          <input
                            id="shipping-cost"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full rounded-md border pl-7 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      id="product-name"
                      placeholder="e.g., Industrial Steel Bolts - 10mm"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Provide a detailed description of your product..."
                      rows={4}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity Available
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 1000"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lead-time" className="block text-sm font-medium text-gray-700">
                        Lead Time (Days)
                      </label>
                      <input
                        id="lead-time"
                        type="number"
                        placeholder="e.g., 14"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">
                      Warranty/Guarantee (Optional)
                    </label>
                    <input
                      id="warranty"
                      placeholder="e.g., 1 year manufacturer warranty"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
                      Terms & Conditions
                    </label>
                    <textarea
                      id="terms"
                      placeholder="Any specific terms or conditions for this quotation..."
                      rows={3}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                      Attachments
                    </label>
                    <div className="flex items-center gap-2">
                      <input id="attachments" type="file" multiple className="hidden" onChange={handleFileChange} />
                      <label
                        htmlFor="attachments"
                        className="flex h-10 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <FileUp className="h-4 w-4" />
                        Upload Files
                      </label>
                      <span className="text-sm text-gray-500">Product specs, certifications, etc.</span>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between rounded-md border p-2">
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove file</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="validity" className="block text-sm font-medium text-gray-700">
                      Quotation Validity (Days)
                    </label>
                    <input
                      id="validity"
                      type="number"
                      placeholder="e.g., 30"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button type="button" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Submit Quotation
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Inquiry Details</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Title</h4>
                  <p className="text-sm">{inquiry.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Category</h4>
                  <p className="text-sm">
                    {inquiry.category} / {inquiry.subcategory}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Quantity</h4>
                  <p className="text-sm">{inquiry.quantity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Budget</h4>
                  <p className="text-sm">{inquiry.budget}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Deadline</h4>
                  <p className="text-sm">{inquiry.deadline}</p>
                </div>
                <div className="pt-2">
                  <Link
                    to={`/inquiry-management/inquiry-details/${inquiry.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View full inquiry details
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Buyer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Company</h4>
                  <div className="flex items-center">
                    <span className="text-sm">{inquiry.buyerInfo.name}</span>
                    {inquiry.buyerInfo.verified && (
                      <span className="ml-1 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Rating</h4>
                  <span className="text-sm">{inquiry.buyerInfo.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Member Since</h4>
                  <span className="text-sm">{inquiry.buyerInfo.memberSince}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-blue-50 p-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Tips for a Successful Quotation</h3>
                  <ul className="mt-2 space-y-1 text-xs text-blue-700">
                    <li>Be clear and specific about your product details</li>
                    <li>Include all relevant costs to avoid surprises later</li>
                    <li>Highlight your unique selling points</li>
                    <li>Respond promptly to any follow-up questions</li>
                    <li>Attach relevant certifications or product specifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SubmitQuotation

