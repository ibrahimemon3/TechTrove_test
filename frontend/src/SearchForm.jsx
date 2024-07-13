import React, { useState, useEffect } from "react";
import Table from "./Table";

const SearchForm = () => {
  const [filters, setFilters] = useState({
    category: "",
    productName: "",
    price: "",
    brand: "",
  });

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const results = products.filter((product) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "price") return product[key] === filters[key];
        return product[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });
    setSearchResults(results);
  };

  const handleAddProduct = () => {
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = filters;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, { ...filters, id: products.length + 1 }]);
    }
    setFilters({
      category: "",
      productName: "",
      price: "",
      brand: "",
    });
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setFilters(productToEdit);
    setEditIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-8">
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-4 bg-aquamarine p-12 rounded-lg shadow-lg w-[40rem]">
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Gaming Gear"
              checked={filters.category === "Gaming Gear"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Gaming Gear
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Phones and Tablets"
              checked={filters.category === "Phones and Tablets"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Phones and Tablets
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Accessories"
              checked={filters.category === "Accessories"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Accessories
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Camera"
              checked={filters.category === "Camera"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Camera
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="Gadgets"
              checked={filters.category === "Gadgets"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Gadgets
          </label>
        </div>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={filters.productName}
          onChange={handleInputChange}
          className="w-72 mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={filters.price}
          onChange={handleInputChange}
          className="w-72 mb-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={filters.brand}
          onChange={handleInputChange}
          className="w-72 mb-2 p-2 border border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-2"
        >
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md">
          Search
        </button>
      </form>

      <Table
        products={products}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
      />
      {searchResults.length > 0 && (
        <div className="mt-8 w-[40rem]">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <table className="w-full border-collapse bg-black text-left">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">Category</th>
                <th className="p-2">Product Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Brand</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((product, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.productName}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.brand}</td>
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
