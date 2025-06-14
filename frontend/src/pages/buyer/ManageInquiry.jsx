import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Pencil, Trash2, PhoneCall } from 'lucide-react';

const ManageInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const dummyInquiries = [
      {
        id: 1,
        product: 'Aluminium Sheets',
        description: 'Need 1000 kg of aluminium sheets for construction.',
        price: 5000,
        location: 'Mumbai',
        supplierId: 'SUP123',
      },
      {
        id: 2,
        product: 'Plastic Pipes',
        description: 'Urgently required 200 meters of plastic pipes.',
        price: 1500,
        location: 'Delhi',
        supplierId: 'SUP456',
      },
      {
        id: 3,
        product: 'Steel Bars',
        description: 'Looking for 500 kg of high-quality steel bars.',
        price: 7000,
        location: 'Chennai',
        supplierId: 'SUP789',
      },
    ];
    setInquiries(dummyInquiries);
  }, []);

  const handleEdit = (id) => {
    const selected = inquiries.find((inq) => inq.id === id);
    setCurrentEdit({ ...selected });
    setEditMode(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries(inquiries.filter((inq) => inq.id !== id));
      alert('Inquiry deleted successfully!');
    }
  };

  const handleSaveEdit = () => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === currentEdit.id ? currentEdit : inq
      )
    );
    setEditMode(false);
    setCurrentEdit(null);
  };

  const handleContact = (supplierId) => {
    console.log(`Contact Supplier ID: ${supplierId}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow rounded-lg relative">
        <h2 className="text-2xl font-semibold mb-6">Manage Inquiries</h2>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Product</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Location</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{inq.product}</td>
                  <td className="border px-4 py-2">{inq.description}</td>
                  <td className="border px-4 py-2">₹{inq.price}</td>
                  <td className="border px-4 py-2">{inq.location}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-3">
                      <Pencil
                        size={18}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => handleEdit(inq.id)}
                        title="Edit"
                      />
                      <Trash2
                        size={18}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(inq.id)}
                        title="Delete"
                      />
                      <PhoneCall
                        size={18}
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        onClick={() => handleContact(inq.supplierId)}
                        title="Contact"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form Modal - Without Black Overlay */}
        {editMode && currentEdit && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-50 border border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Edit Inquiry</h3>
            <input
              type="text"
              value={currentEdit.product}
              onChange={(e) =>
                setCurrentEdit({ ...currentEdit, product: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
              placeholder="Product"
            />
            <textarea
              value={currentEdit.description}
              onChange={(e) =>
                setCurrentEdit({ ...currentEdit, description: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
              placeholder="Description"
            />
            <input
              type="number"
              value={currentEdit.price}
              onChange={(e) =>
                setCurrentEdit({ ...currentEdit, price: parseInt(e.target.value) })
              }
              className="w-full border p-2 mb-3 rounded"
              placeholder="Price"
            />
            <input
              type="text"
              value={currentEdit.location}
              onChange={(e) =>
                setCurrentEdit({ ...currentEdit, location: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded"
              placeholder="Location"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageInquiry;
