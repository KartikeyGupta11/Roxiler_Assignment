# FullStack Intern Coding Challenge – Roxiler Assignment

## Demo Video

You can watch a short demo of the application here:
[Watch Demo Video on Google Drive](https://drive.google.com/file/d/1Om6-X60o1uG019IpwrCF-mwfvYtd75sr/view?usp=sharing)

## Tech Stack

- **Backend:** Express.js
- **Database:** MongoDB (Note: The assignment requested PostgreSQL/MySQL, but MongoDB is used in this implementation. The rest of the requirements are fully met.)
- **Frontend:** React.js (with Vite)

---

## Project Overview

This web application allows users to submit ratings for stores registered on the platform. It features a single login system for all users, with role-based access and dashboards. The three user roles are:

- **System Administrator**
- **Normal User**
- **Store Owner**

---

## How to Run

### Backend

1. `cd Backend`
2. Install dependencies: `npm install`
3. Set up a `.env` file with your MongoDB URI and mail credentials:
   ```env
   MONGO_URI=your_mongodb_uri
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_email_password
   PORT=5000
   ```
4. Start the server: `npm run start`

### Frontend

1. `cd Frontend`
2. Install dependencies: `npm install`
3. Start the frontend: `npm run dev`
4. Visit [http://localhost:5173](http://localhost:5173)

---

## How to Register & Login

### Registration (Normal User)

- Go to the **Register** page (`/register`).
- Fill in your Name, Email, Address, and Password.
- Submit the form to create a new account as a Normal User.

### Login (All Roles)

- Go to the **Login** page (`/login`).
- Enter your registered Email and Password.
- Upon successful login, you will be redirected to your dashboard based on your role.

### System Administrator & Store Owner Accounts

- These accounts are created by the System Administrator via the admin dashboard.
- Credentials are provided to the respective users by the admin.

---

## User Roles & Functionalities

### 1. System Administrator

- **Add new stores, normal users, and admin users**
- **Dashboard**: View total users, stores, and submitted ratings
- **Add new users**: Name, Email, Password, Address
- **View & filter lists**: Stores (Name, Email, Address, Rating), Users (Name, Email, Address, Role)
- **View user details**: Name, Email, Address, Role (and Rating for Store Owners)
- **Logout**

### 2. Normal User

- **Sign up and log in**
- **Update password** after login
- **View all registered stores**
- **Search stores** by Name and Address
- **Store listings**: Store Name, Address, Overall Rating, User's Submitted Rating, option to submit/modify rating
- **Submit ratings** (1 to 5) for stores
- **Logout**

### 3. Store Owner

- **Log in**
- **Update password** after login
- **Dashboard**: View users who rated their store, see average rating
- **Logout**

---

## Form Validations

- **Name:** 20–60 characters
- **Address:** Max 400 characters
- **Password:** 8–16 characters, at least one uppercase letter and one special character
- **Email:** Standard email validation

---

## Additional Features

- All tables support sorting (ascending/descending) for key fields (Name, Email, etc.)
- Follows best practices for frontend and backend development
- Database schema designed with best practices

---

## Project Structure

- **Backend:** Express.js API with role-based authentication, MongoDB models, and RESTful routes
- **Frontend:** React.js SPA with Vite, role-based dashboards, and form validation

---

## How to Run

### Backend

1. `cd Backend`
2. Install dependencies: `npm install`
3. Set up a `.env` file with your MongoDB URI and mail credentials:
   ```env
   MONGO_URI=your_mongodb_uri
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_email_password
   PORT=5000
   ```
4. Start the server: `npm run start`

### Frontend

1. `cd Frontend`
2. Install dependencies: `npm install`
3. Start the frontend: `npm run dev`
4. Visit [http://localhost:5173](http://localhost:5173)

---

## Notes

- The application meets all assignment requirements except for the database choice (MongoDB instead of PostgreSQL/MySQL).
- All role-based functionalities, validations, and sorting/filtering features are implemented as specified.
- For any questions or improvements, please refer to the codebase or contact the author.
