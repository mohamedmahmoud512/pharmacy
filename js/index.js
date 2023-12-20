var inputName = document.getElementById('prodName');
var inputCategory = document.getElementById('prodCategory');
var inputPrice = document.getElementById('prodprice');
var inputDesc = document.getElementById('prductDesc');
var productList = [];
if (localStorage.getItem('product') != null) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayValue()
}
if (productList.length != 0) {
  document.getElementById("clearAll").style.display = "inline";
}
function displayValue() {
  var cartoons = "";
  for (var i = 0; i < productList.length; i++) {
    cartoons += `
        <tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].description}</td>
        <td>
        <button onclick="delateItem(${i})" class="btn btn-outline-danger">delete</button>
        </td>
        <td>
        <button onclick="update(${i})" class="btn btn-outline-warning">Update</button>
        </td>
        </tr>
      `
  }
  // console.log(cartoons);
  document.getElementById("tbodyID").innerHTML = cartoons;
}
function addToCard() {
  var product = {
    name: inputName.value,
    category: inputCategory.value,
    price: inputPrice.value,
    description: inputDesc.value
  }
  if (validateName(product) && validatePrice(product) && validateDate(product)) {
    productList.unshift(product);
    if (productList.length != 0) {
      document.getElementById("clearAll").style.display = "inline";
    }
    var x = JSON.stringify(productList);
    localStorage.setItem("product", x);
    displayValue();
    resetValue();
    resetValid();
  } else if (validateName(product) == false) {
    var element = document.getElementById('validateName');
    element.className = "d-block w-50 shadow-lg py-1 px-5 rounded bg-danger text-light position-relative";
  } else if (validateDate(product) == false) {
    var element2 = document.getElementById('validateDate');
    element2.className = "d-block w-50 shadow-lg py-1 px-5 rounded bg-danger text-light position-relative";
  } else if (validatePrice(product) == false) {
    var element3 = document.getElementById('validatePrice');
    element3.className = "d-block w-50 shadow-lg py-1 px-5 rounded bg-danger text-light position-relative";
  }
}
function resetValue() {
  inputName.value = "";
  inputCategory.value = "";
  inputPrice.value = "";
  inputDesc.value = "";
}
function resetValid() {
  var element = document.getElementById('validateName');
  element.className = "d-none w-50 shadow-lg py-1 px-5 rounded bg-danger text-light position-relative";
  var element2 = document.getElementById('validatePrice');
  element2.className = "d-none w-50 shadow-lg py-1 px-5 rounded bg-danger text-light position-relative";
  var element3 = document.getElementById('validateDate');
  element3.className = "d-none w-50 shadow-lg py-1 px-5 rounded bg-danger text-light position-relative";
}
function delateItem(index) {
  productList.splice(index, 1);
  if (productList.length == 0) {
    document.getElementById("clearAll").style.display = "none";
  } else {
    document.getElementById("clearAll").style.display = "inline";
  }
  displayValue();
  localStorage.setItem("product", JSON.stringify(productList));
}
function delateProducts() {
  productList.splice(0);
  localStorage.clear();
  document.getElementById("clearAll").style.display = "none";
  displayValue()
}
var indexUpdate = 0;
function update(index) {
  indexUpdate = index;
  inputName.value = productList[index].name;
  inputCategory.value = productList[index].category;
  inputPrice.value = productList[index].price;
  inputDesc.value = productList[index].description;
  window.scrollTo(0, 0);
  document.getElementById("add").style.display = "none"
  document.getElementById("update").style.display = "inline"
  document.getElementById("cancel").style.display = "inline"
}
function CardUpdate() {
  productList[indexUpdate].name = inputName.value;
  productList[indexUpdate].category = inputCategory.value;
  productList[indexUpdate].price = inputPrice.value;
  productList[indexUpdate].description = inputDesc.value;
  document.getElementById("add").style.display = "inline"
  document.getElementById("update").style.display = "none"
  resetValue();
  displayValue()
  var x = JSON.stringify(productList);
  localStorage.setItem("product", x);
  document.getElementById("cancel").style.display = "none"
}
function CardCancel() {
  document.getElementById("add").style.display = "inline"
  document.getElementById("update").style.display = "none"
  resetValue()
  document.getElementById("cancel").style.display = "none"

}
function search(value) {
  var cartoons2 = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
      cartoons2 += `
    <tr>
    <td>${i + 1}</td>
    <td>${productList[i].name.replaceAll(value, `<span style="background-color: yellow;color:black;">${value}</span>`)}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].description}</td>
    <td>
    <button onclick="delateItem(${i})" class="btn btn-outline-danger">delete</button>
    </td>
    <td>
    <button onclick="update(${i})" class="btn btn-outline-warning">Update</button>
    </td>
    </tr>
  `

    }
  }
  document.getElementById("tbodyID").innerHTML = cartoons2;

}
function validateName(product) {
  if (product.name != "") {
    return true;
  }
  return false;
}
function validatePrice(product) {
  if (product.price != "") {
    return true;
  }
  return false;
}
function validateDate(product) {
  if (product.category != "") {
    return true;
  }
  return false;
}