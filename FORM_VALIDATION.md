# Form Validation Documentation

This document provides a comprehensive overview of all form validations used in the Employee Hub application.

## Overview

The Employee Hub application implements **comprehensive client-side and server-side form validation** to ensure data integrity and provide a great user experience.

### Validation Layers

1. **Client-Side Validation** - Immediate feedback in the browser
2. **Server-Side Validation** - Security layer using express-validator
3. **Database Validation** - Mongoose schema validation

---

## Client-Side Validation

Located in: `/client/src/utils/validation.js`

### Validation Features

✅ **Real-time Validation**

- Validates as user types (after field is touched)
- Instant error feedback
- Success indicators for valid fields

✅ **Field Sanitization**

- Removes special characters automatically
- Trims whitespace
- Converts emails to lowercase
- Cleans phone numbers

✅ **Character Count Display**

- Shows current character count
- Displays max allowed characters
- Prevents exceeding limits

✅ **Help Text**

- Format guidance for complex fields
- Examples provided for user reference

---

## Validation Rules

### 1. **Name**

| Property       | Value                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Required       | Yes                                                                                                                                                                      |
| Min Length     | 2 characters                                                                                                                                                             |
| Max Length     | 50 characters                                                                                                                                                            |
| Pattern        | Letters, spaces, hyphens, apostrophes                                                                                                                                    |
| Error Messages | - Name is required<br>- Name must be at least 2 characters<br>- Name cannot exceed 50 characters<br>- Name should contain only letters, spaces, hyphens, and apostrophes |

**Regex Pattern:**

```regex
/^[a-zA-Z\s'-]{2,}$/
```

**Examples:**

- ✅ Valid: John Doe, Mary-Jane Smith, O'Connor
- ❌ Invalid: J (too short), John123, John@Doe

---

### 2. **Email**

| Property       | Value                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Required       | Yes                                                                                                           |
| Max Length     | 100 characters                                                                                                |
| Format         | Valid email address                                                                                           |
| Unique         | Yes (database level)                                                                                          |
| Error Messages | - Email address is required<br>- Email cannot exceed 100 characters<br>- Please provide a valid email address |

**Regex Pattern:**

```regex
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

**Examples:**

- ✅ Valid: user@example.com, john.doe@company.co.uk
- ❌ Invalid: invalidemail, user@, @example.com, user@@example.com

**Automatic Processing:**

- Converted to lowercase
- Extra spaces trimmed

---

### 3. **Role (Job Title)**

| Property       | Value                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required       | Yes                                                                                                                                                                         |
| Min Length     | 2 characters                                                                                                                                                                |
| Max Length     | 50 characters                                                                                                                                                               |
| Pattern        | Letters, spaces, hyphens, ampersands                                                                                                                                        |
| Error Messages | - Job role is required<br>- Role must be at least 2 characters<br>- Role cannot exceed 50 characters<br>- Role should contain only letters, spaces, hyphens, and ampersands |

**Regex Pattern:**

```regex
/^[a-zA-Z\s&-]{2,}$/
```

**Examples:**

- ✅ Valid: Software Engineer, Senior Manager, HR & Admin
- ❌ Invalid: Jr, Software Engineer123, Software/Engineer

---

### 4. **Department**

| Property       | Value                                                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required       | Yes                                                                                                                                                                                             |
| Min Length     | 2 characters                                                                                                                                                                                    |
| Max Length     | 50 characters                                                                                                                                                                                   |
| Pattern        | Letters, spaces, hyphens, ampersands                                                                                                                                                            |
| Error Messages | - Department is required<br>- Department must be at least 2 characters<br>- Department cannot exceed 50 characters<br>- Department should contain only letters, spaces, hyphens, and ampersands |

**Regex Pattern:**

```regex
/^[a-zA-Z\s&-]{2,}$/
```

**Examples:**

- ✅ Valid: Information Technology, HR & Recruitment, Sales & Marketing
- ❌ Invalid: IT (ambiguous), Dept123, Finance-Operations/Management

---

### 5. **Salary (Annual)**

| Property       | Value                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required       | Yes                                                                                                                                                      |
| Min Value      | 0 (non-negative)                                                                                                                                         |
| Max Value      | 9,999,999                                                                                                                                                |
| Format         | Whole number only (no decimals)                                                                                                                          |
| Error Messages | - Annual salary is required<br>- Salary cannot be negative<br>- Salary exceeds maximum allowed value<br>- Salary must be a valid number without decimals |

**Regex Pattern:**

```regex
/^\d+$/
```

**Features:**

- Displays formatted salary in both annual and monthly breakdown
- Example: Annual: $120,000 | Monthly: $10,000
- Only numeric input allowed
- Non-numeric characters automatically removed

**Examples:**

- ✅ Valid: 50000, 120000, 9999999
- ❌ Invalid: -50000 (negative), 120000.50 (decimal), 12000000000 (too large)

---

### 6. **Phone Number**

| Property       | Value                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| Required       | Yes                                                                                                       |
| Format         | 10-digit number with optional country code                                                                |
| Pattern        | `(+\d{1,3}[- ]?)?\d{10}`                                                                                  |
| Error Messages | - Phone number is required<br>- Please provide a valid 10-digit phone number (with optional country code) |

**Regex Pattern:**

```regex
/^(\+\d{1,3}[- ]?)?\d{10}$/
```

**Accepted Formats:**

- 1234567890 (10 digits)
- (123) 456-7890 (formatted)
- 123-456-7890 (with hyphens)
- +1-555-123-4567 (with country code)
- +1 555 123 4567 (country code with spaces)

**Examples:**

- ✅ Valid: 5551234567, (555) 123-4567, +1-555-123-4567
- ❌ Invalid: 123456789 (too short), (555) 123-456 (incomplete)

---

### 7. **Address**

| Property       | Value                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required       | Yes                                                                                                                                                 |
| Min Length     | 5 characters                                                                                                                                        |
| Max Length     | 100 characters                                                                                                                                      |
| Pattern        | Alphanumeric, spaces, common punctuation                                                                                                            |
| Error Messages | - Address is required<br>- Address must be at least 5 characters<br>- Address cannot exceed 100 characters<br>- Address contains invalid characters |

**Regex Pattern:**

```regex
/^[a-zA-Z0-9\s,'.#-]{5,}$/
```

**Allowed Characters:**

- Letters and numbers
- Spaces, commas, periods, apostrophes
- Hash symbol (#) for apartment numbers
- Hyphens

**Examples:**

- ✅ Valid: 123 Main Street, 456 Oak Ave, Apt. #12B
- ❌ Invalid: 123 St (too short), 123 Main St @Suite 10 (invalid characters)

---

### 8. **Status**

| Property       | Value                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| Required       | Yes                                                                    |
| Enum Values    | Active, Inactive, On Leave                                             |
| Error Messages | - Status is required<br>- Status must be Active, Inactive, or On Leave |

**Valid Options:**

- Active (Green badge)
- Inactive (Red badge)
- On Leave (Yellow badge)

---

## Validation Workflow

### User Interaction Flow

```
1. User focuses on field
   ↓
2. Field marked as "touched"
   ↓
3. User types/enters data
   ↓
4. Real-time validation triggers
   ↓
5. Error or success message shown
   ↓
6. User leaves field (blur event)
   ↓
7. Final validation on blur
   ↓
8. User submits form
   ↓
9. Full form validation
   ↓
10. Submit to server if valid
```

### Validation States

**While Typing (if touched):**

- Real-time validation
- Error message appears immediately
- Success indicator shown if valid

**On Blur (leaving field):**

- If invalid: Error remains visible
- If valid: Field is marked as valid

**On Submit:**

- All fields validated
- All fields marked as touched
- Shows all errors if any exist
- Prevents submission if validation fails

---

## Server-Side Validation

Located in: `/server/routes/employees.js`

The backend uses **express-validator** for additional security:

```javascript
const validateEmployee = [
  body("name").trim().isLength({ min: 2 }),
  body("email").isEmail(),
  body("role").trim().isLength({ min: 2 }),
  body("salary").isFloat({ min: 0 }),
  body("department").trim().notEmpty(),
  body("phone").matches(/^(\+\d{1,3}[- ]?)?\d{10}$/),
  body("address").trim().notEmpty(),
  body("status").isIn(["Active", "Inactive", "On Leave"]),
];
```

### Server Validation Advantages

✅ Security - Prevents malicious data submission
✅ Consistency - Enforces same rules regardless of client
✅ Database Protection - Validates before storage
✅ Error Handling - Returns structured error responses

---

## Database Validation

Located in: `/server/models/Employee.js`

Mongoose schema provides an additional validation layer:

```javascript
name: {
  type: String,
  required: [true, 'Please provide a name'],
  minlength: [2, 'Name must be at least 2 characters']
},
email: {
  type: String,
  required: [true, 'Please provide an email'],
  unique: true,
  match: [/^(...)@(...)./, 'Please provide a valid email']
}
```

### Database Validation Features

✅ Type checking (String, Number, etc.)
✅ Required field enforcement
✅ Unique constraints (email)
✅ Min/Max value validation
✅ Pattern matching with regex
✅ Custom error messages

---

## Using the Validation Utilities

### Import Validation Functions

```javascript
import {
  validateField,
  validateForm,
  sanitizeInput,
  formatPhoneNumber,
  formatSalary,
} from "../utils/validation";
```

### Validate Single Field

```javascript
const errors = validateField("email", "user@example.com");
// Returns array of error messages (empty if valid)
```

### Validate Entire Form

```javascript
const { isValid, errors } = validateForm(formData);
if (isValid) {
  // Submit form
} else {
  // Show errors
  console.log(errors); // { email: 'Invalid format', name: 'Required' }
}
```

### Sanitize Input

```javascript
const cleanEmail = sanitizeInput("USER@EXAMPLE.COM", "email");
// Returns: 'user@example.com'
```

### Format Values

```javascript
const formatted = formatSalary(120000);
// Returns: '$120,000'

const phone = formatPhoneNumber("5551234567");
// Returns: '(555) 123-4567'
```

---

## Error Messages

All error messages are user-friendly and descriptive:

### Format Guidelines

**Required Fields:**

- "Full name is required"
- "Email address is required"

**Format Errors:**

- "Please provide a valid email address (e.g., user@example.com)"
- "Please provide a valid 10-digit phone number"

**Length Errors:**

- "Name must be at least 2 characters"
- "Name cannot exceed 50 characters"

**Pattern Errors:**

- "Name should contain only letters, spaces, hyphens, and apostrophes"

---

## Best Practices

### For Developers

1. **Always sanitize input** before storing
2. **Validate on both client and server** for security
3. **Use specific error messages** for user guidance
4. **Show success indicators** to build user confidence
5. **Validate on blur** for real-time feedback
6. **Validate on submit** to catch all errors

### For Users

1. **Check error messages** for guidance
2. **Look for success indicators** (✓)
3. **Character counts** show remaining space
4. **Help text** provides format examples
5. **Tab through fields** for validation workflow

---

## Testing Validation

### Test Cases for Name Field

| Input     | Expected            | Status |
| --------- | ------------------- | ------ |
| John Doe  | Valid               | ✅     |
| J         | Invalid (too short) | ❌     |
| John123   | Invalid (numbers)   | ❌     |
| Mary-Jane | Valid               | ✅     |
| ""        | Invalid (required)  | ❌     |

### Test Cases for Email Field

| Input            | Expected                       | Status |
| ---------------- | ------------------------------ | ------ |
| user@example.com | Valid                          | ✅     |
| invalidemail     | Invalid (format)               | ❌     |
| user@example     | Invalid (no TLD)               | ❌     |
| USER@EXAMPLE.COM | Valid (converted to lowercase) | ✅     |

### Test Cases for Phone Field

| Input           | Expected            | Status |
| --------------- | ------------------- | ------ |
| 5551234567      | Valid               | ✅     |
| (555) 123-4567  | Valid               | ✅     |
| +1-555-123-4567 | Valid               | ✅     |
| 555-123-456     | Invalid (too short) | ❌     |

---

## Troubleshooting

### Validation Not Working?

1. **Check if field is touched**
   - Real-time validation only shows after field is touched
   - Submit button always validates all fields

2. **Check browser console**
   - Look for JavaScript errors
   - Verify import paths are correct

3. **Verify regex patterns**
   - Test patterns in regex tester tools
   - Check for escaped characters

4. **Check server response**
   - Ensure backend validation matches frontend
   - Verify error messages are returned correctly

### User Can't Submit Form?

1. **Check for validation errors**
   - Look for red error messages
   - Scroll through form to find errors

2. **Verify all required fields**
   - Required fields marked with \*
   - Fill in all marked fields

3. **Check data format**
   - Follow format examples in help text
   - Verify character limits are met

---

## Future Enhancements

- [ ] Custom validation rules
- [ ] Async validation (checking email availability)
- [ ] Field dependencies (conditional validation)
- [ ] Multi-language error messages
- [ ] Accessibility improvements (ARIA labels)
- [ ] Animation for error transitions
- [ ] Validation history/audit log

---

## Related Files

- Validation Logic: [validation.js](../client/src/utils/validation.js)
- Component: [EmployeeForm.js](../client/src/components/EmployeeForm.js)
- Styles: [App.css](../client/src/styles/App.css)
- Backend Validation: [employees.js](../server/routes/employees.js)
- Database Schema: [Employee.js](../server/models/Employee.js)

---

## Questions?

Refer to the main README.md or API_DOCUMENTATION.md for more information.
