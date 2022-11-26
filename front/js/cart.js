//Etape 1 récupèrer le local storage et le classer dans une liste de produit 
class CartProduct {
  constructor(color, quantity, id, imageUrl, altTxt, name) {
    this.id = id;
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
  cart = cart.map(x => new CartProduct(x.color, x.quantity, x.id, x.imageUrl, x.altTxt, x.name));
}


let totalPrice = 0;
let totalQuantity = 0;


function getPriceFromId(product) {
  return fetch("http://localhost:3000/api/products/" + product.id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value.price;

    })
    .catch(function (err) {
      // Une erreur est survenue
    });


}




//Gestion du changement de l'input quantity . 
function onChangeQuantity(product, quantity, textQuantity) {
  textQuantity.textContent = "Qté: " + quantity;
  product.quantity = quantity;
  const stringifiedCart = JSON.stringify(cart);
  localStorage.setItem("item", stringifiedCart);
  //recalcul de la quantité et du prix total 
  let quantitySum = cart.reduce((total, product) => total + parseInt(product.quantity), 0);
  let priceSum = cart.reduce((total, product) => total + parseInt(product.quantity) * parseInt(product.price), 0);
  //MAJ du cart et du local storage 
  let cartTotal = document.getElementById("totalPrice");
  let totalItems = document.getElementById("totalQuantity");
  cartTotal.textContent = priceSum;
  totalItems.textContent = quantitySum;

};





async function createCartHtml(products) {
  for (let product of products) {
    product.price = await getPriceFromId(product);
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
    image.setAttribute("alt", product.altTxt);
    // nom, prix, couleur choisie
    let itemContent = document.createElement("div");
    articleElement.appendChild(itemContent);
    itemContent.classList.add("cart__item__content");
    let contentDescription = document.createElement("div");
    itemContent.appendChild(contentDescription);
    contentDescription.classList.add("cart__item__content__description");
    let itemName = document.createElement("h2");
    contentDescription.appendChild(itemName);
    itemName.textContent = product.name;
    let itemColor = document.createElement("p");
    contentDescription.appendChild(itemColor);
    itemColor.textContent = product.color;
    let itemPrice = document.createElement("p");
    contentDescription.appendChild(itemPrice);
    itemPrice.textContent = product.price + "€";

    // quantité et gestion de la quantité 
    let contentSettings = document.createElement("div");
    itemContent.appendChild(contentSettings);
    contentSettings.classList.add("cart__item__content__settings");
    let itemQuantity = document.createElement("p");
    contentSettings.appendChild(itemQuantity);
    itemQuantity.textContent = "Qté: " + product.quantity;
    let quantityInput = document.createElement("input");
    contentSettings.appendChild(quantityInput);
    quantityInput.classList.add("itemQuantity");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("min", 1);
    quantityInput.setAttribute("max", 100);
    quantityInput.setAttribute("value", product.quantity);
    quantityInput.setAttribute("name", "itemQUantity");
    //Event listener sur la qtt 

    quantityInput.addEventListener("change", event => onChangeQuantity(product, event.target.value, itemQuantity));
    //bouton delete 
    let deleteButton = document.createElement("p");
    contentSettings.appendChild(deleteButton);
    deleteButton.classList.add("deleteItem");
    deleteButton.textContent = " Supprimer";
    deleteButton.addEventListener("click", function () {

      // supprime l'article de l'itération actuelle (premier enfant de type article de elt: id =cart__items)
      elt.removeChild(articleElement);
      // recherhe de l'indice correspondant dans le tableau cart grace a un .findIndex
      const cartIndex = cart.findIndex(function (value) {
        return value.id == product.id && value.color == product.color;
      })
      // fct splice pour supprimer un element dans cart a partir de l'index trouvé 
      cart.splice(cartIndex, 1);
      //Refresh du local storage avec le nouveau cart sans l'élément supprimé 
      const stringifiedCart = JSON.stringify(cart);
      localStorage.setItem("item", stringifiedCart);
      let quantitySum = cart.reduce((total, product) => total + parseInt(product.quantity), 0);
      let priceSum = cart.reduce((total, product) => total + parseInt(product.quantity) * parseInt(product.price), 0);
      //MAJ du cart et du local storage 
      let cartTotal = document.getElementById("totalPrice");
      let totalItems = document.getElementById("totalQuantity");
      cartTotal.textContent = priceSum;
      totalItems.textContent = quantitySum;


    })

    //calcul du total 
    let integerQuantity = parseInt(product.quantity);
    let integerPrice = parseInt(product.price);
    totalPrice += integerQuantity * integerPrice;
    totalQuantity += integerQuantity;



  }

  //affichage du total
  let cartTotal = document.getElementById("totalPrice");
  let totalItems = document.getElementById("totalQuantity");
  cartTotal.textContent = totalPrice;
  totalItems.textContent = totalQuantity;
}

//REGEX validation de formulaire 
function isValid(value, regex) {
  let isValid = regex.test(value);
  if (!isValid) {
    return false;
  }
  else {
    return true;
  }
}




let userFirstName = document.getElementById("firstName");
let isFirstNameValid = false;
userFirstName.addEventListener("input", function (event) {
  const firstNameError = document.getElementById("firstNameErrorMsg");
  if (!isValid(event.target.value, /^[A-Za-z ]+$/)) {
    isFirstNameValid = false;
    firstNameError.textContent = "Merci de rentrer un prénom valide";
  }
  else {
    isFirstNameValid = true;
    firstNameError.textContent = "";
  }
});


let userLastName = document.getElementById("lastName");
let isLastNameValid = false;
userLastName.addEventListener("input", function (event) {
  const lastNameError = document.getElementById("lastNameErrorMsg");
  if (!isValid(event.target.value, /^[A-Za-z ]+$/)) {
    isLastNameValid = false;
    lastNameError.textContent = "Merci de rentrer un nom valide";
  }
  else {
    isLastNameValid = true;
    lastNameError.textContent = "";

  }


})




let userAddress = document.getElementById("address");
let isAddressValid = false;
userAddress.addEventListener("input", function (event) {
  const addressError = document.getElementById("addressErrorMsg");
  if (!isValid(event.target.value, /^[A-Za-z0-9 ,'-]+$/)) {
    isAddressValid = false;
    addressError.textContent = "Merci de rentrer une adresse valide";
  }
  else {
    isAddressValid = true;
    addressError.textContent = "";

  }

})




let userCity = document.getElementById("city");
let isCityValid = false
userCity.addEventListener("input", function (event) {
  const cityError = document.getElementById("cityErrorMsg")
  if (!isValid(event.target.value, /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    isCityValid = false;
    cityError.textContent = "Merci de rentrer une ville valide";
  }
  else {
    isCityValid = true;
    cityError.textContent = "";

  }
})




let userEmail = document.getElementById("email");
let isEmailValid = false
userEmail.addEventListener("input", function (event) {
  const emailError = document.getElementById("emailErrorMsg")
  if (!isValid(event.target.value, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    isEmailValid = false;
    emailError.textContent = "Merci de rentrer une adresse email valide";
  }
  else {
    isEmailValid = true;
    emailError.textContent = "";

  }

})
//Met en place de manière ordonnée les éléments envoyés par la requete post (rangés objet itemToSend)
function setItemToSubmit() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let cartIdArray = cart.map(x => x.id);

  //Objet a envoyer dans la requete post 
  let itemToSend = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: cartIdArray
  };
  return itemToSend;
};
//Envoie le formulaire grace aux données rentrés par l'utilisateur ainsi qu'une liste composée uniquement de product id
function sendForm() {
  const itemToSend = setItemToSubmit();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(itemToSend),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value.orderId);
      window.location.assign("confirmation.html?orderId=" + value.orderId);


    })
    .catch(function (err) {
      // Une erreur est survenue
    });

};




//On click commander
let orderButton = document.getElementById("order");
orderButton.addEventListener("click", function (e) {
  e.preventDefault();

  //revérification du formulaire avec trigger de l'input sur le onclick 
  userFirstName.dispatchEvent(new Event('input', { bubbles: true }));
  userLastName.dispatchEvent(new Event('input', { bubbles: true }));
  userAddress.dispatchEvent(new Event('input', { bubbles: true }));
  userCity.dispatchEvent(new Event('input', { bubbles: true }));
  userEmail.dispatchEvent(new Event('input', { bubbles: true }));
  //vérification de la présence d'articles dans le panier
  if (cart.length === 0) {
    alert("Merci d'ajouter des articles a votre panier ");
  }

  //vérification de la validité du formulaire
  else if (!isFirstNameValid || !isLastNameValid || !isAddressValid || !isCityValid || !isEmailValid) {
    alert("merci de bien remplir le formulaire");

  }
  //appel a la fonction d'envoi de formulaire
  else {
    sendForm();
  }

})


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
