"use client"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, Download, FileText, MapPin, MessageSquare, User } from "lucide-react"
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
  attachments: [
    { name: "Technical_Specifications.pdf", size: "1.2 MB" },
    { name: "Reference_Image.jpg", size: "450 KB" },
  ],
  buyerInfo: {
    name: "TechManufacturing Inc.",
    verified: true,
    rating: 4.8,
    memberSince: "2020",
  },
  status: "open",
  quotations: 5,
}

const InquiryDetails = () => {
  const { id } = useParams()

  // In a real app, you would fetch the inquiry data based on the ID
  const inquiry = mockInquiry

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8">
          <Link
            to="/supplier/view-inquiries"
            className="inline-flex items-center text-sm text-blue-600 hover:underline mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inquiries
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{inquiry.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {inquiry.category}
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                  ID: {inquiry.id}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {inquiry.location}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Posted: {inquiry.postedDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/supplier/submit-quotation/${inquiry.id}`}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Submit Quotation
              </Link>
              <button className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50">Save</button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Inquiry Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{inquiry.description}</p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Specifications</h3>
              <div className="overflow-hidden rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Specification</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {inquiry.specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 font-medium">{spec.key}</td>
                        <td className="px-4 py-2">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {inquiry.attachments.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-6 mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {inquiry.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button className="rounded-md p-1 hover:bg-gray-100">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Questions & Answers</h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-500">No questions have been asked yet.</p>
                <button className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50">
                  <MessageSquare className="h-4 w-4" />
                  Ask a Question
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Inquiry Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {inquiry.status === "open" ? "Open" : "Closed"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Quantity:</span>
                  <span className="text-sm font-medium">{inquiry.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Budget:</span>
                  <span className="text-sm font-medium">{inquiry.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Deadline:</span>
                  <span className="text-sm font-medium">{inquiry.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Quotations:</span>
                  <span className="text-sm font-medium">{inquiry.quotations}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Buyer Information</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-medium">{inquiry.buyerInfo.name}</p>
                    {inquiry.buyerInfo.verified && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Member since {inquiry.buyerInfo.memberSince}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{inquiry.buyerInfo.rating}/5</span>
                    <div className="ml-1 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(inquiry.buyerInfo.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Inquiries Posted:</span>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Response Rate:</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t">
                <button className="w-full rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50">
                  View Buyer Profile
                </button>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Similar Inquiries</h3>
              <div className="space-y-3">
                <Link to="#" className="block rounded-md border p-3 hover:bg-gray-50">
                  <h4 className="font-medium">Steel bolts, 8mm, 2000 units</h4>
                  <p className="text-xs text-gray-500 mt-1">Posted 3 days ago</p>
                </Link>
                <Link to="#" className="block rounded-md border p-3 hover:bg-gray-50">
                  <h4 className="font-medium">Industrial fasteners assortment</h4>
                  <p className="text-xs text-gray-500 mt-1">Posted 5 days ago</p>
                </Link>
                <Link to="#" className="block rounded-md border p-3 hover:bg-gray-50">
                  <h4 className="font-medium">Stainless steel nuts and bolts</h4>
                  <p className="text-xs text-gray-500 mt-1">Posted 1 week ago</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default InquiryDetails

