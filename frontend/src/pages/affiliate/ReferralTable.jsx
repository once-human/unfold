import React, { useState } from "react";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react";

// Mock data for referrals
const referrals = [
  {
    id: "REF-001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-10-15",
    plan: "Premium",
    status: "active",
    commission: "$45.00",
  },
  {
    id: "REF-002",
    name: "Michael Chen",
    email: "m.chen@example.com",
    date: "2023-10-12",
    plan: "Basic",
    status: "active",
    commission: "$15.00",
  },
  {
    id: "REF-003",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    date: "2023-10-10",
    plan: "Premium",
    status: "active",
    commission: "$45.00",
  },
  {
    id: "REF-004",
    name: "James Rodriguez",
    email: "james.r@example.com",
    date: "2023-10-05",
    plan: "Pro",
    status: "inactive",
    commission: "$30.00",
  },
  {
    id: "REF-005",
    name: "Olivia Smith",
    email: "olivia.s@example.com",
    date: "2023-09-28",
    plan: "Basic",
    status: "active",
    commission: "$15.00",
  },
];

const ReferralTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Referrals");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All Referrals" ||
      (filter === "Active Plans" && referral.status === "active") ||
      (filter === "Inactive Plans" && referral.status === "inactive") ||
      (filter === "Premium Plans" && referral.plan === "Premium") ||
      (filter === "Basic Plans" && referral.plan === "Basic");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search referrals..."
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-100"
          >
            Filter <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
              {[
                "All Referrals",
                "Active Plans",
                "Inactive Plans",
                "Premium Plans",
                "Basic Plans",
              ].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 w-[100px] font-semibold">ID</th>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">
                <div className="flex items-center">
                  Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </th>
              <th className="p-3 font-semibold">Plan</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold text-right">Commission</th>
              <th className="p-3 w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((referral) => (
                <tr key={referral.id} className="border-t">
                  <td className="p-3 font-medium">{referral.id}</td>
                  <td className="p-3">{referral.name}</td>
                  <td className="p-3">{referral.email}</td>
                  <td className="p-3">{new Date(referral.date).toLocaleDateString()}</td>
                  <td className="p-3">{referral.plan}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        referral.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {referral.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">{referral.commission}</td>
                  <td className="p-3 text-right">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="h-24 text-center text-gray-500">
                  No referrals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralTable;
