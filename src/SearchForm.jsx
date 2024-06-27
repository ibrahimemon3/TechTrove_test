import React, { useState, useEffect } from "react";
import './index.css';

const SearchForm = ({ onSearch }) => {
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

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(filters, people);
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
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={filters.gender === "Female"}
              onChange={handleInputChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={filters.gender === "Male"}
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
        <button type="button" onClick={handleAddPerson}>
          {editIndex !== null ? "Update Person" : "Add Person"}
        </button>
        <button type="submit">Search</button>
      </form>
      <h2>All People</h2>
      {people.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Gender</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index}>
                <td>{person.gender}</td>
                <td>{person.fullName}</td>
                <td>{person.personAge}</td>
                <td>{person.location}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditPerson(index)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeletePerson(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchForm;