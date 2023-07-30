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
const addToCart = async () => {
  try {
    const items_req = await fetch(`http://127.0.0.1:8000/api/cart/`);
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
const populate = (container, data) => {
  container.innerHTML = '';
  data.forEach((element) => {
    container.innerHTML += card(element);
  });
};

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

  cats.onclick = async () => {
    cats.classList.add('active');
    dogs.classList.remove('active');
    all.classList.remove('active');

    const data = await fetchProducts(1);
    populate(products_wrapper, data);
  };
  dogs.onclick = async () => {
    dogs.classList.add('active');
    cats.classList.remove('active');
    all.classList.remove('active');

    const data = await fetchProducts(2);
    populate(products_wrapper, data);
  };
  all.onclick = async () => {
    all.classList.add('active');
    cats.classList.remove('active');
    dogs.classList.remove('active');

    const data = await fetchProducts();
    populate(products_wrapper, data);
  };
});
