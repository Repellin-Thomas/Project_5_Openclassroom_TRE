// pour récupèrer l'id Présent dans l'url
var url = document.URL;
var pageId = url.substring(url.lastIndexOf('=') + 1);

function getAllProducts() {
    return fetch("http://localhost:3000/api/products")
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

//boucle for qui parcour la liste des produits et le compare à l'id de la page 

function getCurrentProduct(products) {
    for (let product of products)
        if (product._id === pageId) {
            return product;
        }

}



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

getAllProducts().then(function (products) {
    const currentProduct = getCurrentProduct(products);
    createCurrentProductHtml(currentProduct);
    console.log(currentProduct)
})




