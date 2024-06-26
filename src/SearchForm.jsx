import React, { useState } from "react";
import './index.css';

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    
    gender: "",fullName: "",personAge: "",location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="gender-options">
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleInputChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleInputChange}
          />
          Male
        </label>
      </div>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={filters.fullName}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="personAge"
        placeholder="Age"
        value={filters.personAge}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Address"
        value={filters.location}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleFormSubmit}>Search</button>
    </form>
  );
};

export default SearchForm;
