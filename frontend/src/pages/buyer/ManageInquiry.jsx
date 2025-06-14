import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

const ManageInquiry = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const dummyInquiries = [
      {
        id: 1,
        product: 'Fresh Watermelon',
        description: 'I am interested in buying Fresh Watermelon from reliable suppliers for local distribution in bulk quantities.',
        postedDate: '2025-05-18',
        status: 'Approval / Pending',
      },
      {
        id: 2,
        product: 'Organic Apples',
        description: 'Looking for Grade A Organic Apples for export. Need quotations with packaging and delivery details.',
        postedDate: '2025-05-16',
        status: 'Approved / Active',
      },
       {
        id: 3,
        product: 'Orange',
        description: 'Looking for Grade A Organic oranges for export. Need quotations with packaging and delivery details.',
        postedDate: '2025-05-16',
        status: 'Approved / Active',
      },
    ];
    setInquiries(dummyInquiries);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto bg-white p-6 mt-10 shadow-md rounded">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold">Manage Buy Requirements</h2>
          <a href="#" className="text-blue-600 hover:underline text-sm">
            + Add New Requirement
          </a>
        </div>

        {/* Inquiry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="border border-gray-300 rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-1">{inq.product}</h3>
              <p className="text-sm text-gray-700">{inq.description}</p>

              <div className="text-sm mt-3">
                <p><strong>Posted:</strong> {inq.postedDate}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`font-medium ${inq.status.includes('Active') ? 'text-green-600' : 'text-yellow-600'}`}>
                    {inq.status}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  View complete details
                </button>
                <button
                  onClick={() => handleDelete(inq.id)}
                  className="text-red-600 text-sm hover:underline flex items-center gap-1"
                >
                  🗑 Close
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Text */}
        <p className="text-sm text-gray-600 mt-8">
          You can view here all the Buy Leads that you have posted previously. If the status is set as <span className="font-medium text-green-600">Active</span>, it means that the posting has been approved & authenticated by our team, else it will be listed as <span className="font-medium text-yellow-600">Non-Active</span>.
        </p>

        {/* Footer */}
        <div className="mt-10 border-t pt-4 text-xs text-gray-500">
          <strong className="block mb-2">Quick Links</strong>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:underline text-blue-600">Company Profile</a>
            <a href="#" className="hover:underline text-blue-600">Manage Products</a>
            <a href="#" className="hover:underline text-blue-600">Buy Leads</a>
            <a href="#" className="hover:underline text-blue-600">Premium Services</a>
            <a href="#" className="hover:underline text-blue-600">Add New Product</a>
            <a href="#" className="hover:underline text-blue-600">Post Buy Requirement</a>
            <a href="#" className="hover:underline text-blue-600">Settings</a>
          </div>
          <p className="mt-6 text-center">
            Copyright © 1997 Weblink.In Pvt. Ltd.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ManageInquiry;
