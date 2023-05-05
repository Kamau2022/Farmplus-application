const label = document.getElementById('label');
const storingCart = document.getElementById('storing-cart');
let basket = JSON.parse(localStorage.getItem('data')) || [];

const calculation = () => {
  const cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  window.onload = function () {
    calculation();
  };
};
calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (storingCart.innerHTML = basket.map((x) => {
      console.log(x);
      const { id, item } = x;
      const search = storeProductsData.find((y) => y.id === id) || [];
      const { img, name, price } = search;
      return `
                <div class="cart-item">
                <img width="100" src=${img} alt=""/>
                    <div class="details">
                    <div class="title-price-x">
                    <h4 class="title-price">
                    <p>${name}</p>
                    <p class="cart-item-price">${price}/Kg</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                        <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity"> ${item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                        <h3>Kes ${item * price}</h3>
                    </div>
                </div>
                `;
    })
      .join(''));
  } else {
    storingCart.innerHTML = '';
    label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
            <button class="HomeBtn">Back to home</button>
            </a>
            `;
  }
};

generateCartItems();

const increment = (id) => {
  const selectedProduct = id;
  const search = basket.find((x) => x.id === selectedProduct.id);
  if (search === undefined) {
    basket.push({
      id: selectedProduct.id,
      item: 1
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(selectedProduct.id);
  localStorage.setItem('data', JSON.stringify(basket));
};
const decrement = (id) => {
  const selectedProduct = id;
  const search = basket.find((x) => x.id === selectedProduct.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedProduct.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem('data', JSON.stringify(basket));
};
const update = (id) => {
  const search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

const removeItem = (id) => {
  const selectedProduct = id;
  basket = basket.filter((x) => x.id !== selectedProduct.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem('data', JSON.stringify(basket));
};

const TotalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket.map((x) => {
      const { item, id } = x;
      const search = storeProductsData.find((y) => y.id === id) || [];

      return item * search.price;
    })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
        <h2>Total Bill : Kes ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
  } else return;
};
const clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem('data', JSON.stringify(basket));
};
TotalAmount();
