function cartItem(item, qtt) {
  const { title, price } = item.product;
  return `
 
    <div class="cart-item flex items-center">
        <img class="card-img" src="../src/assets/images/sofities.jpg" alt="" />
        <div class="card-info flex flex-col">
        <div class="card-info-wrapper flex flex-col">
        <span class="title fw-800 ">${title}</span>
        <span class="price grey">$${price}</span>
      </div>
      <div class="quantity flex ">
      <span class="quantity-item quantity-control fw-500" id="minus">-</span>
      <span class="quantity-item number fw-500 ">2</span>
      <span class="quantity-item quantity-control fw-500" id="plus">+</span>
      </div>
       </div>
    </div>
 `;
}
