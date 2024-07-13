import React from "react";

const Table = ({ products, handleEditProduct, handleDeleteProduct }) => (
  <div className="mt-8 w-[40rem]">
    <h2 className="text-xl font-bold mb-4">All Products</h2>
    {products.length > 0 && (
      <table className="w-full border-collapse bg-black text-left">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Category</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.productName}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2">{product.brand}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
                  onClick={() => handleEditProduct(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  onClick={() => handleDeleteProduct(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default Table;
