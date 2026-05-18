import React, { useState, useEffect } from "react";
import {
  validateField,
  validateForm as validateFormUtil,
  sanitizeInput,
  initializeTouchedFields,
} from "../utils/validation";

const EmployeeForm = ({ initialData, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    salary: "",
    department: "",
    phone: "",
    address: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(initializeTouchedFields());

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const { isValid, errors: validationErrors } = validateFormUtil(formData);
    setErrors(validationErrors);
    return isValid;
  };

  const validateFieldOnChange = (fieldName, value) => {
    const fieldErrors = validateField(fieldName, value);
    return fieldErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sanitize input
    const sanitizedValue = sanitizeInput(value, name);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Real-time validation only if field has been touched
    if (touched[name]) {
      const newFieldErrors = validateFieldOnChange(name, sanitizedValue);
      if (newFieldErrors.length > 0) {
        setErrors((prev) => ({
          ...prev,
          [name]: newFieldErrors[0],
        }));
      } else {
        setErrors((prev) => {
          const updatedErrors = { ...prev };
          delete updatedErrors[name];
          return updatedErrors;
        });
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    const newFieldErrors = validateFieldOnChange(name, formData[name]);
    if (newFieldErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        [name]: newFieldErrors[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched(initializeTouchedFields());
    Object.keys(initializeTouchedFields()).forEach((field) => {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));
    });

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">
          Full Name *{" "}
          <span className="char-count">({formData.name.length}/50)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter employee name"
          maxLength="50"
          className={errors.name && touched.name ? "input-error" : ""}
        />
        {errors.name && touched.name && (
          <div className="error-message">{errors.name}</div>
        )}
        {!errors.name && touched.name && (
          <div className="success-message">✓ Valid name</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email *{" "}
          <span className="char-count">({formData.email.length}/100)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email address"
          maxLength="100"
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <div className="error-message">{errors.email}</div>
        )}
        {!errors.email && touched.email && (
          <div className="success-message">✓ Valid email</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="role">
          Job Role *{" "}
          <span className="char-count">({formData.role.length}/50)</span>
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Software Engineer, Manager"
          maxLength="50"
          className={errors.role && touched.role ? "input-error" : ""}
        />
        {errors.role && touched.role && (
          <div className="error-message">{errors.role}</div>
        )}
        {!errors.role && touched.role && (
          <div className="success-message">✓ Valid role</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="department">
          Department *{" "}
          <span className="char-count">({formData.department.length}/50)</span>
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., IT, HR, Finance"
          maxLength="50"
          className={
            errors.department && touched.department ? "input-error" : ""
          }
        />
        {errors.department && touched.department && (
          <div className="error-message">{errors.department}</div>
        )}
        {!errors.department && touched.department && (
          <div className="success-message">✓ Valid department</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="salary">Annual Salary *</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter annual salary"
          min="0"
          className={errors.salary && touched.salary ? "input-error" : ""}
        />
        {errors.salary && touched.salary && (
          <div className="error-message">{errors.salary}</div>
        )}
        {!errors.salary && touched.salary && (
          <div className="success-message">✓ Valid salary</div>
        )}
        {formData.salary && (
          <div className="help-text">
            Annual: ₹{parseInt(formData.salary).toLocaleString()} | Monthly: ₹
            {Math.round(parseInt(formData.salary) / 12).toLocaleString()}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter 10-digit phone number"
          className={errors.phone && touched.phone ? "input-error" : ""}
        />
        {errors.phone && touched.phone && (
          <div className="error-message">{errors.phone}</div>
        )}
        {!errors.phone && touched.phone && (
          <div className="success-message">✓ Valid phone</div>
        )}
        <div className="help-text">Format: +91-XXXXXXXXXX</div>
      </div>

      <div className="form-group">
        <label htmlFor="address">
          Address *{" "}
          <span className="char-count">({formData.address.length}/100)</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter street address"
          maxLength="100"
          className={errors.address && touched.address ? "input-error" : ""}
        />
        {errors.address && touched.address && (
          <div className="error-message">{errors.address}</div>
        )}
        {!errors.address && touched.address && (
          <div className="success-message">✓ Valid address</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.status && touched.status ? "input-error" : ""}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
        {errors.status && touched.status && (
          <div className="error-message">{errors.status}</div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "Submitting..."
            : initialData
              ? "Update Employee"
              : "Add Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
