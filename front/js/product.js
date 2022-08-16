/* Récupération de toutes les données de l'API */ 

const url = new URL(window.location.href);
const id = url.searchParams.get("_id");

async function retrieveProductData() {
  return (await fetch(`http://localhost:3000/api/products/${id}`)).json();
}
const getProductData = async () => {
  try {
    return retrieveProductData();
  } catch {
    console.error("Erreur lors de la récupération des données du produit");
  }
};

/* placements des différentes infos produit */
const createProductItem = async () => {
  const product = await getProductData();
  createProductImg(product.imageUrl, product.altTxt);
  createProductTitle(product.name);
  createProductDescription(product.description);
  createProductPrice(product.price);
};

/* Implementation de l'image */
function createProductImg(image, altText) {
  const productItem = document.getElementsByClassName("item__img")[0];
  const productImg = document.createElement("imageUrl");
  productImg.src = image;
  productImg.alt = altText;

  productItem.appendChild(productImg);
}

/* Implementation du titre*/
function createProductTitle(title) {
  const productName = document.getElementById("title");
  const productTitle = document.getElementsByTagName("title")[0];
  productName.innerText = title;
  productTitle.innerText = title;
}

/* Implementation du prix */
function createProductPrice(price) {
  const productPrice = document.getElementById("price");
  productPrice.innerText = price;
}

/* Implementation de la description */
function createProductDescription(description) {
  const productDescription = document.getElementById("description");
  productDescription.innerText = description;
}


function verifyCompatibility() {
  if (localStorage) {
    allSelectedOptions();
  } else {
    console.error(
      "Désolé, votre navigateur ne supporte pas le localStorage..."
    );
  }
}
/* création de l'ajout a la carte */
const addToCart = async (quantity, color) => {
  let panier = JSON.parse(localStorage.getItem("panier"));
  let isExist = false;
  if (panier === null || panier === undefined) {
    panier = [];
  } else if (panier.find((item) => item.id === id && item.color == color)) {
    panier.map((obj) => {
      if (obj.id == id && obj.color == color) {
        obj.quantity += parseInt(quantity);
        isExist = true;
      }
    });
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Quantité mise à jour");
  }
  if (!isExist) {
    panier.push({
      id: id,
      quantity: quantity,
      color: color,
    });
    console.log("Produit ajouté au panier");
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};

const button = document.getElementById("addToCart");
button.addEventListener("click", verifyCompatibility);

createProductItem();
