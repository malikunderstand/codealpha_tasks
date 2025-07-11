// Sticky Header
var target = document.querySelector('#nav');
window.addEventListener('scroll', () => {
if(window.scrollY > 0){
target.classList.add('sticky');
}
else{
target.classList.remove('sticky');
}
});

// Start Here--------------------

// Products

// fetch Product in home page
fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-list');
    container.innerHTML = products.map(product => `
  <div class="col-12 col-lg-3 col-md-4 col-sm-4 mb-4">
  <div class="box">
    <img src="/uploads/${product.image}" class="card-img-top" alt="${product.name}"/>
      <h5 class="card-title mt-2 name">${product.name}</h5>
      <p class="description">${product.description}</p>
       <div class="mt-3" style="display:grid; grid-template-columns:auto; gap:10px;">
      <p class="card-text"><strong>Price Rs. ${product.price}</strong></p>
      <a href="/addcart/${product.id}" class="btn btn-dark text-light form-control w-100">Add To Cart</a>
    </div>
  </div>
</div>

    `).join('');
  })
  .catch(err => {
    console.error('❌ Failed to load products:', err);
  });

  // fetch all Product in shop page
fetch('/api/productss')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-list1');
    container.innerHTML = products.map(product => `
  <div class="col-12 col-lg-3 col-md-4 col-sm-3 mb-4">
  <div class="box">
    <img src="/uploads/${product.image}" class="card-img-top" alt="${product.name}"/>
      <h6 class="name" class="card-title mt-2">${product.name}</h6>
      <p class="description">${product.description}</p>
       <div class="mt-3" style="display:grid; grid-template-columns:auto; gap:10px;">
      <p class="card-text"><strong>Price Rs.${product.price}</strong></p>
      <a href="/addcart/${product.id}" class="btn btn-dark text-light form-control w-100">Add To Cart</a>
    </div>
  </div>
</div>

    `).join('');
  })
  .catch(err => {
    console.error('❌ Failed to load products:', err);
  });

  // Fetch the product Data in to manage the dashboard
  let currentPage = 1;
  const rowsPerPage = 7;
  let productsData = [];

  fetch('/api/tproduct')
    .then(res => res.json())
    .then(products => {
      productsData = products;
      displayTable(productsData, currentPage);
      setupPagination(productsData);
    })
    .catch(err => {
      console.error('❌ Failed to load products:', err);
    });


// Display in product Table
  function displayTable(products, page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = products.slice(start, end);

    const container = document.getElementById('product-lists');
    container.innerHTML = paginatedItems.map(product => `
      <tr>
       <td>${product.id}</td>
        <td><img src="/uploads/${product.image}" alt="${product.name}" style="width: 80px; height: 40px; border-radius: 8px;"></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td><strong>${product.price}</strong></td>
        <td>${product.category_id}</td>
        <td class="d-flex">
        <a href="/uproduct/${product.id}" class="btn btn-warning btn-sm m-1"><i class='bx bx-edit'></i></a>
        <a href="/dlproduct/${product.id}" class="btn btn-danger btn-sm m-1"><i class='bx bx-message-x'></i></a>
        </td>
      </tr>
    `).join('');
  }

  function setupPagination(products) {
    const pageCount = Math.ceil(products.length / rowsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Previous Button
    const prevLi = document.createElement('li');
    prevLi.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevLi.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        displayTable(productsData, currentPage);
        setupPagination(productsData);
      }
    });
    pagination.appendChild(prevLi);

    // Page Numbers
    for (let i = 1; i <= pageCount; i++) {
      const li = document.createElement('li');
      li.className = 'page-item' + (i === currentPage ? ' active' : '');
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', function (e) {
        e.preventDefault();
        currentPage = i;
        displayTable(productsData, currentPage);
        setupPagination(productsData);
      });
      pagination.appendChild(li);
    }

    // Next Button
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item' + (currentPage === pageCount ? ' disabled' : '');
    nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextLi.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage < pageCount) {
        currentPage++;
        displayTable(productsData, currentPage);
        setupPagination(productsData);
      }
    });
    pagination.appendChild(nextLi);
  }

  // End Here--------------------

  // Start Here--------------------

  // Category

  // fetch Category in home page
fetch('/api/category')
  .then(res => res.json())
  .then(categories => {
    const container = document.getElementById('category-list');
    container.innerHTML = categories.map(category => `
      <div class="col-12 col-lg-2 col-md-3 col-sm-6 mb-4">
        <div class="box1">
          <img src="/uploads/${category.profile}" class="card-img-top" alt="${category.name}" />
          <a href="/home" class="card-title mt-2"><h5>${category.name}</h5></a>
        </div>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error('❌ Failed to load categories:', err);
  });

  // Fetch the category Data in to manage the dashboard
  let currentPages = 1;
  const rowsPerPages = 7;
  let categoriesData = [];

  fetch('/api/tcategory')
    .then(res => res.json())
    .then(categories => {
      categoriesData = categories;
      displayTables(categoriesData, currentPages);
      setupPaginations(categoriesData);
    })
    .catch(err => {
      console.error('❌ Failed to load products:', err);
    });

// Display in product Table
  function displayTables(categories, pages) {
    const starts = (pages - 1) * rowsPerPages;
    const ends = starts + rowsPerPages;
    const paginatedItemss = categories.slice(starts, ends);

    const containers = document.getElementById('category-lists');
    containers.innerHTML = paginatedItemss.map(category => `
      <tr>
       <td>${category.id}</td>
        <td><img src="/uploads/${category.profile}" alt="${category.name}" style="width: 80px; height: 40px; border-radius: 8px;"></td>
        <td>${category.name}</td>
        <td>
        <a href="/ucategory/${category.id}" class="btn btn-warning btn-sm"><i class='bx bx-edit'></i></a>
        <a href="/dlcategory/${category.id}" class="btn btn-danger btn-sm"><i class='bx bx-message-x'></i></a>
        </td>
      </tr>
    `).join('');
  }

  function setupPaginations(categories) {
    const pageCounts = Math.ceil(categories.length / rowsPerPages);
    const paginations = document.getElementById('pagination1');
    paginations.innerHTML = '';

    // Previous Button
    const prevLis = document.createElement('li');
    prevLis.className = 'page-item' + (currentPages === 1 ? ' disabled' : '');
    prevLis.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevLis.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPages > 1) {
        currentPages--;
        displayTables(categoriesData, currentPages);
        setupPaginations(categoriesData);
      }
    });
    paginations.appendChild(prevLis);

    // Page Numbers
    for (let i = 1; i <= pageCounts; i++) {
      const lis = document.createElement('li');
      lis.className = 'page-item' + (i === currentPages ? ' active' : '');
      lis.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      lis.addEventListener('click', function (e) {
        e.preventDefault();
        currentPages = i;
        displayTables(categoriesData, currentPages);
        setupPaginations(categoriesData);
      });
      paginations.appendChild(lis);
    }

    // Next Button
    const nextLis = document.createElement('li');
    nextLis.className = 'page-item' + (currentPages === pageCounts ? ' disabled' : '');
    nextLis.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextLis.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPages < pageCounts) {
        currentPages++;
        displayTables(categoriesData, currentPages);
        setupPaginations(categoriesData);
      }
    });
    paginations.appendChild(nextLis);
  }

  //order list 
  let currentPage1 = 1;
  const rowsPerPage1 = 5;
  let ordersData = [];

  // Fetch the orders from the server
  fetch('/api/torder')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(orders => {
      ordersData = orders;
      displayTable1(ordersData, currentPage1);
      setupPagination1(ordersData);
    })
    .catch(err => {
      console.error('❌ Failed to load order data:', err);
    });

  // Display paginated data in table
  function displayTable1(orders, page1) {
    const start1 = (page1 - 1) * rowsPerPage1;
    const end1 = start1 + rowsPerPage1;
    const paginatedItems1 = orders.slice(start1, end1);

    const container1 = document.getElementById('order-lists');
    if (!container1) return console.error('❌ Element with ID "order-lists" not found.');

    // If no orders
    if (paginatedItems1.length === 0) {
      container1.innerHTML = `<tr><td colspan="8">No orders found.</td></tr>`;
      return;
    }

    container1.innerHTML = paginatedItems1.map(order => {
      const quantity1 = parseInt(order.quantity) || 0;
      const price1 = parseFloat((order.price || '0').toString().replace('','')) || 0;
      const total1 = (quantity1 * price1).toFixed(2);

      return `
        <tr>
          <td>${order.id}</td>
          <td><img src="/uploads/${order.image || 'default.jpg'}" alt="${order.name}" style="width: 80px; height: 40px; border-radius: 8px;"></td>
          <td>${order.name}</td>
          <td>${order.description}</td>
          <td>${price1.toFixed(2)}</td>
          <td>${quantity1}</td>
          <td class="card-text"><strong>${total1}</strong></td>
          <td>${order.updated_at}</td>
         <td>${getStatusBadge(order.status)}</td>
          <td class="d-flex">
            <a href="/uorder/${order.id}" class="btn btn-warning btn-sm m-1"><i class="bx bx-edit"></i></a>
            <a href="/dlorder/${order.id}" class="btn btn-danger btn-sm m-1"><i class='bx bx-message-x'></i></a>
          </td>
        </tr>
      `;
    }).join('');
  }


  function getStatusBadge(status) {
    if (status === 'pending'){
    return `<span class="badge bg-secondary text-dark">Pending</span>`;
    }
    else if (status === 'placed'){
    return `<span class="badge bg-warning text-dark">Placed</span>`;
    }
    else if(status === 'shipped'){
     return `<span class="badge bg-info text-dark">Shipped</span>`;
    }
    else if(status === 'delivered'){
     return `<span class="badge bg-success text-dark">Deliverd</span>`;
    }
    else if(status === 'cancelled'){
     return `<span class="badge bg-danger text-dark">Cancelled</span>`;
    }
    else{
    return `<span class="badge bg-secondary">Unknown</span>`;
    }
  }

  // Setup pagination buttons
  function setupPagination1(orders) {
    const pageCount1 = Math.ceil(orders.length / rowsPerPage1);
    const pagination1 = document.getElementById('pagination2');
    if (!pagination1) return console.error('❌ Element with ID "pagination2" not found.');

    pagination1.innerHTML = '';

    // Previous Button
    const prevLi1 = document.createElement('li');
    prevLi1.className = 'page-item' + (currentPage1 === 1 ? ' disabled' : '');
    prevLi1.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevLi1.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage1 > 1) {
        currentPage1--;
        displayTable1(ordersData, currentPage1);
        setupPagination1(ordersData);
      }
    });
    pagination1.appendChild(prevLi1);

    // Page Numbers
    for (let i = 1; i <= pageCount1; i++) {
      const li1 = document.createElement('li');
      li1.className = 'page-item' + (i === currentPage1 ? ' active' : '');
      li1.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li1.addEventListener('click', function (e) {
        e.preventDefault();
        currentPage1 = i;
        displayTable1(ordersData, currentPage1);
        setupPagination1(ordersData);
      });
      pagination1.appendChild(li1);
    }

    // Next Button
    const nextLi1 = document.createElement('li');
    nextLi1.className = 'page-item' + (currentPage1 === pageCount1 ? ' disabled' : '');
    nextLi1.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextLi1.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage1 < pageCount1) {
        currentPage1++;
        displayTable1(ordersData, currentPage1);
        setupPagination1(ordersData);
      }
    });
    pagination1.appendChild(nextLi1);
  }

  // user Dashboard
  let orders1 = [];

  fetch('/api/torders')
    .then(res => {
      if (!res.ok) throw new Error('❌ Network error');
      return res.json();
    })
    .then(data => {
      orders1 = data;
      displayOrdersTableo(orders1);
    })
    .catch(err => {
      console.error('❌ Failed to load orders:', err);
    });

  function displayOrdersTableo(orders1) {
    const containero = document.getElementById('order-lists1');
    if (!containero) return;

    if (orders1.length === 0) {
      containero.innerHTML = `<tr><td colspan="9">No orders found.</td></tr>`;
      return;
    }

    containero.innerHTML = orders1.map((orders1) => {
      const quantityo = parseInt(orders1.quantity) || 0;
      const priceo = parseFloat(orders1.price) || 0;
      const totalo = (priceo * quantityo).toFixed(2);
      return `
        <tr>
          <td>${orders1.id}</td>
          <td><img src="/uploads/${orders1.image}" style="width:60px; height:40px; border-radius:5px;"></td>
          <td>${orders1.name}</td>
          <td>${orders1.description}</td>
          <td>Rs ${priceo.toFixed(2)}</td>
          <td>${quantityo}</td>
          <td><strong>${totalo}</strong></td>
           <td>${orders1.category}</td>
          <td>${orders1.updated_at || ''}</td>
          <td>${getStatusBadges(orders1.status)}</td>
        </tr>
      `;
    }).join('');
  }

  function getStatusBadges(status1) {
    if (status1 === 'pending'){
    return `<span class="badge bg-secondary text-dark">Pending</span>`;
    }
   else if (status1 === 'placed'){
    return `<span class="badge bg-warning text-dark">Placed</span>`;
    }
    else if(status1 === 'shipped'){
     return `<span class="badge bg-info text-dark">Shipped</span>`;
    }
    else if(status1 === 'delivered'){
     return `<span class="badge bg-success text-dark">Deliverd</span>`;
    }
    else if(status1 === 'cancelled'){
     return `<span class="badge bg-danger text-dark">Cancelled</span>`;
    }
    else{
    return `<span class="badge bg-secondary">Unknown</span>`;
    }
  }
