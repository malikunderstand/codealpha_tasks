# MyStore - Simple eCommerce Website

MyStore is a simple full-stack eCommerce website built using Node.js, Express.js, MySQL, and EJS. It allows users to register, login, view products, add items to the cart, and place orders. Admins can manage products, categories, and orders via a secure dashboard.

---

## 👨‍💻 Developed by:

**Nazeer Ahmed**

---

## 🛒 Features

### 🧑‍💼 User Panel

- User registration & login
- View product categories
- Search for products
- Add products to cart
- View cart
- Place order

### 🛠️ Admin Panel

- Secure login for admin
- Add / Update / Delete:
  - Products
  - Categories
  - Orders

---

## 🧰 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap 5

### Backend

- Node.js
- Express.js
- EJS Templates

### Database

- MySQL (`ecommerce` database)

### NPM Packages Used

- `express` – Server framework
- `mysql2` – For MySQL database connection
- `bcrypt` – Password hashing
- `multer` – Image upload handling
- `body-parser`, `ejs`, etc.

---

## 📂 Database Details

**Database Name:** `ecommerce`

### Tables:

- `users`
- `products`
- `category`
- `addcart`
- `orders`

✅ Make sure to import the SQL file `ecommerce.sql` into your MySQL server.

---

## 🔐 Login Credentials

### Admin Login

```
First Name: Nazeer
Last Name: Ahmed
Password: 98765
```

### User Login

- First, register through the user registration form
- Then login using the registered email and password

---

## 🚀 Installation Instructions

```bash
# 1. Clone the repository
git clone https://github.com/malikunderstand/codealpha_tasks

# 2. Navigate to project directory
cd project

# 3. Install dependencies
npm install

# 4. Start the server
node app.js
```

🔗 App will run on `http://localhost:3000/`

---

## 📦 Image Upload

- Product images are uploaded using `multer`
- Images are saved to the `/public/uploads` directory

---

## 📌 Notes

- Make sure MySQL server is running
- Update your `db.js` with your local MySQL credentials
- Use Postman or frontend UI for testing routes

---

## 📄 License

This project is open-source and available for any use.
