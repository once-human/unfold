import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, Save, X } from 'lucide-react'; // Icon imports
import Layout from '../../components/Layout';

const LeadHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedLead, setEditedLead] = useState({});

  const dummyData = [
    { id: 1, product: 'Product A', status: 'Contacted', date: '2025-05-01' },
    { id: 2, product: 'Product B', status: 'Interested', date: '2025-04-28' },
    { id: 3, product: 'Product C', status: 'Completed', date: '2025-04-20' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setHistory(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    setHistory(history.filter((lead) => lead.id !== id));
    alert('Lead deleted successfully!');
  };

  const handleEditClick = (lead) => {
    setEditingId(lead.id);
    setEditedLead({ ...lead });
  };

  const handleSave = () => {
    setHistory(
      history.map((lead) => (lead.id === editingId ? editedLead : lead))
    );
    setEditingId(null);
    alert('Lead updated successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLead((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6">Lead Interaction History</h2>
      {loading ? (
        <p>Loading your lead history...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No leads in history.</p>
      ) : (
        <ul>
          {history.map((lead) => (
            <li key={lead.id} className="p-4 border rounded-lg shadow-sm mb-4">
              {editingId === lead.id ? (
                <>
                  <input
                    name="product"
                    value={editedLead.product}
                    onChange={handleChange}
                    className="border p-1 mb-2 w-full"
                  />
                  <input
                    name="status"
                    value={editedLead.status}
                    onChange={handleChange}
                    className="border p-1 mb-2 w-full"
                  />
                  <input
                    type="date"
                    name="date"
                    value={editedLead.date}
                    readOnly
                    className="border p-1 mb-2 w-full bg-gray-100 cursor-not-allowed"
                  />
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800"
                      title="Save"
                    >
                      <Save />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-800"
                      title="Cancel"
                    >
                      <X />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{lead.product}</h3>
                  <p>{lead.status}</p>
                  <p>{lead.date}</p>
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      onClick={() => handleEditClick(lead)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit3 />
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </Layout>
  );
};

export default LeadHistory;
