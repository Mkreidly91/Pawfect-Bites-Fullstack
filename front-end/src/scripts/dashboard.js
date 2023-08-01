let selectedProduct;
let selectedImage;
let category_id;
let category_added;

document.addEventListener('DOMContentLoaded', async () => {
  const input_title = document.getElementById('title');
  const input_description = document.getElementById('description');
  const input_category = document.getElementById('category');
  const change_category = document.getElementById('change-category');
  const input_price = document.getElementById('price');
  const img = document.getElementById('board-img');

  input_category.addEventListener('change', async (e) => {
    const value = e.target.value;
    const products = await fetchByCategory(value);
    populateOptions(products);
  });
  change_category.addEventListener('change', async (e) => {
    const value = e.target.value;
    category_added = e.target.value;
  });
  document
    .getElementById('img-input')
    .addEventListener('change', handleFileSelect);
  const select_product = document.getElementById('select-products');
  resetPage();

  select_product.addEventListener('change', async (e) => {
    const value = e.target.value;
    if (!value) return;
    if (value === '+') {
      resetPage();

      return;
    }

    const product = await fetchById(value);
    const { id, title, description, category_id, price, image } = product;
    selectedProduct = id;
    fillPage(title, description, category_id, price, image);
  });

  const allProducts = await fetchProducts();

  populateOptions(allProducts);
});

function populateOptions(productArr) {
  const select = document.getElementById('select-products');
  const baseOptions = ` <option value=""></option>
                          <option value="+">Add product</option>`;
  select.innerHTML = baseOptions;
  productArr.forEach((element) => {
    const { id, title, description, price } = element;
    select.innerHTML += `<option value="${id}">${title}</option>`;
  });
}

function fillPage(title, description, category, price, image) {
  const input_title = document.getElementById('title');
  const input_description = document.getElementById('description');
  const input_category = document.getElementById('change-category');
  const input_price = document.getElementById('price');
  const img = document.getElementById('board-img');
  const button_container = document.getElementById('button-container');
  input_title.value = title;
  input_description.value = description;
  input_category.value = category === 1 ? 'Cat' : 'Dog';
  input_price.value = price;
  img.src = image ? image : '../src/assets/images/empty.webp';
  button_container.innerHTML = `<span class="crud-button inter" id="update">Update</span>
                                <span class="crud-button inter" id="delete">Delete</span>
                               `;

  document.getElementById('update').addEventListener('click', async () => {
    try {
      const body = {
        title: input_title.value,
        description: input_description.value,
        price: input_price.value,
        img: selectedImage,
        category_id: category_added,
      };

      const res = await updateProduct(selectedProduct, body);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  });

  document.getElementById('delete').addEventListener('click', async () => {
    try {
      await deleteProduct(selectedProduct);
      location.reload();
    } catch (error) {}
  });
}

function resetPage() {
  const input_title = document.getElementById('title');
  const input_description = document.getElementById('description');
  const input_category = document.getElementById('category');
  const change_category = document.getElementById('change-category');
  const input_price = document.getElementById('price');
  const button_container = document.getElementById('button-container');
  const fileInput = document.getElementById('img-input').files[0];
  const img = (document.getElementById('board-img').src =
    '../src/assets/images/empty.webp');
  input_title.value = '';
  input_description.value = '';
  input_category.value = '';
  input_price.value = '';
  change_category.value = '';

  button_container.innerHTML = `<span class="crud-button inter" id="add">add</span>`;
  document.getElementById('add').addEventListener('click', async () => {
    try {
      if (!checkAddFields()) {
        return;
      }
      const body = {
        title: input_title.value,
        description: input_description.value,
        price: Number(input_price.value),
        img: selectedImage,
        category_id: category_added,
      };
      console.log(body);

      const response = await addNewProduct(body);
      console.log(response);
      // location.reload();
    } catch (error) {
      console.log(error);
    }
  });
}

async function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const base64String = e.target.result;
    document.getElementById('board-img').src = base64String;
    selectedImage = base64String;
  };

  reader.readAsDataURL(file);
}

function checkAddFields() {
  const input_title = document.getElementById('title').value;
  const input_description = document.getElementById('description').value;
  const input_category = document.getElementById('change-category').value;
  const input_price = document.getElementById('price').value;
  const input_file = document.getElementById('img-input').files[0];
  const arr = [
    input_file,
    input_description,
    input_category,
    input_price,
    input_file,
    input_title,
  ];
  if (!arr.every((element) => element)) {
    document.getElementById('error').innerText = 'All fields are required.';
    return false;
  }
  return true;
}

// Fetches
async function fetchProducts(category = '') {
  try {
    const items_req = await fetch(
      `http://127.0.0.1:8000/api/products/${category}`
    );
    const allProducts = await items_req.json();
    if (allProducts) {
      const { data } = allProducts;

      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchById(id) {
  try {
    const items_req = await fetch(`http://127.0.0.1:8000/api/getFromId/${id}`);
    const allProducts = await items_req.json();
    if (allProducts) {
      const { data } = allProducts;

      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(product_id, body) {
  // fetch then append]
  console.log(body);
  try {
    const items_req = await fetch(
      `http://127.0.0.1:8000/api/updateProduct/${product_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const response = await items_req.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
async function deleteProduct(id) {
  try {
    const items_req = await fetch(
      `http://127.0.0.1:8000/api/deleteProduct/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
    const response = await items_req.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

async function addNewProduct(body) {
  await fetch('http://127.0.0.1:8000/api/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

async function fetchByCategory(category = '') {
  try {
    const items_req = await fetch(
      `http://127.0.0.1:8000/api/products/${category}`
    );
    const allProducts = await items_req.json();

    if (allProducts) {
      const { data } = allProducts;

      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
