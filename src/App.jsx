import React from 'react';
import SearchForm from './SearchForm';

const App = () => {
  const handleSearch = (params) => {
    console.log("Searching with params:", params);
    // Add your search logic here
  };

  return (
    <div>
      <h1>Search Form</h1>
      <SearchForm onSearch={handleSearch} />
    </div>
  );
};

export default App;
