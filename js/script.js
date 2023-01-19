import { Producto } from "./productos.js";

const cards = document.getElementById("cards");
const precio = document.getElementById("precio");
const modal_aniadir = document.getElementById("modal_aniadir");
const modal_cancelar = document.getElementById("modal_cancelar");
const modal_title = document.getElementById("modal_title");
const modal_container = document.getElementById("modal_container");
const carrito__compra = document.getElementById("carrito__compra");
let productos = [];
let objeto_json = {};
let carrito = []; 

const createItemsCard = (product) => {
  let card = document.createElement("ARTICLE");
  card.classList.add("card");

  let img = document.createElement("IMG");
  img.classList.add("card__img");
  img.src = product.imagen;
  card.appendChild(img);
  console.log(product.image)

  let p = document.createElement("P");
  p.classList.add("card__text");
  p.textContent = product.nombre;
  card.appendChild(p);

  let div = document.createElement("DIV");
  div.classList.add("card__precios");
  card.appendChild(div);

  let span = document.createElement("SPAN");
  span.classList.add("card__rebajado");
  span.textContent = (product.precio * 0.8).toFixed(2) + " €";
  div.appendChild(span);

  let spanp = document.createElement("SPAN");
  spanp.classList.add("card__precio");
  spanp.textContent = product.precio + " €";
  div.appendChild(spanp);

  let button = document.createElement("BUTTON");
  button.classList.add("card__button");
  button.textContent = "Añadir al carro";

  let i = document.createElement("I");
  i.classList.add("fa-solid");
  i.classList.add("fa-cart-arrow-down");
  i.classList.add("card__icon");
  button.appendChild(i);
  card.appendChild(button);

  return card;
};

const generarCardsProductos = (arrayProductos) => {
  let fragment = document.createDocumentFragment();
  arrayProductos.map((producto) => {
    fragment.appendChild(createItemsCard(producto));
  });
  cards.appendChild(fragment);
  console.log(productos);
};

const API = () => {
  fetch("https://fakestoreapi.com/products")
  .then((response) => {
    //console.log(response)
    return response.json();
  })
  .then((products) => {
    //Guardo los productos en un array productos
    //console.log(products)
    products.map((product) => {
      console.log(product)
      //Guardo los productos
      productos.push(
        new Producto(
          product.id,
          product.title,
          (product.price * 0.8).toFixed(2),
          product.image
        )
      );
    });
    generarCardsProductos(productos);

  })
  .catch((error) => console.log(error));
  
};

const modal = (e) => {
  if (e.target.classList.contains("card__button")) {
    console.log(e.target);
    objeto_json ={
      "titulo": e.target.parentElement.children[1].textContent,
      "precio": e.target.parentElement.children[2].children[0].textContent,
      "imagen": e.target.parentElement.children[0].src
    }
    console.log(objeto_json)
  modal_container.classList.add("modal__mostrar");
  }
};

const modal_añadir = (ev) => {
  if (ev.target.classList.contains("modal__button")) {
    console.log(ev.target);

    if (localStorage.getItem("carrito") != null) {
      localStorage.getItem("carrito", JSON.stringify(objeto_json));
      carrito = JSON.parse(localStorage.getItem("carrito"));  
    }
    carrito.push(objeto_json);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    modal_container.classList.remove("modal__mostrar");
  }else if (ev.target.classList.contains("modal__button--cancelar")) {
    modal_container.classList.remove("modal__mostrar");
  }

}

//PARA CREAR UNA TARJETA

document.addEventListener("DOMContentLoaded", API); 
document.addEventListener("click", modal);
document.addEventListener("click", modal_añadir);