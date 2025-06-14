"use client"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Filter, Search, Star } from "lucide-react"
import Layout from "../../components/Layout"

// Mock data for inquiries
const inquiries = [
  {
    id: "INQ-001",
    title: "Industrial-grade steel bolts, 10mm, 1000 units",
    category: "Raw Materials",
    subcategory: "Metals",
    budget: "$1,000 - $1,500",
    quantity: "1,000 units",
    location: "United States",
    postedDate: "2023-07-15",
    deadline: "2023-07-30",
    status: "open",
    isVerified: true,
    isFavorite: false,
  },
  {
    id: "INQ-002",
    title: "PCB Assembly for IoT Devices, 500 units",
    category: "Electronics",
    subcategory: "Components",
    budget: "$5,000 - $7,500",
    quantity: "500 units",
    location: "Germany",
    postedDate: "2023-07-14",
    deadline: "2023-07-29",
    status: "open",
    isVerified: true,
    isFavorite: true,
  },
  {
    id: "INQ-003",
    title: "Food-grade plastic containers, 5000 units",
    category: "Packaging",
    subcategory: "Plastics",
    budget: "$2,500 - $3,000",
    quantity: "5,000 units",
    location: "Canada",
    postedDate: "2023-07-13",
    deadline: "2023-07-28",
    status: "open",
    isVerified: false,
    isFavorite: false,
  },
  {
    id: "INQ-004",
    title: "Custom printed circuit boards, 200 units",
    category: "Electronics",
    subcategory: "PCB",
    budget: "$1,800 - $2,200",
    quantity: "200 units",
    location: "Japan",
    postedDate: "2023-07-12",
    deadline: "2023-07-27",
    status: "open",
    isVerified: true,
    isFavorite: false,
  },
  {
    id: "INQ-005",
    title: "Industrial cleaning chemicals, 500 liters",
    category: "Chemicals",
    subcategory: "Industrial",
    budget: "$3,000 - $3,500",
    quantity: "500 liters",
    location: "Australia",
    postedDate: "2023-07-11",
    deadline: "2023-07-26",
    status: "open",
    isVerified: true,
    isFavorite: false,
  },
]

const ViewInquiries = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredInquiries, setFilteredInquiries] = useState(inquiries)
  const [favorites, setFavorites] = useState(inquiries.filter((inq) => inq.isFavorite))
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const toggleFavorite = (id) => {
    setFilteredInquiries(
      filteredInquiries.map((inq) => (inq.id === id ? { ...inq, isFavorite: !inq.isFavorite } : inq)),
    )

    // Update favorites tab
    const updatedInquiry = filteredInquiries.find((inq) => inq.id === id)
    if (updatedInquiry) {
      if (!updatedInquiry.isFavorite) {
        setFavorites([...favorites, { ...updatedInquiry, isFavorite: true }])
      } else {
        setFavorites(favorites.filter((inq) => inq.id !== id))
      }
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const filtered = inquiries.filter(
      (inq) =>
        inq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.subcategory.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredInquiries(filtered)
  }

  const resetFilters = () => {
    setFilteredInquiries(inquiries)
    setSearchTerm("")
    setShowFilters(false)
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Inquiries</h1>
          <p className="text-gray-500">Find and respond to business inquiries matching your capabilities</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2">
              <input
                placeholder="Search by keyword, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 rounded-md border px-3 py-2 text-sm"
              />
              <button type="submit" className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </button>
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <select className="rounded-md border px-3 py-2 text-sm" defaultValue="newest">
                <option value="newest">Sort by: Newest</option>
                <option value="deadline">Sort by: Deadline</option>
                <option value="budget-high">Sort by: Budget (High to Low)</option>
                <option value="budget-low">Sort by: Budget (Low to High)</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select id="category-filter" className="w-full rounded-md border px-3 py-2 text-sm">
                    <option value="all">All Categories</option>
                    <option value="raw-materials">Raw Materials</option>
                    <option value="electronics">Electronics</option>
                    <option value="packaging">Packaging</option>
                    <option value="chemicals">Chemicals</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <select id="location-filter" className="w-full rounded-md border px-3 py-2 text-sm">
                    <option value="all">All Locations</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="australia">Australia</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget-filter" className="block text-sm font-medium text-gray-700">
                    Budget Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      id="min-budget-filter"
                      type="number"
                      placeholder="Min"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                    <input
                      id="max-budget-filter"
                      type="number"
                      placeholder="Max"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Additional Filters</label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="verified" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="verified" className="text-sm text-gray-700">
                      Verified buyers only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="new" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="new" className="text-sm text-gray-700">
                      New inquiries (last 24h)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="urgent" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="urgent" className="text-sm text-gray-700">
                      Urgent inquiries
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={resetFilters}
                  className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                >
                  Reset
                </button>
                <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "all" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Inquiries
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "matched"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("matched")}
              >
                Matched
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "favorites"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("favorites")}
              >
                Favorites
              </button>
            </div>

            {activeTab === "all" && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="rounded-lg border bg-white overflow-hidden shadow-sm">
                    <div className="p-4 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{inquiry.title}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {inquiry.isVerified && (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                Verified Buyer
                              </span>
                            )}
                            <span className="text-xs text-gray-500">ID: {inquiry.id}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(inquiry.id)}
                          className={`p-1 ${inquiry.isFavorite ? "text-yellow-500" : "text-gray-400"}`}
                        >
                          <Star className="h-5 w-5" fill={inquiry.isFavorite ? "currentColor" : "none"} />
                          <span className="sr-only">
                            {inquiry.isFavorite ? "Remove from favorites" : "Add to favorites"}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="px-4 pb-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Category:</span>
                          <span>
                            {inquiry.category} / {inquiry.subcategory}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Budget:</span>
                          <span>{inquiry.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Quantity:</span>
                          <span>{inquiry.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span>{inquiry.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Deadline:</span>
                          <span>{inquiry.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border-t">
                      <Link
                        to={`/supplier/submit-quotation/${inquiry.id}`}
                        className="inline-flex w-full items-center justify-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Submit Quotation
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "matched" && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No matched inquiries yet</h3>
                <p className="max-w-md text-gray-500">
                  Complete your supplier profile with detailed capabilities to receive matched inquiries based on your
                  expertise.
                </p>
                <Link
                  to="/supplier/profile"
                  className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Update Profile
                </Link>
              </div>
            )}

            {activeTab === "favorites" && (
              <>
                {favorites.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((inquiry) => (
                      <div key={inquiry.id} className="rounded-lg border bg-white overflow-hidden shadow-sm">
                        <div className="p-4 pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{inquiry.title}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                {inquiry.isVerified && (
                                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    Verified Buyer
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">ID: {inquiry.id}</span>
                              </div>
                            </div>
                            <button onClick={() => toggleFavorite(inquiry.id)} className="p-1 text-yellow-500">
                              <Star className="h-5 w-5" fill="currentColor" />
                              <span className="sr-only">Remove from favorites</span>
                            </button>
                          </div>
                        </div>
                        <div className="px-4 pb-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Category:</span>
                              <span>
                                {inquiry.category} / {inquiry.subcategory}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Budget:</span>
                              <span>{inquiry.budget}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Quantity:</span>
                              <span>{inquiry.quantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Location:</span>
                              <span>{inquiry.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Deadline:</span>
                              <span>{inquiry.deadline}</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 border-t">
                          <Link
                            to={`/supplier/submit-quotation/${inquiry.id}`}
                            className="inline-flex w-full items-center justify-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                          >
                            Submit Quotation
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-blue-100 p-4">
                      <Star className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">No favorite inquiries yet</h3>
                    <p className="max-w-md text-gray-500">
                      Save inquiries to your favorites for quick access and tracking.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ViewInquiries

