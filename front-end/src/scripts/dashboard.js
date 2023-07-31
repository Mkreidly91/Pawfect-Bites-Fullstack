document.addEventListener('DOMContentLoaded', async () => {
  const input_title = document.getElementById('title');
  const input_description = document.getElementById('description');
  const input_category = document.getElementById('category');

  const select_product = document.getElementById('select-products');
  select_product.addEventListener('change', async (e) => {
    const value = e.target.value;
    console.log(value);
    const product = await fetchProducts(value);
    console.log(product);
  });
  let price;
  const allProducts = await fetchProducts();
  console.log('hello');
  populateOptions(allProducts);
});

function populateOptions(productArr) {
  const select = document.getElementById('select-products');
  const baseOptions = ` <option value=""></option>
                          <option value="+">Add product</option>`;
  select.innerHTML = baseOptions;
  productArr.forEach((element) => {
    const { id, title, desciption, price } = element;
    select.innerHTML += `<option value="${id}">${title}</option>`;
  });
}

function fillPage(title, description, price) {
  const input_title = document.getElementById('title');
  const input_description = document.getElementById('description');
  const input_category = document.getElementById('category');
  const img = document.getElementById('board-img');
  input_title.value = title;
  input_description.value = description;
  input_category.value = price;
}

async function fetchProducts(category = '') {
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

async function updateProduct(product_id, body) {
  // fetch then append
  try {
    const items_req = await fetch(
      `http://127.0.0.1:8000/api/products/update/${product_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
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
async function deleteProduct(id) {
  try {
    const items_req = await fetch(
      `http://127.0.0.1:8000/api/products/delete/${id}`
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

async function addNewProduct(body) {
  await fetch('http://127.0.0.1:8000/api/products/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
