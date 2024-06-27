import React, { useState } from 'react';
import SearchForm from './SearchForm';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (filters, people) => {
    const results = people.filter(person => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        if (key === "personAge") return person[key] === filters[key];
        return person[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Search Form</h1>
      <SearchForm onSearch={handleSearch} />
      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Gender</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((person, index) => (
              <tr key={index}>
                <td>{person.gender}</td>
                <td>{person.fullName}</td>
                <td>{person.personAge}</td>
                <td>{person.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default App;
