import React, { useState, useEffect } from "react";
import Table from "./Table";

const SearchForm = () => {
  const [filters, setFilters] = useState({
    gender: "",
    fullName: "",
    personAge: "",
    location: "",
  });

  const [people, setPeople] = useState(() => {
    const savedPeople = localStorage.getItem("people");
    return savedPeople ? JSON.parse(savedPeople) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const results = people.filter((person) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "personAge") return person[key] === filters[key];
        return person[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });
    setSearchResults(results);
  };

  const handleAddPerson = () => {
    if (editIndex !== null) {
      const updatedPeople = [...people];
      updatedPeople[editIndex] = filters;
      setPeople(updatedPeople);
      setEditIndex(null);
    } else {
      setPeople([...people, { ...filters, id: people.length + 1 }]);
    }
    setFilters({
      gender: "",
      fullName: "",
      personAge: "",
      location: "",
    });
  };

  const handleEditPerson = (index) => {
    const personToEdit = people[index];
    setFilters(personToEdit);
    setEditIndex(index);
  };

  const handleDeletePerson = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8">
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-4 bg-aquamarine p-12 rounded-lg shadow-lg w-[40rem]">
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={filters.gender === "Female"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Female
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={filters.gender === "Male"}
              onChange={handleInputChange}
              className="mr-2"
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
          className="w-72 mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="personAge"
          placeholder="Age"
          value={filters.personAge}
          onChange={handleInputChange}
          className="w-72 mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="location"
          placeholder="Address"
          value={filters.location}
          onChange={handleInputChange}
          className="w-72 mb-2 p-2 border border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={handleAddPerson}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-2"
        >
          {editIndex !== null ? "Update Person" : "Add Person"}
        </button>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md">
          Search
        </button>
      </form>

      <Table
        people={people}
        handleEditPerson={handleEditPerson}
        handleDeletePerson={handleDeletePerson}
      />
      {searchResults.length > 0 && (
        <div className="mt-8 w-[40rem]">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <table className="w-full border-collapse bg-black text-left">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">Gender</th>
                <th className="p-2">Full Name</th>
                <th className="p-2">Age</th>
                <th className="p-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((person, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="p-2">{person.gender}</td>
                  <td className="p-2">{person.fullName}</td>
                  <td className="p-2">{person.personAge}</td>
                  <td className="p-2">{person.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
