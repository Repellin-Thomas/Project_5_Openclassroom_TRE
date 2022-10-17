class Product {
    constructor(colors, id, name, price, imageUrl, description, altTxt) {
        this.colors = colors;
        this.name = name;
        this.id = id;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.altTxt = altTxt;

    }
}


// Methode Fetch pour récupèrer la liste des produits sur l'api puis transformer cette liste en nouvelle liste grâce au .map
//fonction map : transformer la liste issue de getAllProduct en une autre liste
function getAllProducts() {
    return fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            console.log(value);
            return value.map((val) => {
                return new Product(val.colors, val._id, val.name, val.price, val.imageUrl, val.description, val.altTxt)
            })

        })
        .catch(function (err) {
            // Une erreur est survenue
        });

};

// boucle for qui vise à parcourir l'array de Products --> puis l'insèrer dans le DOM avec la propriété innerHTML

function createHtlmFromProducts(products) {
    for (let product of products) {
        //structure 
        let elt = document.getElementById('items');
        let linkElement = document.createElement("a");
        elt.appendChild(linkElement);
        let articleElement = document.createElement("article");
        linkElement.appendChild(articleElement);
        let imgElement = document.createElement("img");
        let nameElement = document.createElement("h3");
        let descriptionElement = document.createElement("p");
        articleElement.appendChild(imgElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(descriptionElement);
        //classes
        nameElement.classList.add("productName");
        descriptionElement.classList.add("productDescription");
        //modification d'attributs
        imgElement.setAttribute('src', product.imageUrl)
        imgElement.setAttribute('alt', product.altTxt)
        linkElement.setAttribute('href', './product.html?id=' + product.id)
        //modification du dom 
        nameElement.textContent = product.name;
        descriptionElement.textContent = product.description;

    }
}

// appel des fonctions 
getAllProducts().then(function (products) {
    createHtlmFromProducts(products);
});





//Boucle for pour ranger les produits dans une array -> pour chaque itération créer un objet new Product et le PUSH dans une array prévue a cet effet





/*
CF le code à créer en remplaçant les champs prévu a cet effet par les variables de produit à chaque itération
<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>
*/



// methode eventListener ON CLICK pour récupérer l'Id 
