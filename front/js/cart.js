//Etape 1 récupèrer le local storage et le classer dans une liste de produit 

class CartProduct {
  constructor(color, price, quantity, id, imageUrl, altTxt, name) {
    this.id = id;
    this.price = price;
    this.color = color;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.altTxt = altTxt;
    this.name = name;

  }
}



let currentStorage = localStorage.getItem("item");
let cart = [];

if (currentStorage != undefined) {
  cart = JSON.parse(currentStorage);
  cart = cart.map(x => new CartProduct(x.color, x.price, x.quantity, x.id, x.imageUrl, x.altTxt, x.name));
}


let totalPrice = 0;
let totalQuantity = 0;


function onChangeQuantity(product, quantity, textQuantity) {
  textQuantity.innerText = "Qté: " + quantity
  product.quantity = quantity
  const stringifiedCart = JSON.stringify(cart)
  localStorage.setItem("item", stringifiedCart)
};

function createCartHtml(products) {
  for (let product of products) {
    //structure globale
    let elt = document.getElementById('cart__items');
    let articleElement = document.createElement("article");
    elt.appendChild(articleElement);
    articleElement.classList.add("cart__item");
    articleElement.setAttribute("data-id", product.id);
    articleElement.setAttribute("data-color", product.color);
    //image
    let imageContainer = document.createElement("div");
    articleElement.appendChild(imageContainer);
    imageContainer.classList.add("cart__item__img");
    let image = document.createElement("img");
    imageContainer.appendChild(image);
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.altTxt)
    // nom, prix, couleur choisie
    let itemContent = document.createElement("div");
    articleElement.appendChild(itemContent);
    itemContent.classList.add("cart__item__content");
    let contentDescription = document.createElement("div");
    itemContent.appendChild(contentDescription);
    contentDescription.classList.add("cart__item__content__description");
    let itemName = document.createElement("h2");
    contentDescription.appendChild(itemName)
    itemName.innerText = product.name;
    let itemColor = document.createElement("p");
    contentDescription.appendChild(itemColor)
    itemColor.innerText = product.color;
    let itemPrice = document.createElement("p");
    contentDescription.appendChild(itemPrice)
    itemPrice.innerText = product.price + "€";

    // quantité et gestion de la quantité 
    let contentSettings = document.createElement("div");
    itemContent.appendChild(contentSettings);
    contentSettings.classList.add("cart__item__content__settings");
    let itemQuantity = document.createElement("p")
    contentSettings.appendChild(itemQuantity)
    itemQuantity.innerText = "Qté: " + product.quantity
    let quantityInput = document.createElement("input")
    contentSettings.appendChild(quantityInput)
    quantityInput.classList.add("itemQuantity")
    quantityInput.setAttribute("type", "number")
    quantityInput.setAttribute("min", 1)
    quantityInput.setAttribute("max", 100)
    quantityInput.setAttribute("value", product.quantity)
    quantityInput.setAttribute("name", "itemQUantity")
    //Event listener sur la qtt 

    quantityInput.addEventListener("change", event => onChangeQuantity(product, event.target.value, itemQuantity))
    //bouton delete 
    let deleteButton = document.createElement("p")
    contentSettings.appendChild(deleteButton)
    deleteButton.classList.add("deleteItem")
    deleteButton.innerText = "Supprimer"


    //calcul du total 
    totalPrice += product.quantity * product.price
    totalQuantity += product.quantity



  }
  //affichage du total
  let cartTotal = document.getElementById("totalPrice");
  let totalItems = document.getElementById("totalQuantity");
  cartTotal.innerText = totalPrice;
  totalItems.innerText = totalQuantity;
}


//REGEX validation de formulaire 

let firstName = document.getElementById("firstName")
firstName.addEventListener("input", function (event) {
  let isFirstNameValid = /^[A-Za-z ]+$/.test(event.target.value)
  const firstNameError = document.getElementById("firstNameErrorMsg")
  if (!isFirstNameValid) {
    firstNameError.innerText = "Merci de rentrer un prénom valide"
  } else {
    firstNameError.innerText = ""
  }
})
let lastName = document.getElementById("lastName")
lastName.addEventListener("input", function (event) {
  let isLastNameValid = /^[A-Za-z ]+$/.test(event.target.value)
  const lastNameError = document.getElementById("lastNameErrorMsg")
  if (!isLastNameValid) {
    lastNameError.innerText = "Merci de rentrer un nom valide"
  }
  else {
    LastNameError.innerText = ""
  }
})
let address = document.getElementById("address")
address.addEventListener("input", function (event) {
  let isAddressValid = /^[A-Za-z0-9 ,'-]+$/.test(event.target.value)
  const AddressError = document.getElementById("addressErrorMsg")
  if (!isAddressValid) {
    AddressError.innerText = "Merci de rentrer une adresse valide"
  }
  else {
    AddressError.innerText = ""
  }
})
let city = document.getElementById("city")
city.addEventListener("input", function (event) {
  let isCityValid = /^[A-Za-z]+$/.test(event.target.value)
  const cityError = document.getElementById("cityErrorMsg")
  if (!isCityValid) {

    cityError.innerText = "Merci de rentrer une ville valide"
  }
  else {
    cityError.innerText = ""
  }
})
let email = document.getElementById("email")
city.addEventListener("input", function (event) {
  let isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.target.value)
  const emailError = document.getElementById("emailErrorMsg")
  if (!isEmailValid) {

    emailError.innerText = "Merci de rentrer une adresse email valide"
  }
  else {
    emailError.innerText = ""
  }
})




createCartHtml(cart);









// Etape 2 afficher les produits dans le HTML grace aux informations du localStorage
/*  L'architecture du HTML telle qu'elle doit être
 <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->
              */

// Etape 3 ajouter un event listener sur le bouton delete item : au click il déclenchera une fonction qui supprimera le produit du local storage
