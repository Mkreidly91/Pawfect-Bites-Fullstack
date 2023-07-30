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

const deleteProduct = async (user_id, product_id, count) => {
  try {
    const items_req = await fetch(`http://127.0.0.1:8000/api/cart/delete}`, {
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

const populate = (container, data) => {
  container.innerHTML = '';
  data.forEach((element) => {
    container.innerHTML += cartItem(element);
  });
};

const calculateTotal = (cart, total_container) => {
  let total = 0;
  cart.forEach((item) => (total += Number(item.product.price)));
  total_container.innerText = `$${total}`;
};

document.addEventListener('DOMContentLoaded', async () => {
  let info = localStorage.getItem('user_info');
  info = JSON.parse(info);

  const plus = document.getElementById('plus');
  const minus = document.getElementById('minus');
  const container = document.getElementById('item-container');
  const total_container = document.getElementById('total');

  console.log(info.user.id);
  const cart = await fetchProducts(info.user.id);
  console.log(cart);
  const productIds = cart.map((element) => {
    element.product.id;
  });
  console.log(productIds);

  populate(container, cart);
  calculateTotal(cart, total_container);

  minus.addEventListener('click', async (e) => {
    const { id } = e.target;
    const newProducts = await deleteProduct(info.user.id, id, 1);
    console.log(newProducts);
    const number = document.getElementById(`qt-${id}`);
    number.innerText = '';
  });
  plus.addEventListener('click', async () => {});
});
