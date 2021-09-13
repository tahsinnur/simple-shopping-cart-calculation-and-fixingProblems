const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 single-product">
      <img src="${image}" class="card-img-top product-image" alt="...">
      <div class="card-body">
        <h4 class="card-title">${product.title}</h4>
        <p class="card-text">Category: ${product.category}</p>
        <h5 class="card-text">Price: $ <span class= text-primary>${product.price}</span></h5>
        <p>Product Rating: <span class="rating-color">${product.rating.rate}</span></p>
        <p>Total Reviewers: <span class="reviewer-count-color">${product.rating.count}</span></p>
      </div>
      <div class="card-footer d-flex justify-content-evenly bg-white border-0">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">Add To Cart</button>
        <button id="details-btn" class="btn btn-warning">Details</button></div>
      </div>
    </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
// showing total products count, price, tax and grand total on cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
// getting values from cart
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", parseFloat(priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", parseFloat(priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat( grandTotal).toFixed(2);
};