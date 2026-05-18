import React, { useState, useEffect } from "react";
import { employeeAPI } from "./services/api";
import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EditEmployeeModal from "./components/EditEmployeeModal";
import Alert from "./components/Alert";
import "./styles/App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (formData) => {
    setFormLoading(true);
    setFormError("");
    try {
      const response = await employeeAPI.create(formData);
      if (response.success) {
        setEmployees([response.data, ...employees]);
        setShowAddForm(false);
        showAlert("Employee added successfully!", "success");
      }
    } catch (err) {
      setFormError(err.message || "Failed to create employee");
      showAlert(err.message || "Failed to create employee", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditEmployee = async (employeeId) => {
    setFormLoading(true);
    try {
      const response = await employeeAPI.getById(employeeId);
      if (response.success) {
        setEditingEmployee(response.data);
      }
    } catch (err) {
      showAlert(err.message || "Failed to load employee", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleSaveEmployee = async (formData) => {
    setFormLoading(true);
    setFormError("");
    try {
      const response = await employeeAPI.update(editingEmployee._id, formData);
      if (response.success) {
        setEmployees(
          employees.map((emp) =>
            emp._id === editingEmployee._id ? response.data : emp,
          ),
        );
        setEditingEmployee(null);
        showAlert("Employee updated successfully!", "success");
      }
    } catch (err) {
      setFormError(err.message || "Failed to update employee");
      showAlert(err.message || "Failed to update employee", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await employeeAPI.delete(employeeId);
        if (response.success) {
          setEmployees(employees.filter((emp) => emp._id !== employeeId));
          showAlert("Employee deleted successfully!", "success");
        }
      } catch (err) {
        showAlert(err.message || "Failed to delete employee", "error");
      }
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <div className="App">
      <Header
        onAddNew={() => setShowAddForm(true)}
        totalEmployees={employees.length}
      />

      {alert && (
        <div className="container">
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
          />
        </div>
      )}

      <div className="container">
        {showAddForm ? (
          <div>
            <button
              onClick={() => setShowAddForm(false)}
              className="btn btn-secondary"
              style={{ marginBottom: "20px" }}
            >
              ← Back to List
            </button>
            <EmployeeForm
              onSubmit={handleAddEmployee}
              loading={formLoading}
              error={formError}
            />
          </div>
        ) : (
          <EmployeeList
            employees={employees}
            loading={loading}
            error={error}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            onRefresh={fetchEmployees}
          />
        )}
      </div>

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleSaveEmployee}
          loading={formLoading}
          error={formError}
        />
      )}
    </div>
  );
}

export default App;
