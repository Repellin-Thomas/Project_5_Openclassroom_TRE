//Etape 1 récupèrer le local storage et le classer dans une liste de produit 

class CartProduct {
    constructor(color, price, quantity, id) {
        this.id = id;
        this.price = price;
        this.color = color;
        this.quantity = quantity;

    }
}
let currentStorage = localStorage.getItem("item")
let cart = []

if (currentStorage) {
    cart = JSON.parse(currentStorage);
    cart = cart.map(x => new CartProduct(x.color, x.price, x.quantity, x.id))
    console.log(cart);
}


function createCartHtml(products) {
    for (let product of products) {
        //structure globale
        let elt = document.getElementById('cart__items');
        let articleElement = document.createElement("article");
        elt.appendChild(articleElement)
        articleElement.classList.add("cart__item")
        articleElement.setAttribute("data-id", product.id)
        articleElement.setAttribute("data-color", product.color)
        //image
        let imageContainer = document.createElement("div")
        articleElement.appendChild(imageContainer)
        imageContainer.classList.add(cart__item__img)
        let image = document.createElement("img")
        imageContainer.appendChild(image)
        image.setAttribute("src", "")
        // nom, prix, couleur choisie
        let itemContent = document.createElement("div")
        articleElement.appendChild(itemContent)
        itemContent.classList.add("cart__item__content")
        let contentDescription = document.createElement("div")
        itemContent.appendChild(contentDescription)
        contentDescription.classList.add("cart__item__content__description")
        let itemName = document.createElement("h2")
        let itemColor = document.createElement("p")
        let itemPrice = document.createElement("p")

        // quantité et gestion de la quantité 
        let contentSettings = document.createElement("div")
        itemContent.appendChild(contentSettings)
        contentSettings.classList.add("cart__item__content__settings")

        //bouton delete 

    }

}

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
