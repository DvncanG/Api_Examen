import { Cliente } from "./clientes.js";
import { Producto } from "./productos.js";
import { Venta } from "./ventas.js";

let tablaventas_body = document.getElementById("tablaventas_body");
let select_clientes = document.getElementById("select_clientes");
let select_productos = document.getElementById("select_productos");
let select_precios = document.getElementById("select_precios");
let btn_todos = document.getElementById("btn_todos");

// Crea una celda
const nuevaCelda = (dato) => {
  let nuevacelda = document.createElement("TD");
  nuevacelda.textContent = dato;
  return nuevacelda;
};

let people = [];
let productos = [];
let ventas = [];

// Crea una fila, TEN CUIDADO CON LOS PARENTESIS

const API_productos = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      //console.log(response)
      return response.json();
    })
    .then((products) => {
      //Guardo los productos en un array productos
      //console.log(products)
      products.map((product) => {
        console.log(product);
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
      generarVentas();
    })
    .catch((error) => console.log(error));
  let fragment = document.createDocumentFragment();

};

const API_clientes = () => {
  fetch("https://randomuser.me/api/?results=20")
    .then((response) => {
      //console.log(response)
      return response.json();
    })
    .then((response) => {
      //Guardo los productos en un array productos
      //console.log(products)
      response.results.map((response) => {
        console.log(response);
        //Guardo los productos
        people.push(
          new Cliente(
            response.login.uuid,
            response.name.first,
            response.name.last,
            response.email,
            response.login.username,
            response.login.password
          )
        );
      });
      API_productos();
    })
    .catch((error) => console.log(error));
};

const generarVentas = () => {
  people.map((person) => {
    for (let i = 0; i < 4; i++) {
      let producto = productos[Math.floor(Math.random() * productos.length)];
      let fecha = new Date();
      fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 100));
      ventas.push(
        new Venta(
          person,
          producto,
          fecha
        )
      );
    }
  });
  console.log(ventas);
  ventas.map((venta) => {
    let nuevafila = document.createElement("TR");
    nuevafila.append(nuevaCelda(venta.getCliente().getNombre() + " " + venta.getCliente().getApellidos()));
    nuevafila.append(nuevaCelda(venta.getProducto().getNombre()));
    nuevafila.append(nuevaCelda(venta.getProducto().getPrecio() + " €"));
    let date = venta.getFecha();
    let fecha = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
    nuevafila.append(nuevaCelda(fecha));
    tablaventas_body.append(nuevafila);
  });

  let fragment = document.createDocumentFragment();

  people.map(pe => {
    fragment.appendChild(imprimirOption(pe.nombre + " " + pe.apellidos))


  })
  select_clientes.appendChild(fragment)
  productos.map(pro => {
    fragment.appendChild(imprimirOption(pro.nombre))
  })
  select_productos.appendChild(fragment)
  console.log(select_productos)

};

const imprimirOption = (contenido) => {
  let option = document.createElement("OPTION")
  option.textContent = contenido
  return option
}

const filtrarVentas = () => {
  let producto = select_productos.value;
  let ventasFiltradas = [];
  ventasFiltradas = ventas.filter(items => items.producto.nombre == producto)
  filtro(ventasFiltradas)

}

const filtrarVentasCliente = () => {
  let cliente = select_clientes.value;
  let ventasFiltradas = [];
  ventasFiltradas = ventas.filter(items => items.cliente.nombre + " " + items.cliente.apellidos == cliente)
  filtro(ventasFiltradas)
}

const filtro = (ventasFiltradas) => {
  tablaventas_body.innerHTML = ""
  ventasFiltradas.map((venta) => {
    let nuevafila = document.createElement("TR");
    nuevafila.append(nuevaCelda(venta.getCliente().getNombre() + " " + venta.getCliente().getApellidos()));
    nuevafila.append(nuevaCelda(venta.getProducto().getNombre()));
    nuevafila.append(nuevaCelda(venta.getProducto().getPrecio() + " €"));
    let date = venta.getFecha();
    let fecha = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
    nuevafila.append(nuevaCelda(fecha));
    tablaventas_body.append(nuevafila);
    console.log(venta)
  });
}

const filtrarPrecio = () => {
  let precio = select_precios.value
  let precioMin;
  let precioMax;
  let ventasFiltradas = [];
  console.log(precio)
  if (precio == "10") {
    precioMax = 10
    precioMin = 0
  } else if (precio == "10-50") {
    precioMax = 50
    precioMin = 10
  } else if (precio == "50-100") {
    precioMax = 100
    precioMin = 50
  } else if (precio == "100-200") {
    precioMax = 200
    precioMin = 100

  } else if (precio == "200") {
    precioMin = 200
    precioMax = 4000000000
  }

  ventasFiltradas = ventas.filter(items => (parseFloat(items.producto.precio) > precioMin) && (parseFloat(items.producto.precio) < precioMax))
  filtro(ventasFiltradas)
}

document.addEventListener("DOMContentLoaded", API_clientes);
select_productos.addEventListener("change", filtrarVentas)
select_clientes.addEventListener("change", filtrarVentasCliente)
btn_todos.addEventListener("click", () => {
  filtro(ventas);
})

select_precios.addEventListener("change", filtrarPrecio)

