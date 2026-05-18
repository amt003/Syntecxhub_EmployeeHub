import React from "react";

const Header = ({ onAddNew, totalEmployees }) => {
  return (
    <div className="header">
      <div className="flex-between">
        <div>
          <h1>Employee Hub</h1>
          <p>
            Manage your employees efficiently • Total: {totalEmployees}{" "}
            employees
          </p>
        </div>
        <button onClick={onAddNew} className="btn btn-primary">
          + Add New Employee
        </button>
      </div>
    </div>
  );
};

export default Header;
