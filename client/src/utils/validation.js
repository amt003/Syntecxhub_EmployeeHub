// Form validation rules and utilities

// Regex patterns for validation
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  phoneClean: /^\d{10}$/,
  name: /^[a-zA-Z\s'-]{2,}$/,
  roleName: /^[a-zA-Z\s&-]{2,}$/,
  department: /^[a-zA-Z\s&-]{2,}$/,
  address: /^[a-zA-Z0-9\s,'.#-]{5,}$/,
  salary: /^\d+$/,
};

// Validation rules
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: VALIDATION_PATTERNS.name,
    errorMessages: {
      required: "Full name is required",
      minLength: "Name must be at least 2 characters",
      maxLength: "Name cannot exceed 50 characters",
      pattern:
        "Name should contain only letters, spaces, hyphens, and apostrophes",
    },
  },
  email: {
    required: true,
    maxLength: 100,
    pattern: VALIDATION_PATTERNS.email,
    errorMessages: {
      required: "Email address is required",
      maxLength: "Email cannot exceed 100 characters",
      pattern: "Please provide a valid email address (e.g., user@example.com)",
    },
  },
  role: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: VALIDATION_PATTERNS.roleName,
    errorMessages: {
      required: "Job role is required",
      minLength: "Role must be at least 2 characters",
      maxLength: "Role cannot exceed 50 characters",
      pattern:
        "Role should contain only letters, spaces, hyphens, and ampersands",
    },
  },
  department: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: VALIDATION_PATTERNS.department,
    errorMessages: {
      required: "Department is required",
      minLength: "Department must be at least 2 characters",
      maxLength: "Department cannot exceed 50 characters",
      pattern:
        "Department should contain only letters, spaces, hyphens, and ampersands",
    },
  },
  salary: {
    required: true,
    minValue: 0,
    maxValue: 9999999,
    pattern: VALIDATION_PATTERNS.salary,
    errorMessages: {
      required: "Annual salary is required",
      minValue: "Salary cannot be negative",
      maxValue: "Salary exceeds maximum allowed value",
      pattern: "Salary must be a valid number without decimals",
    },
  },
  phone: {
    required: true,
    pattern: VALIDATION_PATTERNS.phone,
    errorMessages: {
      required: "Phone number is required",
      pattern:
        "Please provide a valid 10-digit phone number (with optional country code)",
    },
  },
  address: {
    required: true,
    minLength: 5,
    maxLength: 100,
    pattern: VALIDATION_PATTERNS.address,
    errorMessages: {
      required: "Address is required",
      minLength: "Address must be at least 5 characters",
      maxLength: "Address cannot exceed 100 characters",
      pattern: "Address contains invalid characters",
    },
  },
  status: {
    required: true,
    enum: ["Active", "Inactive", "On Leave"],
    errorMessages: {
      required: "Status is required",
      enum: "Status must be Active, Inactive, or On Leave",
    },
  },
};

// Validation function for individual fields
export const validateField = (
  fieldName,
  value,
  rules = VALIDATION_RULES[fieldName],
) => {
  const errors = [];

  if (!rules) return errors;

  const trimmedValue = typeof value === "string" ? value.trim() : value;

  // Check required
  if (rules.required && (!trimmedValue || trimmedValue === "")) {
    errors.push(rules.errorMessages.required);
    return errors;
  }

  // Skip further validation if field is empty and not required
  if (!trimmedValue && !rules.required) {
    return errors;
  }

  // Check minLength
  if (rules.minLength && trimmedValue.length < rules.minLength) {
    errors.push(rules.errorMessages.minLength);
  }

  // Check maxLength
  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    errors.push(rules.errorMessages.maxLength);
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(trimmedValue)) {
    errors.push(rules.errorMessages.pattern);
  }

  // Check minValue (for numbers)
  if (rules.minValue !== undefined && Number(trimmedValue) < rules.minValue) {
    errors.push(rules.errorMessages.minValue);
  }

  // Check maxValue (for numbers)
  if (rules.maxValue !== undefined && Number(trimmedValue) > rules.maxValue) {
    errors.push(rules.errorMessages.maxValue);
  }

  // Check enum (for select fields)
  if (rules.enum && !rules.enum.includes(trimmedValue)) {
    errors.push(rules.errorMessages.enum);
  }

  return errors;
};

// Validation function for entire form
export const validateForm = (formData) => {
  const newErrors = {};

  Object.keys(VALIDATION_RULES).forEach((fieldName) => {
    const fieldErrors = validateField(fieldName, formData[fieldName]);
    if (fieldErrors.length > 0) {
      newErrors[fieldName] = fieldErrors[0]; // Show first error
    }
  });

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};

// Sanitize function to clean input
export const sanitizeInput = (value, fieldName) => {
  if (typeof value !== "string") return value;

  let sanitized = value.trim();

  switch (fieldName) {
    case "name":
      // Remove extra spaces
      sanitized = sanitized.replace(/\s+/g, " ");
      break;
    case "email":
      // Convert to lowercase
      sanitized = sanitized.toLowerCase();
      break;
    case "phone":
      // Remove special characters except + and -
      sanitized = sanitized.replace(/[^\d+\-\s]/g, "");
      break;
    case "salary":
      // Remove non-numeric characters
      sanitized = sanitized.replace(/[^\d]/g, "");
      break;
    case "address":
      // Remove extra spaces
      sanitized = sanitized.replace(/\s+/g, " ");
      break;
    default:
      // Remove extra spaces
      sanitized = sanitized.replace(/\s+/g, " ");
  }

  return sanitized;
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

// Format salary for display
export const formatSalary = (salary) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(salary);
};

// Check if field has error
export const hasFieldError = (fieldName, errors) => {
  return errors && errors[fieldName];
};

// Get field error message
export const getFieldError = (fieldName, errors) => {
  return errors && errors[fieldName] ? errors[fieldName] : "";
};

// Check if form is touched (user has interacted with it)
export const initializeTouchedFields = () => {
  return {
    name: false,
    email: false,
    role: false,
    department: false,
    salary: false,
    phone: false,
    address: false,
    status: false,
  };
};

export default {
  VALIDATION_PATTERNS,
  VALIDATION_RULES,
  validateField,
  validateForm,
  sanitizeInput,
  formatPhoneNumber,
  formatSalary,
  hasFieldError,
  getFieldError,
  initializeTouchedFields,
};
