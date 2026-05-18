import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";

const EditEmployeeModal = ({ employee, onClose, onSave, loading, error }) => {
  const [formError, setFormError] = useState(error);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const handleSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Employee</h2>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-small"
            style={{
              margin: 0,
              padding: "5px 10px",
              fontSize: "1.2rem",
              border: "none",
            }}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            loading={loading}
            error={formError}
          />
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
