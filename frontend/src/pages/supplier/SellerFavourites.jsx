import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import Layout from '../../components/Layout';

const SellerFavourites = () => {
  const [favourites, setFavourites] = useState([
    {
      id: 1,
      buyer: 'Buyer A',
      product: 'Steel Rods',
      quantity: '1000 kg',
      budget: '$5000',
      location: 'Delhi',
    },
    {
      id: 2,
      buyer: 'Buyer B',
      product: 'Copper Wire',
      quantity: '500 kg',
      budget: '$3000',
      location: 'Mumbai',
    },
    {
      id: 3,
      buyer: 'Buyer C',
      product: 'Iron Sheets',
      quantity: '2000 kg',
      budget: '$8000',
      location: 'Chennai',
    },
  ]);

  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (lead) => {
    if (compareList.some((item) => item.id === lead.id)) {
      setCompareList(compareList.filter((item) => item.id !== lead.id));
    } else {
      setCompareList([...compareList, lead]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
    setCompareList(compareList.filter((item) => item.id !== id));
  };

  return (
    <Layout>
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Favourite Buy Leads</h2>

      {favourites.length === 0 ? (
        <p className="text-gray-500">No favourite leads available.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {favourites.map((lead) => (
            <li
              key={lead.id}
              className={`border p-4 rounded-lg shadow-md relative ${
                compareList.some((c) => c.id === lead.id)
                  ? 'border-blue-500'
                  : ''
              }`}
            >
              <button
                onClick={() => removeFromFavourites(lead.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove from favourites"
              >
                <X size={18} />
              </button>
              <h3 className="text-xl font-semibold mb-1">{lead.product}</h3>
              <p><strong>Buyer:</strong> {lead.buyer}</p>
              <p><strong>Quantity:</strong> {lead.quantity}</p>
              <p><strong>Budget:</strong> {lead.budget}</p>
              <p><strong>Location:</strong> {lead.location}</p>
              <button
                onClick={() => toggleCompare(lead)}
                className={`mt-3 inline-flex items-center px-3 py-1 text-sm font-medium rounded ${
                  compareList.some((item) => item.id === lead.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <Heart className="mr-1 w-4 h-4" />
                {compareList.some((item) => item.id === lead.id)
                  ? 'Remove from Compare'
                  : 'Add to Compare'}
              </button>
            </li>
          ))}
        </ul>
      )}

      {compareList.length >= 2 && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Field</th>
                  {compareList.map((lead) => (
                    <th key={lead.id} className="border p-2">
                      {lead.product}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Buyer</td>
                  {compareList.map((lead) => (
                    <td key={lead.id} className="border p-2">
                      {lead.buyer}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Quantity</td>
                  {compareList.map((lead) => (
                    <td key={lead.id} className="border p-2">
                      {lead.quantity}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Budget</td>
                  {compareList.map((lead) => (
                    <td key={lead.id} className="border p-2">
                      {lead.budget}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Location</td>
                  {compareList.map((lead) => (
                    <td key={lead.id} className="border p-2">
                      {lead.location}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
   </Layout>
  );
};

export default SellerFavourites;
