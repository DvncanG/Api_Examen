const productos = document.getElementById("productos");
const btncomprar = document.getElementById("btncomprar");
const precio_total = document.getElementById("precio_total");

//PARA CREAR UN PRODUCTO
// articulo

let carro = JSON.parse(localStorage.getItem("carrito"));
let total = 0
console.log(carro)
let fragment = document.createDocumentFragment();

carro.map(carrito => {
    let artproducto = document.createElement("ARTICLE");
    artproducto.classList.add("producto");

    // img
    let img = document.createElement("IMG");
    img.classList.add("producto__img");
    img.src = carrito.imagen
    artproducto.appendChild(img);

    // section
    let section = document.createElement("SECTION");
    section.classList.add("producto__textos");
    artproducto.appendChild(section);

    // span
    let span = document.createElement("SPAN");
    span.classList.add("producto__texto");
    span.textContent = "Nombre: ";
    section.appendChild(span);

    // span
    span = document.createElement("SPAN");
    span.textContent = carrito.titulo
    section.appendChild(span);

    //br
    let br = document.createElement("BR");
    section.appendChild(br);

    // span
    span = document.createElement("SPAN");
    span.classList.add("producto__texto");
    span.textContent = "Precio: ";
    section.appendChild(span);

    //span
    span = document.createElement("SPAN");
    total += parseInt(carrito.precio.substring(0, carrito.precio.length - 1));
    span.textContent = carrito.precio
    section.appendChild(span);

    //button
    let button = document.createElement("BUTTON");
    button.classList.add("producto__btnborrar");
    button.id = "producto_btnborrar";
    button.textContent = "Eliminar";
    section.appendChild(button);
    fragment.appendChild(artproducto)

})

const eliminarElemento = () => {

    let btnborrar = document.querySelectorAll("#producto_btnborrar");
    btnborrar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let producto = e.target.parentElement.parentElement;
            let titulo = producto.querySelector("span:nth-child(2)").textContent;
            let precio = producto.querySelector("span:nth-child(5)").textContent.split(" ")[0];
            let carro = JSON.parse(localStorage.getItem("carrito"));
            let carroFiltrado = carro.filter(producto => producto.titulo !== titulo && producto.precio !== precio);
            localStorage.setItem("carrito", JSON.stringify(carroFiltrado));
            producto.remove();
           precio_total.textContent = parseInt(precio_total.textContent) - parseInt(precio)
        })
    })

    

}

const compra = () =>{
    localStorage.removeItem("carrito")
    precio_total.textContent = 0;
    productos.innerHTML= ""
}

precio_total.textContent = total
productos.appendChild(fragment)

document.addEventListener("click", eliminarElemento)
btncomprar.addEventListener("click",compra)




