// pour récupèrer l'id Présent dans l'url
var url = document.URL;
var pageId = url.substring(url.lastIndexOf('=') + 1);


/*objet de class product pour pourvoir classer les objets dans le local storage en fonction de leur couleur , Id (le id = page id car il sera fixe) et
 en leur associant le prix et la quantité */

//TODO rajouter Nom  imageUrl Alt txt a la classe car nécéssaire dans 
class CartProduct {
    constructor(color, price, quantity, id = pageId) {
        this.id = id;
        this.price = price;
        this.color = color;
        this.quantity = quantity;

    }
}

// on vérifie que le local storage contiens quelque chose et on le met dans le cart 
let currentStorage = localStorage.getItem("item");
let cart = []

//Si il y un local storage, on le met dans cart en recréant des object de classe (car ce n'est pas le cas dans le local storage)
if (currentStorage) {
    cart = JSON.parse(currentStorage);
    cart = cart.map(x => new CartProduct(x.color, x.price, x.quantity, x.id))
    console.log(cart);
}


function getOneProduct() {
    return fetch("http://localhost:3000/api/products/" + pageId)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            return value

        })
        .catch(function (err) {
            // Une erreur est survenue
        });

};



function createCurrentProductHtml(product) {
    //product Image
    const imageContainer = document.getElementsByClassName("item__img")[0];
    const imageElement = document.createElement("img");
    imageContainer.appendChild(imageElement);
    imageElement.setAttribute("src", product.imageUrl)
    //product name
    document.getElementById("title").innerText = product.name;
    //product price
    document.getElementById("price").innerText = product.price;
    //product description
    document.getElementById("description").innerText = product.description;
    //product color option : (boucle for  sur l'array product. colors ?) parcourir la liste des couleurs et 
    let colorsArray = product.colors
    const colorsContainer = document.getElementById("colors");
    for (let color of colorsArray) {
        const colorElement = document.createElement("option");
        colorsContainer.appendChild(colorElement);
        colorElement.setAttribute("value", color);
        colorElement.innerText = color;

    }
}

// fonction pour ajouter un produit ainsi que sa quantité : on a l'indice du produit pour le comparer aux produits existants de la liste . 
function addToCart(color, price, quantity) {
    let productIndex = isMyProductInCart(color, pageId)
    if (productIndex >= 0) {
        cart[productIndex].quantity += quantity;

    }
    else {
        const product = new CartProduct(color, price, quantity);
        cart.push(product)
    }

}


//calculs pour savoir si le produit existe EN RECUPERANT SON INDICE DANS LA LISTE (i) == .find
function isMyProductInCart(color, id) {
    let alreadyInCart = false
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        if (color === product.color && id === product.id) {
            return i
        }
    }
    return -1;
}




getOneProduct().then(function (product) {
    createCurrentProductHtml(product); //TODO  mettre get current product dans la parenthese 
})




// On écoute le click sur le bouton ajouter au panier puis  on récupère la couleur puis la quantité pour l'ajouter a l'array cart puis on met le tableau dans le local storage
const product = document.getElementById('addToCart');
product.addEventListener('click', function () {
    // on récupère les VALEURS de color quantity et price et on les mets dans des variables 
    let color = document.getElementById('colors').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').textContent
    // parse int permet de transformer les prix et quantité string en integer
    quantity = parseInt(quantity);
    price = parseInt(price);
    // if color empeche le produit d'être ajouté si il n'y a pas de couleur sélectionnée 
    if (color) {
        addToCart(color, price, quantity)
        const stringifiedCart = JSON.stringify(cart)
        localStorage.setItem("item", stringifiedCart)
        console.log(cart)
        console.log(localStorage)
    }

})


