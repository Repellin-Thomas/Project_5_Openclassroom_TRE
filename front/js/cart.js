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

class Contact {
  constructor(userFirstName, userLastName, userAddress, userCity, userEmail) {
    this.userFirstName = userFirstName;
    this.userLastname = userLastName;
    this.userAddress = userAddress;
    this.userCity = userCity;
    this.userEmail = userEmail;
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

//Gestion du changement de l'input quantity . 
function onChangeQuantity(product, quantity, textQuantity) {
  textQuantity.textContent = "Qté: " + quantity
  product.quantity = quantity
  const stringifiedCart = JSON.stringify(cart)
  localStorage.setItem("item", stringifiedCart)
  //recalcul de la quantité et du prix total 
  let quantitySum = cart.reduce((total, product) => total + parseInt(product.quantity), 0)
  let priceSum = cart.reduce((total, product) => total + parseInt(product.quantity) * parseInt(product.price), 0)
  //MAJ du cart et du local storage 
  let cartTotal = document.getElementById("totalPrice");
  let totalItems = document.getElementById("totalQuantity");
  cartTotal.textContent = priceSum;
  totalItems.textContent = quantitySum;

};


function onClickDeleteFromCart(product) { }

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
    itemName.textContent = product.name;
    let itemColor = document.createElement("p");
    contentDescription.appendChild(itemColor)
    itemColor.textContent = product.color;
    let itemPrice = document.createElement("p");
    contentDescription.appendChild(itemPrice)
    itemPrice.textContent = product.price + "€";

    // quantité et gestion de la quantité 
    let contentSettings = document.createElement("div");
    itemContent.appendChild(contentSettings);
    contentSettings.classList.add("cart__item__content__settings");
    let itemQuantity = document.createElement("p")
    contentSettings.appendChild(itemQuantity)
    itemQuantity.textContent = "Qté: " + product.quantity
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
    deleteButton.textContent = " Supprimer"
    deleteButton.addEventListener("click", function () {

      // supprime l'article de l'itération actuelle (premier enfant de type article de elt: id =cart__items)
      elt.removeChild(articleElement)
      // recherhe de l'indice correspondant dans le tableau cart grace a un .findIndex
      const cartIndex = cart.findIndex(function (value) {
        return value.id == product.id && value.color == product.color
      })
      // fct splice pour supprimer un element dans cart a partir de l'index trouvé 
      cart.splice(cartIndex, 1)
      //Refresh du local storage avec le nouveau cart sans l'élément supprimé 
      const stringifiedCart = JSON.stringify(cart)
      localStorage.setItem("item", stringifiedCart)
      let quantitySum = cart.reduce((total, product) => total + parseInt(product.quantity), 0)
      let priceSum = cart.reduce((total, product) => total + parseInt(product.quantity) * parseInt(product.price), 0)
      //MAJ du cart et du local storage 
      let cartTotal = document.getElementById("totalPrice");
      let totalItems = document.getElementById("totalQuantity");
      cartTotal.textContent = priceSum;
      totalItems.textContent = quantitySum;


    })

    //calcul du total 
    let integerQuantity = parseInt(product.quantity)
    let integerPrice = parseInt(product.price)
    totalPrice += integerQuantity * integerPrice
    totalQuantity += integerQuantity



  }

  //affichage du total
  let cartTotal = document.getElementById("totalPrice");
  let totalItems = document.getElementById("totalQuantity");
  cartTotal.textContent = totalPrice;
  totalItems.textContent = totalQuantity;
}

//REGEX validation de formulaire TODO faire une methode commune avec en parametre un input a observer et faire un regex en fonction de l'input 
function isValid(event, regex, errorElement, name) {
  let isValid = regex.test(event.target.value)
  if (!isValid) {
    errorElement.textContent = "Merci de rentrer un(e) " + name + " valide"

  }
  else {
    errorElement.textContent = null

  }
}
//todo scinder avec un show error is valid ne doit que tester le regex

let userContact = new Contact(undefined, undefined, undefined, undefined, undefined)

let firstName = document.getElementById("firstName");
firstName.addEventListener("input", function (event) {
  const firstNameError = document.getElementById("firstNameErrorMsg")
  let validation = isValid(event, /^[A-Za-z ]+$/, firstNameError, "prénom")
  userContact.userFirstName = event.target.value

})


let lastName = document.getElementById("lastName")
lastName.addEventListener("input", function (event) {
  const lastNameError = document.getElementById("lastNameErrorMsg")
  isValid(event, /^[A-Za-z ]+$/, lastNameError, "nom")
  userContact.userLastname = event.target.value;
})




let address = document.getElementById("address")
address.addEventListener("input", function (event) {
  const addressError = document.getElementById("addressErrorMsg")
  isValid(event, /^[A-Za-z0-9 ,'-]+$/, addressError, "adresse")
  userContact.userAddress = event.target.value
})




let city = document.getElementById("city")
city.addEventListener("input", function (event) {
  const cityError = document.getElementById("cityErrorMsg")
  isValid(event, /^[A-Za-z]+$/, cityError, "ville")
  userContact.userCity = event.target.value
})




let email = document.getElementById("email")
const emailError = document.getElementById("emailErrorMsg")
email.addEventListener("input", function (event) {
  const emailError = document.getElementById("emailErrorMsg")
  isValid(event, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, emailError, "email")
  userContact.userEmail = event.target.value
})







/*
//On click commander
let orderButton = document.getElementById("order")
orderButton.addEventListener("click", function (){
  sendUserCart()
  sendUserContact()
})


function sendUserCart(element) {
  return fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(element)
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);


    })
    .catch(function (err) {
      // Une erreur est survenue
    });

};

sendUserCart(userContact)


*/

createCartHtml(cart);










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
