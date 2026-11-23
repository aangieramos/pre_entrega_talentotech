import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storege.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Actualiza el contador del carrito al cargar la página
  actualizarContador(obtenerCarrito());

  const contenedor = document.getElementById("contenedor-tarjetas");
  if (!contenedor) return;

  // Obtiene los productos desde tu archivo JSON
  fetch("../data/products.json")
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar products.json");
      return res.json();
    })
    .then((data) => {
      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");
        tarjeta.dataset.id = producto.id;

        const img = document.createElement("img");
        img.src = `../${producto.img}`;
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

        // Al hacer clic, envía el objeto completo (incluyendo su id) al carrito
        boton.addEventListener("click", () => {
          agregarAlCarrito({
            id: producto.id,
            nombre: producto.nombre,
            img: `../${producto.img}`,
            precio: producto.precio
          });
        });

        tarjeta.append(img, titulo, descripcion, precio, boton);
        contenedor.appendChild(tarjeta);
      });
    })
    .catch((err) => {
      contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
      console.error(err);
    });
});