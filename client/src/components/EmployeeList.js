import React from "react";

const EmployeeList = ({
  employees,
  loading,
  error,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "status-active";
      case "Inactive":
        return "status-inactive";
      case "On Leave":
        return "status-leave";
      default:
        return "status-active";
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="alert alert-error">{error}</div>
        <button onClick={onRefresh} className="btn btn-secondary">
          Try Again
        </button>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Employees Found</h2>
        <p>Start by adding your first employee to the system.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="employees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>{formatSalary(employee.salary)}</td>
              <td>{employee.phone}</td>
              <td>
                <span
                  className={`status-badge ${getStatusBadgeClass(employee.status)}`}
                >
                  {employee.status}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button
                    onClick={() => onEdit(employee._id)}
                    className="btn btn-success btn-small"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee._id)}
                    className="btn btn-danger btn-small"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
