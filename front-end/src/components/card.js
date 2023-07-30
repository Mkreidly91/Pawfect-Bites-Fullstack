const card = (item) => {
  const { id, title, desciption, img } = item;

  return `<div id=${id} class="card flex flex-col items-center bg-white br-16">
    <div class="card-body flex flex-col">
  <div class="card-header flex flex-col">
    <!-- to be generated -->
    <span class="card-title fw-500">${title}</span>
    <span class="card-description fw-400 grey"
      >${desciption}</span
    >
  </div>

  <!-- to be generatetd -->
  <img src="./src/assets/images/sofities.jpg" alt="" />
</div>
<button class="card-button br-8 bg-yellow">
  Add to cart - $<span class="card-price">12</span>
</button>
</div>`;
};
