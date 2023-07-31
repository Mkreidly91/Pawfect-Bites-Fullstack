const fetchProducts = async (category = '') => {
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
};

const fetchFavorites = async (user_id) => {
  try {
    const items_req = await fetch(
      `http://127.0.0.1:8000/api/favourites/get/${user_id}`
    );
    const data = await items_req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addToFavorites = async ({ product_id, user_id }) => {
  const items_req = await fetch('http://127.0.0.1:8000/api/favourites/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id,
      product_id,
    }),
  });
};
const removeFromFavorites = async ({ product_id, user_id }) => {
  const items_req = await fetch(`http://127.0.0.1:8000/api/favourites/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id,
      product_id,
    }),
  });
};

const addProduct = async (args) => {
  const { user_id, product_id } = args;

  try {
    const items_req = await fetch(`http://127.0.0.1:8000/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        product_id: product_id,
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
  const info = JSON.parse(localStorage.getItem('user_info'));
  const card_buttons = Array.from(
    document.getElementsByClassName('card-button')
  );
  const favourites = Array.from(document.getElementsByClassName('favourite'));
  favourites.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const obj = {
        user_id: info.user.id,
        product_id: Number(e.target.id),
      };

      const favs = document.getElementById('favs');
      if (favs.classList.contains('active')) {
        await removeFromFavorites(obj);
        const products_wrapper = document.getElementById('products_wrapper');
        const { data } = await fetchFavorites(info.user.id);

        populate(products_wrapper, data);
        addEventListeners();
        return;
      }

      const response = await addToFavorites(obj);
    });
  });

  card_buttons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      let info = localStorage.getItem('user_info');
      info = JSON.parse(info);

      const add_obj = {
        user_id: info.user.id,
        product_id: e.target.id,
      };

      const newProducts = await addProduct(add_obj);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log(user);
  const products_wrapper = document.getElementById('products_wrapper');
  const cats = document.getElementById('cats');
  const dogs = document.getElementById('dogs');
  const all = document.getElementById('all');
  const favs = document.getElementById('favs');

  all.classList.add('active');

  const data = await fetchProducts();
  populate(products_wrapper, data);
  addEventListeners();

  cats.onclick = async () => {
    cats.classList.add('active');
    dogs.classList.remove('active');
    all.classList.remove('active');
    favs.classList.remove('active');

    const data = await fetchProducts(1);
    populate(products_wrapper, data);
    addEventListeners();
  };
  dogs.onclick = async () => {
    dogs.classList.add('active');
    cats.classList.remove('active');
    all.classList.remove('active');
    favs.classList.remove('active');

    const data = await fetchProducts(2);
    populate(products_wrapper, data);
    addEventListeners();
  };
  all.onclick = async () => {
    all.classList.add('active');
    cats.classList.remove('active');
    dogs.classList.remove('active');
    favs.classList.remove('active');

    const data = await fetchProducts();
    populate(products_wrapper, data);
    addEventListeners();
  };

  favs.onclick = async () => {
    favs.classList.add('active');
    all.classList.remove('active');
    cats.classList.remove('active');
    dogs.classList.remove('active');

    const { data } = await fetchFavorites(user.id);

    populate(products_wrapper, data);
    addEventListeners();
  };
});
