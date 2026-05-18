# Employee Hub - MERN Stack Application

A full-stack employee management system built with MongoDB, Express, React, and Node.js (MERN). This application allows you to manage employees with CRUD operations, form validation, and a responsive design.

## Features

✅ **Complete CRUD Operations**

- Create new employees
- Read/list all employees
- Update employee information
- Delete employees

✅ **Employee Information Management**

- Name, Email, Job Role, Department
- Salary, Phone Number, Address
- Employment Status (Active, Inactive, On Leave)

✅ **Form Validation**

- Client-side validation with detailed error messages
- Server-side validation using express-validator
- Email format and phone number validation
- Required field validation

✅ **Responsive Design**

- Mobile-friendly interface
- Tablet and desktop optimized
- Flexible layouts for all screen sizes

✅ **User-Friendly Interface**

- Clean and modern UI with gradient design
- Modal for editing employees
- Status badges for employee status
- Loading states and error handling
- Success alerts for operations

## Project Structure

```
EmployeeHub/
├── server/                    # Backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── models/
│   │   └── Employee.js       # Employee schema and model
│   ├── routes/
│   │   └── employees.js      # Employee API routes
│   ├── middleware/
│   │   └── errorHandler.js   # Error handling middleware
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env                  # Environment variables
│
└── client/                    # Frontend
    ├── public/
    │   └── index.html        # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── Header.js             # Header component
    │   │   ├── EmployeeForm.js       # Form for add/edit
    │   │   ├── EmployeeList.js       # Employee list table
    │   │   ├── EditEmployeeModal.js  # Edit modal
    │   │   └── Alert.js              # Alert notification
    │   ├── services/
    │   │   └── api.js                # API service
    │   ├── styles/
    │   │   └── App.css               # Main styles
    │   ├── App.js                    # Main app component
    │   ├── index.js                  # React entry point
    │   └── package.json
    └── .gitignore
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)

## Installation

### 1. Clone or Extract the Project

```bash
cd EmployeeHub
```

### 2. Setup Backend

```bash
cd server
npm install
```

**Configure Environment Variables:**

Edit `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employeehub
NODE_ENV=development
```

For MongoDB Atlas (cloud):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employeehub?retryWrites=true&w=majority
```

**Start MongoDB:**

If using local MongoDB:

```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

**Run Backend Server:**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run at `http://localhost:5000`

### 3. Setup Frontend

```bash
cd client
npm install
```

**Start Frontend:**

```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:5000/api`

#### Get All Employees

```
GET /employees
Response: { success: true, count: number, data: [...] }
```

#### Get Single Employee

```
GET /employees/:id
Response: { success: true, data: {...} }
```

#### Create Employee

```
POST /employees
Body: {
  name: string,
  email: string,
  role: string,
  salary: number,
  department: string,
  phone: string,
  address: string,
  status: string
}
Response: { success: true, message: string, data: {...} }
```

#### Update Employee

```
PUT /employees/:id
Body: { same as POST }
Response: { success: true, message: string, data: {...} }
```

#### Delete Employee

```
DELETE /employees/:id
Response: { success: true, message: string }
```

## Validation Rules

### Employee Form Validation

| Field      | Rules                                |
| ---------- | ------------------------------------ |
| Name       | Required, min 2 characters           |
| Email      | Required, valid email format, unique |
| Role       | Required, min 2 characters           |
| Salary     | Required, positive number            |
| Department | Required                             |
| Phone      | Required, 10-digit format            |
| Address    | Required                             |
| Status     | Active, Inactive, or On Leave        |

## Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend

- **React 18** - UI library
- **Axios** - HTTP client
- **React Router** - Navigation (optional)
- **CSS3** - Styling

## Features Details

### 1. Employee Management

- Add new employees with complete information
- View all employees in a paginated table
- Edit employee details
- Delete employees with confirmation

### 2. Form Validation

- Real-time validation feedback
- Client-side validation for better UX
- Server-side validation for security
- Detailed error messages

### 3. Responsive Design

- Mobile: 480px and below
- Tablet: 481px to 768px
- Desktop: 769px and above
- Touch-friendly buttons and inputs

### 4. Status Management

- Active (Green badge)
- Inactive (Red badge)
- On Leave (Yellow badge)

### 5. Data Formatting

- Salary formatted as currency (USD)
- Phone numbers with validation
- Email validation

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Display specific field errors
- **Network Errors**: Show user-friendly error messages
- **Database Errors**: Handle MongoDB connection and query errors
- **Duplicate Email**: Prevent duplicate email addresses

