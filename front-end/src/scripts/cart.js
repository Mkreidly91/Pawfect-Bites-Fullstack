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

const populate = (container, data) => {
  container.innerHTML = '';
  data.forEach((element) => {
    container.innerHTML += cartItem(element);
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  let info = localStorage.getItem('user_info');
  info = JSON.parse(info);
  const container = document.getElementById('item-container');
  const total_container = document.getElementById('total');
  console.log(info.user.id);
  const cart = await fetchProducts(info.user.id);
  console.log(cart);

  populate(container, cart);
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => (total += Number(item.product.price)));
    total_container.innerText = `$${total}`;
  };
  calculateTotal();
});
