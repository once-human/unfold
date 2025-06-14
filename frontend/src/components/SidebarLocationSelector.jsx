import React, { useState } from "react";
import { Country, State, City } from "country-state-city";

const SidebarLocationSelector = () => {
  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleCountryChange = (isoCode) => {
    const country = countries.find((c) => c.isoCode === isoCode);
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(isoCode));
    setSelectedState(null);
    setCities([]);
  };

  const handleStateChange = (isoCode) => {
    const state = states.find((s) => s.isoCode === isoCode);
    setSelectedState(state);
    if (selectedCountry) {
      setCities(City.getCitiesOfState(selectedCountry.isoCode, isoCode));
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🌍 Select Your Location
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Country Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={!selectedCountry}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SidebarLocationSelector;
