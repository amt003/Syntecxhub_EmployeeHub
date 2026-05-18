# Quick Start Guide

## Prerequisites

- Node.js 14+ installed
- MongoDB running locally or MongoDB Atlas account

## Step-by-Step Setup

### Step 1: Start MongoDB

**Local MongoDB:**

```bash
# Windows - Run MongoDB from installed location
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**MongoDB Atlas (Cloud):**

- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string from cluster
- Update MONGODB_URI in server/.env

### Step 2: Start Backend Server

```bash
cd server
npm install
npm run dev
```

Expected output:

```
Server running on port 5000
MongoDB connected: localhost
```

### Step 3: Start Frontend (New Terminal)

```bash
cd client
npm install
npm start
```

The app will automatically open at `http://localhost:3000`

## Testing the Application

### 1. Add an Employee

- Click "+ Add New Employee" button
- Fill in all the required fields
- Click "Add Employee"

### 2. View Employees

- Employees appear in a table on the main page
- Shows name, email, role, department, salary, phone, and status

### 3. Edit an Employee

- Click "Edit" button next to an employee
- Modal opens with employee details
- Update information and save

### 4. Delete an Employee

- Click "Delete" button
- Confirm deletion
- Employee removed from list

### 5. Form Validation

- Try leaving fields empty - validation errors appear
- Try invalid email format - error shows
- Try non-10-digit phone - error shows

## Sample Employee Data

Copy and paste for testing:

```
Name: John Doe
Email: john.doe@example.com
Role: Senior Software Engineer
Department: IT
Salary: 120000
Phone: 5551234567
Address: 123 Main Street, New York, NY 10001
Status: Active
```

## Troubleshooting

### Port 5000 Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID [PID_NUMBER] /F
```

### Cannot Connect to MongoDB

- Check if MongoDB is running
- Verify connection string in .env
- Check firewall settings

### Frontend Shows Connection Error

- Verify backend is running on port 5000
- Check browser console for errors
- Verify proxy in client/package.json

### Form Validation Not Working

- Clear browser cache (Ctrl+Shift+Delete)
- Check console for JavaScript errors
- Refresh the page

## File Structure Overview

### Backend Important Files

- `server/server.js` - Main server entry
- `server/routes/employees.js` - All API endpoints
- `server/models/Employee.js` - Database schema
- `server/config/db.js` - Database connection

### Frontend Important Files

- `client/src/App.js` - Main React component
- `client/src/components/EmployeeForm.js` - Form logic and validation
- `client/src/components/EmployeeList.js` - Table display
- `client/src/services/api.js` - API calls
- `client/src/styles/App.css` - All styling

## Next Steps

1. ✅ Application is running
2. 📝 Create some test employees
3. 🔧 Explore edit and delete features
4. 📱 Test on mobile devices (Chrome DevTools)
5. 🚀 Deploy to production (Heroku, Vercel, etc.)

## Need Help?

Check the main README.md for:

- Detailed API documentation
- Validation rules
- Technology stack
- Deployment instructions

Enjoy! 🎉
