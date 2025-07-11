const express = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const db = require('./db');

const app = express();

const bcrypt = require('bcryptjs');

const router = express.Router();


/* -------------------- MIDDLEWARE SETUP -------------------- */

// Session Setup
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON requests if needed

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

/* -------------------- MULTER SETUP -------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/* -------------------- ROUTES -------------------- */

// Public Pages
app.get(['/', '/home'], (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/home.html'))
);
app.get('/shop', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/shop.html'))
);
app.get('/about', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/about.html'))
);
app.get('/contact', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/contact.html'))
);

// Login Page
app.get('/login', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/login.html'))
);

// Admin Dashboard (Protected)
app.get('/admin', (req, res) => {
  if (!req.session.loggedIn) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views/pages/admin.html'));
});

// Dashboard Interfaces
app.get('/dproduct', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/dproduct.html'))
);
app.get('/aproduct', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/aproduct.html'))
);
app.get('/dcategory', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/dcategory.html'))
);
app.get('/acategory', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/acategory.html'))
);
app.get('/dorder', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/dorder.html'))
);
app.get('/user', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/pages/user.html'))
);

/* -------------------- AUTH LOGIC -------------------- */

// Admin Login
app.post('/login', (req, res) => {
  const { username, lastname, password } = req.body;

  if (username === 'Nazeer' && lastname === 'Ahmed' && password === '98765') {
    req.session.loggedIn = true;
    return res.redirect('/admin');
  }
  res.redirect('/login?error=Invalid Credentials');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// User Login
app.get('/logins', (req, res) => {
  res.render('logins');
});

// Login POST
app.post('/logins', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.send('Error');
    if (results.length === 0) return res.send('Invalid email or password');

    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.send('Invalid email or password');

    req.session.userId = results[0].id;
    res.redirect('/user');
  });
});

// Register GET
app.get('/register', (req, res) => {
  res.render('register');
});

// Register POST
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    (err) => {
      if (err) return res.send('Registration error');
      res.redirect('/logins');
    });
});

// Dashboard GET
app.get('/user', (req, res) => {
  if (!req.session.userId) return res.redirect('/logins');
  res.render('user');
});

// Logout
app.get('/logouts', (req, res) => {
  req.session.destroy();
  res.redirect('/home');
});

// 1: -----------------------------------------------Product----//

// Start Here--------------------

/* -------------------- ADD PRODUCT LOGIC -------------------- */

// Add category products
app.post('/addproducts', upload.single('image'), (req, res) => {
  const { name, description, price, category_id } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !image || !category_id) {
    return res.status(400).send("❌ All fields are required.");
  }

  const sql = `
    INSERT INTO products (name, price, description, image, category_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, price, description, image, category_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Database error.");
    }
    res.redirect('addproducts');
  });
});

// 👇 GET: Load product data and render EJS update form
app.get('/uproduct/:id', (req, res) => {
  const id = req.params.id;

  const productQuery = 'SELECT * FROM products WHERE id = ?';
  const categoryQuery = 'SELECT * FROM category';

  db.query(productQuery, [id], (err, productResult) => {
    if (err || productResult.length === 0) {
      console.error("❌ Error fetching product:", err);
      return res.status(404).send('Product not found');
    }

    db.query(categoryQuery, (err, categoryResult) => {
      if (err) {
        console.error("❌ Error fetching categories:", err);
        return res.status(500).send('Category fetch failed');
      }

      res.render('updateproduct', {
        product: productResult[0],
        categories: categoryResult
      });
    });
  });
});

app.get('/updateproduct/:id', (req, res) => {
  const productId = req.params.id;

  const productQuery = 'SELECT * FROM products WHERE id = ?';
  const categoryQuery = 'SELECT * FROM category';

  db.query(productQuery, [productId], (err, productResult) => {
    if (err || productResult.length === 0) {
      console.error("❌ Error fetching product:", err);
      return res.status(404).send('Product not found');
    }

    db.query(categoryQuery, (err, categoryResult) => {
      if (err) {
        console.error("❌ Error fetching categories:", err);
        return res.status(500).send('Server Error');
      }

      res.render('updateproduct', {
        product: productResult[0],
        categories: categoryResult
      });
    });
  });
});

app.post('/updateproduct', upload.single('image'), (req, res) => {
  const { id, name, detail, number, category_id } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!id) {
    return res.status(400).send("❌ Product ID is required.");
  }

  // Build dynamic SQL based on provided fields
  let updates = [];
  let values = [];

  if (name) {
    updates.push("name = ?");
    values.push(name.trim());
  }
  if (detail) {
    updates.push("description = ?");
    values.push(detail.trim());
  }
  if (number) {
    updates.push("price = ?");
    values.push(number.trim());
  }
  if (category_id) {
    updates.push("category_id = ?");
    values.push(category_id);
  }
  if (image) {
    updates.push("image = ?");
    values.push(image);
  }

  if (updates.length === 0) {
    return res.status(400).send("❌ No data to update.");
  }

  const sql = `UPDATE products SET ${updates.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Update Error:", err);
      return res.status(500).send("❌ Could not update product.");
    }

    res.redirect('/dproduct');
  });
});

/* -------------------- Get PRODUCT LOGIC -------------------- */
// route product in home page
app.get('/api/products', (req, res) => {
  const sql = "SELECT * FROM products WHERE id>=1 AND id<=37";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      return res.status(500).send('Database Error');
    }
    res.json(results); // 🔁 Send product list to frontend
  });
});

// route product in shop page
app.get('/api/productss', (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      return res.status(500).send('Database Error');
    }
    res.json(results); // 🔁 Send product list to frontend
  });
});


// route product in table list
app.get('/api/tproduct', (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      return res.status(500).send('Database Error');
    }
    res.json(results); // 🔁 Send product list to frontend
  });
});

// Delete route product table list 
app.get('/dlproduct/:id', (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting product:', err);
      return res.status(500).send('Database delete failed');
    }
    res.redirect('/dproduct'); // 👈 After delete, redirect back to product list
  });
});

// End Here---------------------

// 2: ----------------------------------------------Category-----//

// Start Here--------------------

/* -------------------- Get category LOGIC -------------------- */

// category
app.get('/addproducts', (req, res) => {
  db.query('SELECT * FROM category', (err, categories) => {
    if (err) {
      console.error(err);
      return res.status(500).send('❌ Category load failed');
    }
    res.render('addproducts', { categories });
  });
});

// Add Category in MySql
app.post('/addcategory', upload.single('img1'), (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !image) {
    return res.status(400).send('❌ Name or image missing');
  }

  const sql = "INSERT INTO category (name, profile) VALUES (?, ?)";
  const values = [name, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error adding category:', err);
      return res.status(500).send('❌ Database Error');
    }

    res.redirect('/dcategory'); // ✅ Redirect to category list page
  });
});

// route category in home page
app.get('/api/category', (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      return res.status(500).send('Database Error');
    }
    res.json(results); // 🔁 Send product list to frontend
  });
});

// route product in table list
app.get('/api/tcategory', (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching Category:', err);
      return res.status(500).send('Database Error');
    }
    res.json(results); // 🔁 Send Category list to frontend
  });
});

/// 👇 GET: Load Category data and render EJS update form
app.get('/ucategory/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM category WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('Category not found');

    res.render('updatecategory', { category: results[0] }); // Pass category to EJS form
  });
});


// / 👇 POST: Update Category with optional image
app.post('/updatecategory', upload.single('img'), (req, res) => {
  const { id, name, } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!id || !name || !image) {
    return res.status(400).send('Missing required fields');
  }

  let sql, data;

  if (image) {
    // ✅ Image uploaded
    sql = `UPDATE category SET name = ?, profile = ? WHERE id = ?`;
    data = [name, image, id];
  } else {
    // ❌ Image not uploaded, keep old one
    sql = `UPDATE category SET name = ?  WHERE id = ?`;
    data = [name, id];
  }

  db.query(sql, data, (err, result) => {
    if (err) {
      console.error('❌ DB Update Error:', err);
      return res.status(500).send('Database update failed');
    }
    res.redirect('/dcategory');
  });
});

// Delete route product table list 
app.get('/dlcategory/:id', (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM category WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting category:', err);
      return res.status(500).send('Database delete failed');
    }
    res.redirect('/dcategory'); // 👈 After delete, redirect back to product list
  });
});

// route order in table list
app.get('/api/torder', (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, resultss) => {
    if (err) {
      console.error('❌ Error fetching Order:', err);
      return res.status(500).send('Database Error');
    }
    res.json(resultss); // 🔁 Send Crder list to frontend
  });
});

// route order in table list
app.get('/api/torders', (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, resultss1) => {
    if (err) {
      console.error('❌ Error fetching Order:', err);
      return res.status(500).send('Database Error');
    }
    res.json(resultss1); // 🔁 Send Crder list to frontend
  });
});

//1: get ejs uorder file
app.get('pages/uorder', (req, res) => {
  res.render('pages/uorder'); // ❌ No products passed here!
});

// GET: Show order update form
app.get('/uorder/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM orders WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send('Error fetching order');
    if (result.length === 0) return res.status(404).send('Order not found');
    res.render('uorder', { order: result[0] });  // ✅ Correct file
  });
});

// POST: Update order status
app.post('/updateorder/:id', (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).send('Error updating order');
    res.redirect('/dorder');  // ✅ Your order list route
  });
});


// Delete route order table list 
app.get('/dlorder/:id', (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM orders WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting orders:', err);
      return res.status(500).send('Database delete failed');
    }
    res.redirect('/dorder'); // 👈 After delete, redirect back to product list
  });
});

app.get('/addcart/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, result) => {
    if (err || result.length === 0) return res.send("Not Found");
    res.render('addcart', { product: result[0], cartCount: 0 });
  });
});

app.post('/addcart', (req, res) => {
  const { id, quantity } = req.body;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
    if (err || result.length === 0) return res.send("Product Not Found");
    const p = result[0];
    const sql = `INSERT INTO addcarts (name, price, description, quantity, image, category) VALUES (?, ?, ?, ?, ?,?)`;
    db.query(sql, [p.name, p.price, p.description, quantity, p.image, p.category_id], (err2) => {
      if (err2) return res.send("Insert Failed");
      res.redirect('/cart');
    });
  });
});

// Cart List
app.get('/cart', (req, res) => {
  db.query('SELECT * FROM addcarts', (err, results) => {
    if (err) return res.send("DB Error");
    res.render('cart', { cartItems: results, cartCount: results.length });
  });
});

// Delete route product table list 
app.get('/dlcart/:id', (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM addcart WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting category:', err);
      return res.status(500).send('Database delete failed');
    }
    res.redirect('/home'); // 👈 After delete, redirect back to product list
  });
});

// View Single Product in Cart by ID
app.get('/viewproduct/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM addcarts WHERE id = ?', [id], (err, result) => {
    if (err || result.length === 0) {
      return res.send("Product not found in cart");
    }

    const product = result[0];
    res.render('viewproduct', { product });
  });
});

// ✅ GET Route to Place Order (one product using ID)
app.get('/cart/placeorder/:id', (req, res) => {
  const id = req.params.id;

  // 1. Get the item from cart with the given ID
  db.query('SELECT * FROM addcarts WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).send("❌ Item not found in cart");

    const item = results[0];

    // 2. Insert it into 'orders' table
    db.query(
      'INSERT INTO orders (name, price, description, quantity, image, category, status) VALUES (?, ?, ?, ?, ?, ?, "placed")',
      [item.name, item.price, item.description, item.quantity, item.image, item.category],
      (err2) => {
        if (err2) return res.status(500).send("❌ Failed to insert into orders");

        // 3. Delete the item from cart
        db.query('DELETE FROM addcarts WHERE id = ?', [id], (err3) => {
          if (err3) return res.send("✅ Ordered but not removed from cart");

          res.redirect('/thankyou'); // 🎉 Thank you page
        });
      }
    );
  });
});


/// ✅ Thank You Page Route
app.get('/thankyou', (req, res) => {
  res.render('thankyou'); // correct path if your EJS file is inside views/pages
});

//1: get ejs Mobile Accessories file
app.get('pages/mobile', (req, res) => {
  res.render('pages/mobile'); // ❌ No products passed here!
});

app.get('/mobile', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '1'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('mobile', { products: result }); // ✅ Make sure this path is correct
  });
});

//2: get ejs Electronic & Gadget
app.get('pages/electronic', (req, res) => {
  res.render('pages/electronic'); // ❌ No products passed here!
});

app.get('/electronic', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '2'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('electronic', { products: result }); // ✅ Make sure this path is correct
  });
});


//3: get ejs Home & Furniture file
app.get('pages/furniture', (req, res) => {
  res.render('pages/furniture'); // ❌ No products passed here!
});

app.get('/furniture', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '3'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('furniture', { products: result }); // ✅ Make sure this path is correct
  });
});

//4: get ejs beauty & personal care file
app.get('pages/beauty', (req, res) => {
  res.render('pages/beauty'); // ❌ No products passed here!
});

app.get('/beauty', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '4'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('beauty', { products: result }); // ✅ Make sure this path is correct
  });
});

//5: get ejs Health & Fitness
app.get('pages/health', (req, res) => {
  res.render('pages/health'); // ❌ No products passed here!
});

app.get('/health', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '5'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('health', { products: result }); // ✅ Make sure this path is correct
  });
});

//6: get ejs  Groceries & Essentials
app.get('pages/groce', (req, res) => {
  res.render('pages/groce'); // ❌ No products passed here!
});

app.get('/groce', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '6'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('groce', { products: result }); // ✅ Make sure this path is correct
  });
});

//7: get ejs Cleaning & Laundry
app.get('pages/clean', (req, res) => {
  res.render('pages/clean'); // ❌ No products passed here!
});

app.get('/clean', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '7'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('clean', { products: result }); // ✅ Make sure this path is correct
  });
});

//8: get ejs Books & Stationery
app.get('pages/book', (req, res) => {
  res.render('pages/book'); // ❌ No products passed here!
});

app.get('/book', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '8'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('book', { products: result }); // ✅ Make sure this path is correct
  });
});

//9: get ejs Toys & Baby Products
app.get('pages/baby', (req, res) => {
  res.render('pages/baby'); // ❌ No products passed here!
});

app.get('/baby', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '9'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('baby', { products: result }); // ✅ Make sure this path is correct
  });
});

//11: get ejs Automobile Accessories
app.get('pages/auto', (req, res) => {
  res.render('pages/auto'); // ❌ No products passed here!
});

app.get('/auto', (req, res) => {
  const sql = "SELECT * FROM products WHERE category_id = '11'"; // ✅ Check correct table name

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);  // Log database error in terminal
      return res.status(500).send("Server Error");
    }

    console.log("✅ Products fetched:", result); // See what's coming from DB

    res.render('auto', { products: result }); // ✅ Make sure this path is correct
  });
});

// Search

app.get('/search', (req, res) => {
  const searchTerm = req.query.q;

  const sql = "SELECT * FROM products WHERE name LIKE ?";
  db.query(sql, [`%${searchTerm}%`, `%${searchTerm}%`], (err, result) => {
    if (err) return res.status(500).send('Database error');

    console.log('📦 Products:', result); // 👈 Confirm data in console
    res.render('searchresults', { products: result });
  });
});

/* -------------------- SERVER START -------------------- */

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});

