function cartItem(item, uniqueIds) {
  const { title, price, id, image } = item;

  return `
    <div class="cart-item flex items-center" id=${id}>
        <img class="card-img" src="${image}" alt="" />
        <div class="card-info flex flex-col">
        <div class="card-info-wrapper flex flex-col">
        <span class="title fw-800 ">${title}</span>
        <span class="price grey">$${price}</span>
      </div>
      <div class="quantity flex ">
      <span class="minus quantity-item quantity-control fw-500" productId=${id}>-</span>
      <span id="qt-${id}" class="quantity-item number fw-500">${uniqueIds[id]}</span>
      <span class="plus quantity-item quantity-control fw-500" productId=${id}>+</span>
      </div>
       </div>
    </div>
 `;
}
