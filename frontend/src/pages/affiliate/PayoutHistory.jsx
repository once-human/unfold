import React from "react";

// Mock data for payout history
const payouts = [
  {
    id: "PAY-001",
    date: "2023-10-01",
    amount: "$320.00",
    method: "Bank Transfer",
    status: "completed",
  },
  {
    id: "PAY-002",
    date: "2023-09-01",
    amount: "$275.50",
    method: "Bank Transfer",
    status: "completed",
  },
  {
    id: "PAY-003",
    date: "2023-08-01",
    amount: "$195.00",
    method: "PayPal",
    status: "completed",
  },
  {
    id: "PAY-004",
    date: "2023-11-01",
    amount: "$350.00",
    method: "Bank Transfer",
    status: "pending",
  },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    default:
      return "bg-red-100 text-red-800 border border-red-200";
  }
};

const PayoutHistory = () => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-semibold text-gray-600 w-[100px]">ID</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Date</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Amount</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Method</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payouts.map((payout) => (
            <tr key={payout.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-800">{payout.id}</td>
              <td className="px-4 py-2 text-gray-700">
                {new Date(payout.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-gray-700">{payout.amount}</td>
              <td className="px-4 py-2 text-gray-700">{payout.method}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClasses(payout.status)}`}>
                  {payout.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutHistory;
