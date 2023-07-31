const card = (item) => {
  const { id, title, description, price, img } = item;

  return `<div id=${id} class="card flex flex-col items-center bg-white br-16">
    <div class="card-body flex flex-col">
    <div class="card-info flex justify-center items-center">
    <div class =" ">${description}</div>
    </div>
    <img id=${id} class="favourite" src="./src/assets/icons/info/heart.svg" alt="">
    <div class="card-header flex flex-col">
    <!-- to be generated -->
    <span class="card-title fw-500">${title}</span>
    
  </div>

  <!-- to be generatetd -->
  <img src="./src/assets/images/sofities.jpg" alt="" />
</div>
<button class="card-button br-8 bg-yellow" id="${id}">
  Add to cart - $<span class="card-price">${price}</span>
</button>
</div>`;
};
//  <span class="card-description fw-400 grey"
// >${description}</span
// >
