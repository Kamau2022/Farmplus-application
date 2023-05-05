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
                                                                                          
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateStore = () => {
    return (store.innerHTML = storeProductsData.map((x)=>{
        let {id, name, price, description, img} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=item-id-${id} class="product">
             <img width="220px"  src=${img} alt="">
              <div class="detail">
                 <h4>${name}</h4>
                 <p>${description}</p>
                 <div class="price-quantity">
                    <h3>Kes ${price}</h3>
                    <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity"> 
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    .join(""));

};

generateStore()

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
    //console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};
let calculation = () => {
let cartIcon = document.getElementById("cartAmount");
cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x + y, 0);
window.onload = function () {
    calculation();
    }
};
calculation();
