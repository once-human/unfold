import Layout from "../../components/Layout";
import React, { useState } from 'react';

const PostInquiry = () => {
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    unit: '',
    description: '',
    location: '',
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Handle submit logic
  };

  const handleSaveDraft = () => {
    console.log("Saved as Draft:", formData);
    // Handle save draft logic
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-6">Post Inquiry</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Search Product</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="Search for a product..."
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Quantity and Unit */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="mt-1 w-full border rounded-lg px-4 py-2"
                required
                min="1"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Unit</option>
                <option value="Kg">Kg</option>
                <option value="Grams">Grams</option>
                <option value="Liters">Liters</option>
                <option value="Milliliters">Milliliters</option>
                <option value="Tons">Tons</option>
                <option value="Meters">Meters</option>
                <option value="Centimeters">Centimeters</option>
                <option value="Inches">Inches</option>
                <option value="Feet">Feet</option>
                <option value="Pieces">Pieces</option>
                <option value="Boxes">Boxes</option>
                <option value="Packs">Packs</option>
                <option value="Sets">Sets</option>
                <option value="Pairs">Pairs</option>
                <option value="Dozens">Dozens</option>
                <option value="Units">Units</option>
                <option value="Rolls">Rolls</option>
                <option value="Bags">Bags</option>
                <option value="Cans">Cans</option>
                <option value="Barrels">Barrels</option>
                <option value="Cubic Meters">Cubic Meters</option>
                <option value="Gallons">Gallons</option>
                <option value="Yards">Yards</option>
                <option value="Ounces">Ounces</option>
                <option value="Pounds">Pounds</option>
                <option value="Square Meters">Square Meters</option>
                <option value="Square Feet">Square Feet</option>
                <option value="Cubic Inches">Cubic Inches</option>
                <option value="Bottles">Bottles</option>
                <option value="Tubes">Tubes</option>
                <option value="Cartons">Cartons</option>
                <option value="Containers">Containers</option>
                <option value="Pallets">Pallets</option>
                <option value="Sachets">Sachets</option>
                <option value="Tablets">Tablets</option>
                <option value="Capsules">Capsules</option>
                <option value="Strips">Strips</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write your inquiry in detail..."
              className="mt-1 w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Location (Automatic & Manual) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="location"
                  checked={formData.location === 'automatic'}
                  onChange={() => setFormData(prev => ({ ...prev, location: prev.location === 'automatic' ? '' : 'automatic' }))}
                  className="mr-2"
                />
                <span>Use Automatic Location</span>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="location"
                  value={formData.location === 'manual' ? formData.location : ''}
                  onChange={handleChange}
                  placeholder="Enter location manually"
                  disabled={formData.location === 'automatic'}
                  className="mt-1 w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
          </div>

          {/* Anonymous Post Option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Post Anonymously</label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PostInquiry;
