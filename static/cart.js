let store = document.getElementById("store")
const storeProductsData = [{
  id: 'prd1',
  name: 'Capsicum Green',
  price: '49.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/capsicum.png'
},
{
  id: 'prd2',
  name: 'Red Onion',
  price: '99.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/onion-1.png'

},
{
  id: 'prd3',
  name: 'Tomato',
  price: '98.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/tomato.png'
},
{
  id: 'prd4',
  name: 'Ginger',
  price: '229.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/ginger.png'
},
{
  id: 'prd5',
  name: 'Pumpkin',
  price: '158.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/pumpkin.png'
},
{
  id: 'prd6',
  name: 'Treetomato',
  price: '275.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/Treetomato.png'
},
{
  id: 'prd7',
  name: 'Avocado',
  price: '82.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/avocado.png'
},
{
  id: 'prd8',
  name: 'Carrot',
  price: '108.00',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing',
  img: 'static/images/carrot.png'
}];

let label = document.getElementById('label')
let StoringCart = document.getElementById('storing-cart')
let basket = JSON.parse(localStorage.getItem('data')) || [];

const calculation = () => {
  const cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  window.onload = function () {
    calculation();
  };
};
calculation();

let generateCartItems = () => {
	if (basket.length >= 2){
	 return(StoringCart.innerHTML = basket.map((x) => {
		 let {id, item} = x;
		 let search = storeProductsData.find((y)=>y.id === id) || []
		 const { img, name, price } = search;
	  return `
	   <div class = 'cart-item'>
	   <img width = "100" src=${img} alt=""/>
	   <div class="details">
	    <div class="title-price-x">
	    <h4 class="title-price">
	    <p>${name}</p>
	    <p class="cart-item-price"> Ksh ${price}</p>
	    </h4>
	     <i onclick="removeItem(${id})"class="bi bi-x-lg"></i>
	     </div>
	    <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})"class="bi bi-plus-lg"></i>
                    </div>
	    <h3>Ksh ${item * search.price}</h3>
	    </div>
	   </div>
	   `;
	})
	.join(""));
	} else {
	StoringCart.innerHTML = ``;
	label.innerHTML = `
	<h2>Cart is Empty</h2>
	<a href="/index">
	 <button class = "HomeBtn">Back to store</button>
	</a>
	`;
	}
};
generateCartItems();
let increment = (id) => {
    let selectedProduct = id;
    let search = basket.find((x) => x.id === selectedProduct.id);
    if (search === undefined){
    basket.push({
        id: selectedProduct.id,
        item: 1,
    });
} else {
    search.item +=1;
}
    update(selectedProduct.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedProduct = id;
    let search = basket.find((x) => x.id === selectedProduct.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
    search.item -=1;
}
    update(selectedProduct.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
     generateCartItems();
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
    let amount = basket.map((x) => {
     let {item, id } = x;
     let search = storeProductsData.find((y)=>y.id === id) || []
     return item * search.price
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
