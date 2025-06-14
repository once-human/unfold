import React, { useState } from "react";

export default function BankDetailsForm() {
  const [formData, setFormData] = useState({
    accountName: "John Doe",
    accountNumber: "123456789",
    bankName: "Example Bank",
    routingNumber: "987654321",
    accountType: "checking",
    country: "us",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.accountName.length < 2)
      newErrors.accountName = "Account name must be at least 2 characters.";
    if (formData.accountNumber.length < 5)
      newErrors.accountNumber = "Account number must be at least 5 characters.";
    if (formData.bankName.length < 2)
      newErrors.bankName = "Bank name is required.";
    if (formData.routingNumber.length < 5)
      newErrors.routingNumber = "Routing number must be at least 5 characters.";
    if (!formData.accountType)
      newErrors.accountType = "Please select an account type.";
    if (!formData.country)
      newErrors.country = "Please select a country.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      console.log("Submitted data:", formData);
      setTimeout(() => {
        alert("Bank details updated successfully");
        setIsSubmitting(false);
        setIsEditing(false);
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Account Holder Name", name: "accountName", placeholder: "John Doe" },
          { label: "Account Number", name: "accountNumber", placeholder: "123456789" },
          { label: "Bank Name", name: "bankName", placeholder: "Example Bank" },
          { label: "Routing Number", name: "routingNumber", placeholder: "987654321" },
        ].map(({ label, name, placeholder }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder={placeholder}
              className="w-full border px-3 py-2 rounded"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        <div>
          <label>Account Type</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select account type</option>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="business">Business</option>
          </select>
          {errors.accountType && <p className="text-red-500 text-sm">{errors.accountType}</p>}
        </div>

        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="in">India</option>
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Your bank details are encrypted and secure. We will only use this information for commission payouts.
      </p>

      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit Details
          </button>
        )}
      </div>
    </form>
  );
}
