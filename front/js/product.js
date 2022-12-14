// pour récupèrer l'id Présent dans l'url
let params = new URLSearchParams(document.location.search);
let pageId = params.get('id');

/*objet de class product pour pourvoir classer les objets dans le local storage en fonction de leur couleur , Id (le id = page id car il sera fixe) et
 en leur associant le prix et la quantité */


class CartProduct {
    constructor(id, color, quantity, imageUrl, altTxt, name) {
        this.id = id;
        this.color = color;
        this.quantity = quantity;
        this.altTxt = altTxt;
        this.imageUrl = imageUrl;
        this.name = name;

    }
}

// on vérifie que le local storage contiens quelque chose et on le met dans le cart 
let currentStorage = localStorage.getItem("item");
let cart = [];


//Si il y un local storage, on le met dans cart en recréant des object de classe (car ce n'est pas le cas dans le local storage)
if (currentStorage != undefined) {
    cart = JSON.parse(currentStorage);
    cart = cart.map(x => new CartProduct(x.id, x.color, x.quantity, x.imageUrl, x.altTxt, x.name));

}


function getOneProduct() {
    return fetch("http://localhost:3000/api/products/" + pageId)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            return value;

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
    imageElement.setAttribute("src", product.imageUrl);
    //product name
    document.getElementById("title").innerText = product.name;
    //product price
    document.getElementById("price").innerText = product.price;
    //product description
    document.getElementById("description").innerText = product.description;
    //product color option : (boucle for  sur l'array product. colors ?) parcourir la liste des couleurs et 
    let colorsArray = product.colors;
    const colorsContainer = document.getElementById("colors");
    for (let color of colorsArray) {
        const colorElement = document.createElement("option");
        colorsContainer.appendChild(colorElement);
        colorElement.setAttribute("value", color);
        colorElement.innerText = color;

    }
}




//calculs pour savoir si le produit existe EN RECUPERANT SON INDICE DANS LA LISTE (i) == .find
function isMyProductInCart(id, color) {
    //todo boucle while
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        if (color === product.color && id === product.id) {
            return i;
        }
    }
    return -1;
}

// fonction pour ajouter un produit ainsi que sa quantité : on a l'indice du produit pour le comparer aux produits existants de la liste . 
function addToCart(id, color, quantity, imageUrl, altTxt, name) {
    let productIndex = isMyProductInCart(id, color);
    if (productIndex >= 0) {
        if (cart[productIndex].quantity + quantity >= 100) {
            cart[productIndex].quantity = 100;
            alert('Attention le compte maximum d un article de même type est 100. Votre panier contient déjà 100 articles de ce type et nous ne pouvons en ajouter d avantage')
            return
        }
        cart[productIndex].quantity += quantity;

    }
    else {

        const product = new CartProduct(id, color, quantity, imageUrl, altTxt, name);
        cart.push(product);

    }
    alert('le(s) produit(s) ont bien été ajoutés au panier')
}






var imageUrl = 0;
var altTxt = 0;
var productName = 0;
getOneProduct().then(function (product) {
    imageUrl = product.imageUrl;
    altTxt = product.altTxt;
    productName = product.name;

    createCurrentProductHtml(product);

})




// On écoute le click sur le bouton ajouter au panier puis  on récupère la couleur puis la quantité pour l'ajouter a l'array cart puis on met le tableau dans le local storage
const product = document.getElementById('addToCart');
product.addEventListener('click', function () {
    // on récupère les VALEURS de color quantity et price et on les mets dans des variables 
    let color = document.getElementById('colors').value;
    let quantity = document.getElementById('quantity').value;
    // parse int permet de transformer les prix et quantité string en integer
    quantity = parseInt(quantity);
    // if color empeche le produit d'être ajouté si il n'y a pas de couleur sélectionnée 
    if (color !== '' && 100 >= quantity && quantity > 0) {
        addToCart(pageId, color, quantity, imageUrl, altTxt, productName)
        const stringifiedCart = JSON.stringify(cart);
        localStorage.setItem("item", stringifiedCart);
        return
    }
    alert('merci de rentrer une quantité et une couleur valide')

})



