const fetchProducts = async (category = '') => {
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
};
const addProduct = async (args) => {
  const { user_id, product_id } = args;
  console.log(args);

  try {
    const items_req = await fetch(`http://127.0.0.1:8000/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        product_id,
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
    container.innerHTML += card(element);
  });
};

function addEventListeners() {
  const card_buttons = Array.from(
    document.getElementsByClassName('card-button')
  );
  console.log(card_buttons);
  card_buttons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      let info = localStorage.getItem('user_info');
      info = JSON.parse(info);
      const add_obj = {
        user_id: info.user.id,
        product_id: Number(e.target.getAttribute('productId')),
      };
      const newProducts = await addProduct(add_obj);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const info = JSON.parse(localStorage.getItem('user_info'));
  console.log(info);
  const products_wrapper = document.getElementById('products_wrapper');
  const cats = document.getElementById('cats');
  const dogs = document.getElementById('dogs');
  const all = document.getElementById('all');
  all.classList.add('active');

  const data = await fetchProducts();
  populate(products_wrapper, data);
  addEventListeners();

  cats.onclick = async () => {
    cats.classList.add('active');
    dogs.classList.remove('active');
    all.classList.remove('active');

    const data = await fetchProducts(1);
    populate(products_wrapper, data);
    addEventListeners();
  };
  dogs.onclick = async () => {
    dogs.classList.add('active');
    cats.classList.remove('active');
    all.classList.remove('active');

    const data = await fetchProducts(2);
    populate(products_wrapper, data);
    addEventListeners();
  };
  all.onclick = async () => {
    all.classList.add('active');
    cats.classList.remove('active');
    dogs.classList.remove('active');

    const data = await fetchProducts();
    populate(products_wrapper, data);
    addEventListeners();
  };
});
