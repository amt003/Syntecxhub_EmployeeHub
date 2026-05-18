# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, the API doesn't require authentication. For production, implement JWT tokens.

## Content Type

All requests and responses use `application/json`

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Endpoints

### 1. Get All Employees

**Endpoint:** `GET /employees`

**Description:** Retrieve all employees from the database

**Query Parameters:** None

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Software Engineer",
      "salary": 120000,
      "department": "IT",
      "phone": "5551234567",
      "address": "123 Main St",
      "status": "Active",
      "createdAt": "2024-05-16T10:30:00Z",
      "updatedAt": "2024-05-16T10:30:00Z"
    }
  ]
}
```

**Status Codes:**

- `200` - Success
- `500` - Server error

---

### 2. Get Employee by ID

**Endpoint:** `GET /employees/:id`

**Description:** Retrieve a specific employee by ID

**URL Parameters:**

- `id` (required) - Employee MongoDB ID

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Software Engineer",
    "salary": 120000,
    "department": "IT",
    "phone": "5551234567",
    "address": "123 Main St",
    "status": "Active",
    "createdAt": "2024-05-16T10:30:00Z",
    "updatedAt": "2024-05-16T10:30:00Z"
  }
}
```

**Status Codes:**

- `200` - Success
- `404` - Employee not found
- `500` - Server error

---

### 3. Create Employee

**Endpoint:** `POST /employees`

**Description:** Create a new employee

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Software Engineer",
  "salary": 120000,
  "department": "IT",
  "phone": "5551234567",
  "address": "123 Main Street",
  "status": "Active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Software Engineer",
    "salary": 120000,
    "department": "IT",
    "phone": "5551234567",
    "address": "123 Main Street",
    "status": "Active",
    "createdAt": "2024-05-16T10:30:00Z",
    "updatedAt": "2024-05-16T10:30:00Z"
  }
}
```

**Validation Rules:**

- `name` - Required, min 2 characters
- `email` - Required, valid email format, unique
- `role` - Required, min 2 characters
- `salary` - Required, positive number
- `department` - Required
- `phone` - Required, 10-digit format
- `address` - Required
- `status` - Optional, default: "Active"

**Status Codes:**

- `201` - Created successfully
- `400` - Validation error
- `500` - Server error

**Example Error Response:**

```json
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "value": "",
      "msg": "Name must be at least 2 characters",
      "param": "name",
      "location": "body"
    }
  ]
}
```

---

### 4. Update Employee

**Endpoint:** `PUT /employees/:id`

**Description:** Update an existing employee

**URL Parameters:**

- `id` (required) - Employee MongoDB ID

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "role": "Senior Software Engineer",
  "salary": 150000,
  "department": "IT",
  "phone": "5559876543",
  "address": "456 Oak Avenue",
  "status": "Active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "role": "Senior Software Engineer",
    "salary": 150000,
    "department": "IT",
    "phone": "5559876543",
    "address": "456 Oak Avenue",
    "status": "Active",
    "createdAt": "2024-05-16T10:30:00Z",
    "updatedAt": "2024-05-16T11:45:00Z"
  }
}
```

**Validation Rules:** Same as Create

**Status Codes:**

- `200` - Updated successfully
- `400` - Validation error
- `404` - Employee not found
- `500` - Server error

---

### 5. Delete Employee

**Endpoint:** `DELETE /employees/:id`

**Description:** Delete an employee

**URL Parameters:**

- `id` (required) - Employee MongoDB ID

**Response:**

```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

**Status Codes:**

- `200` - Deleted successfully
- `404` - Employee not found
- `500` - Server error

---

### 6. Health Check

**Endpoint:** `GET /api/health`

**Description:** Check if server is running

**Response:**

```json
{
  "success": true,
  "message": "Server is running"
}
```

**Status Codes:**

- `200` - Server is running

---

## Error Codes

| Code  | Meaning       | Solution                                  |
| ----- | ------------- | ----------------------------------------- |
| 400   | Bad Request   | Check request body and validation rules   |
| 404   | Not Found     | Verify employee ID exists                 |
| 500   | Server Error  | Check server logs                         |
| 11000 | Duplicate Key | Email already exists, use different email |

---

## Field Validation Details

### Email Format

- Must be valid email: `example@domain.com`
- Must be unique (no duplicate emails)
- Required field

### Phone Number

- Must be exactly 10 digits: `5551234567`
- Can include country code: `+1-555-123-4567`
- Required field

### Salary

- Must be a positive number
- No decimal places required
- Minimum value: 0

### Status

- Valid values: `"Active"`, `"Inactive"`, `"On Leave"`
- Default: `"Active"`

---

## Curl Examples

### Create Employee

```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Project Manager",
    "salary": 100000,
    "department": "Management",
    "phone": "5551112222",
    "address": "789 Pine Road",
    "status": "Active"
  }'
```

### Get All Employees

```bash
curl http://localhost:5000/api/employees
```

### Get Single Employee

```bash
curl http://localhost:5000/api/employees/507f1f77bcf86cd799439011
```

### Update Employee

```bash
curl -X PUT http://localhost:5000/api/employees/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "role": "Senior Project Manager",
    "salary": 120000,
    "department": "Management",
    "phone": "5551112222",
    "address": "789 Pine Road",
    "status": "Active"
  }'
```

### Delete Employee

```bash
curl -X DELETE http://localhost:5000/api/employees/507f1f77bcf86cd799439011
```

---

## Notes

- All timestamps are in ISO 8601 format
- IDs are MongoDB ObjectIDs (24-character hex strings)
- Salary is stored as a number (integer)
- Status changes don't affect data integrity
- Deleted employees are permanently removed

---

## Rate Limiting

Currently not implemented. For production, implement rate limiting to prevent abuse.

## CORS Policy

Currently allows all origins. For production, restrict to specific domains in server configuration.
