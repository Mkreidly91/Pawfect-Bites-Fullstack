const fetchProducts = async (id = '') => {
  try {
    const items_req = await fetch(`http://127.0.0.1:8000/api/cart/${id}`);
    const allProducts = await items_req.json();

    if (allProducts) {
      const { data } = allProducts;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (args) => {
  const { user_id, product_id, count } = args;
  console.log(args);
  try {
    const items_req = await fetch(`http://127.0.0.1:8000/api/cart/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        product_id,
        count,
      }),
    });
    const newProducts = await items_req.json();
    return newProducts;
  } catch (error) {
    console.log(error);
  }
};

function countDuplicates(arr) {
  const countObj = {};

  arr.forEach((item) => {
    countObj[item] = (countObj[item] || 0) + 1;
  });

  return countObj;
}

function removeDupicates(cart) {
  const productIds = cart.map((element) => element.product.id);
  const products = cart.map((element) => element.product);
  const unique_ids = countDuplicates(productIds);
  let unique_objs = [];

  Object.keys(unique_ids).forEach((key) => {
    const p = products.find((element) => Number(element.id) == key);
    unique_objs.push(p);
  });
  return { unique_ids, unique_objs };
}

const populate = (args) => {
  const { unique_objs, unique_ids } = args;

  const container = document.getElementById('item-container');
  container.innerHTML = '';

  unique_objs.forEach((element) => {
    container.innerHTML += cartItem(element, unique_ids);
  });
};

const calculateTotal = (cart, total_container) => {
  let total = 0;
  cart.forEach((item) => (total += Number(item.product.price)));
  total_container.innerText = `$${total}`;
};

function addEventListeners() {
  const minusElements = Array.from(document.getElementsByClassName('minus'));
  minusElements.forEach((e) => {
    e.addEventListener('click', async () => {
      let info = localStorage.getItem('user_info');
      info = JSON.parse(info);
      const delete_obj = {
        user_id: info.user.id,
        product_id: Number(e.getAttribute('productId')),
        count: 1,
      };
      const newProducts = await deleteProduct(delete_obj);
      const brandNewCART = await fetchProducts(info.user.id);

      console.log(newProducts, brandNewCART);
      const { unique_ids, unique_objs } = removeDupicates(brandNewCART);
      populate({ unique_objs, unique_ids, info });
      addEventListeners();
      const total_container = document.getElementById('total');
      calculateTotal(brandNewCART, total_container);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  let info = localStorage.getItem('user_info');
  info = JSON.parse(info);

  const container = document.getElementById('item-container');
  const total_container = document.getElementById('total');

  const cart = await fetchProducts(info.user.id);

  const { unique_ids, unique_objs } = removeDupicates(cart);

  populate({ container, unique_objs, unique_ids, info });
  calculateTotal(cart, total_container);
  addEventListeners(info);
});
