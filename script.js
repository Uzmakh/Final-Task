let productContainer = document.querySelector(".product-container");
let categoryListDiv = document.querySelector(".category-list");

// let checkedCategories = ["men's clothing", "jewelery", "electronics", "women's clothing"];
// console.log(checkedCategories.includes("jewelery"));
let allCategories = [];
// console.log(allCategories)

let displayProducts = async (checkedCategories = []) => {
  productContainer.innerHTML = "";
  let product = await fetch("https://fakestoreapi.com/products");

  let finalProduct = await product.json();
  finalProduct.forEach((element) => {
    // 2-forming category list
    if (!allCategories.includes(element.category)) {
      categoryListDiv.innerHTML += `
          <label for="">
          <input type="checkbox" onclick="categoryFilter()" value="${element.category}"/>${element.category}
        </label>`;
      allCategories.push(element.category);
    }
    //3- displaying all products incaseof unchecked boxes
    if (checkedCategories.length == 0) {
      // console.log("category");
      checkedCategories = allCategories;
    }
    //Also displaying all products incaseof checked boxes
    if (checkedCategories.includes(element.category)) {
      // 1-displaying products
      productContainer.innerHTML += `
       <div class="product-item">
        <img
          src=${element.image}
          alt=${element.title}
        />
        <p>${element.category}</p>
        <h5>${element.title.slice(0, 20)}...</h5>
        <h4><span>Rs.</span>
         ${element.price}</h4>
        
          <button class="add-to-cart" onclick="addToCart('${element.id}', '${element.image}', '${element.category}', '${element.title}', '${element.price}', '${element.description}')">Add to Cart</button>
    `;
    }
  });
};
displayProducts();

// 4-displaying filtered products (function running on click input field)
let categoryFilter = () => {
  let checkInput = document.querySelectorAll("input[type='checkbox']");
  // console.log(checkInput)
  let checkData = [];
  checkInput.forEach((element) => {
    // console.log(element.value)
    if (element.checked) {
      // console.log(element)
      checkData.push(element.value);
    }
  });
  // console.log(checkData)
  displayProducts(checkData);
};


