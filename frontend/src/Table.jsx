import React from "react";

const Table = ({ people, handleEditPerson, handleDeletePerson }) => (
  <div className="mt-8 w-[40rem]">
    <h2 className="text-xl font-bold mb-4">All People</h2>
    {people.length > 0 && (
      <table className="w-full border-collapse bg-black text-left">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Gender</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Address</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="p-2">{person.gender}</td>
              <td className="p-2">{person.fullName}</td>
              <td className="p-2">{person.personAge}</td>
              <td className="p-2">{person.location}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
                  onClick={() => handleEditPerson(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  onClick={() => handleDeletePerson(index)}
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
