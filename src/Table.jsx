import React from "react";

const Table = ({ people, handleEditPerson, handleDeletePerson }) => (
  <div>
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

export default Table;
