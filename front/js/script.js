const ITEMS = document.getElementById("items");

/* Récupération des données de l'API */
function retrieveProductData() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      implementData(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données depuis l'API");
    });
}

/* Implémentation des "datas" pour chaques items */

function implementData(data) {
  for (let i in data) {
    const product = data[i];
      ITEMS.appendChild(createItem(product));
    }
  
}

/* Création d'une fonction pour la création de chaques produits */
function createItem(data) {
  const articleProduct = createArticleProduct(data);
  const finalProduct = createLinkToProduct(data._id, articleProduct);
  return finalProduct;
}

/* Création de l'article */
function createArticleProduct(product) {
  const article = document.createElement("article");
  createImageProduct(product.imageUrl, product.altTxt, article);
  createTitleProduct(product.name, article);
  createDescriptionProduct(product.description, article);

  return article;
}

/*  Ajout de l'image  */
function createImageProduct(image, alt, article) {
  const element = document.createElement("img");
  element.setAttribute("src", image);
  element.setAttribute("alt", alt);
  article.appendChild(element);
}

/* Ajout de titre */
function createTitleProduct(name, article) {
  const title = document.createElement("h3");
  title.classList.add("productName");
  title.innerText = name;
  article.appendChild(title);
}

/* Ajot de description*/
function createDescriptionProduct(description, article) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("productDescription");
  paragraph.textContent = description;
  article.appendChild(paragraph);
}

/* Création  d'un href en rapport avec le bon produit */
function createLinkToProduct(id, articleProduct) {
  const productLink = document.createElement("a");
  productLink.href = `./product.html?id=${id}`;
  productLink.appendChild(articleProduct);
  return productLink;
}

retrieveProductData();
