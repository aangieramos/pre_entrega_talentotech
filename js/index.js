import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storege.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Actualizar siempre el contador del carrito al entrar
  actualizarContador(obtenerCarrito());

  // 2. Cargar solo el primer producto como destacado en index.html
  const contenedor = document.getElementById("contenedor-productos-fakestore");
  if (!contenedor) return;

  fetch("./data/products.json")
    .then((res) => res.json())
    .then((data) => {
      // Toma únicamente el primer producto (índice 0). Si quieres el 2do usa data[1], o el 3ro data[2]
      const producto = data[0];
      if (!producto) return;

      const tarjeta = document.createElement("article");
      tarjeta.classList.add("card");

      const img = document.createElement("img");
      img.src = `./${producto.img}`;
      img.alt = producto.nombre;

      const titulo = document.createElement("h3");
      titulo.textContent = producto.nombre;

      const descripcion = document.createElement("p");
      descripcion.textContent = producto.descripcion;

      const precio = document.createElement("span");
      precio.classList.add("precio");
      precio.textContent = `$${producto.precio.toFixed(2)}`;

      const boton = document.createElement("button");
      boton.classList.add("btn-agregar");
      boton.textContent = "Agregar al carrito";

      boton.addEventListener("click", () => {
        agregarAlCarrito({
          id: producto.id,
          nombre: producto.nombre,
          img: producto.img,
          precio: producto.precio
        });
      });

      tarjeta.append(img, titulo, descripcion, precio, boton);
      contenedor.appendChild(tarjeta);
    })
    .catch((err) => console.error("Error al cargar producto destacado:", err));
});