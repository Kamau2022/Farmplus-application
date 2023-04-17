let store = document.getElementById("store")
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
