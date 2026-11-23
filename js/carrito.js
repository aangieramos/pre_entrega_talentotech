import { obtenerCarrito } from "./storege.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";
import { cambiarCantidad, eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  if (!contenedor || !divAcciones) return;

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p style='text-align:center;'>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;

  carrito.forEach((item, indice) => {
    const cantidad = item.cantidad || 1;
    const subtotal = item.precio * cantidad;
    total += subtotal;

    // Ajusta la ruta de la imagen para que se vea desde pages/carrito.html
    const rutaImagen = item.img.startsWith("http") || item.img.startsWith("../")
      ? item.img
      : `../${item.img}`;

    const fila = document.createElement("div");
    fila.classList.add("item-carrito");
    fila.innerHTML = `
      <img src="${rutaImagen}" alt="${item.nombre}">
      <div style="flex:1;">
        <h4>${item.nombre}</h4>
        <p>$${Number(item.precio).toFixed(2)} c/u</p>
      </div>
      <div class="controles-cantidad">
        <button class="btn-cant btn-restar" aria-label="Disminuir cantidad">-</button>
        <span>${cantidad}</span>
        <button class="btn-cant btn-sumar" aria-label="Aumentar cantidad">+</button>
      </div>
      <strong>$${subtotal.toFixed(2)}</strong>
      <button class="btn-eliminar">Eliminar</button>
    `;

    fila.querySelector(".btn-restar").addEventListener("click", () => {
      cambiarCantidad(indice, -1);
      renderizarCarrito();
    });

    fila.querySelector(".btn-sumar").addEventListener("click", () => {
      cambiarCantidad(indice, 1);
      renderizarCarrito();
    });

    fila.querySelector(".btn-eliminar").addEventListener("click", () => {
      eliminarProducto(indice);
      renderizarCarrito();
    });

    contenedor.appendChild(fila);
  });

  divAcciones.innerHTML = `
    <h3>Total: $${total.toFixed(2)}</h3>
    <div style="display:flex; gap:1rem;">
      <button id="btn-vaciar" class="btn-eliminar">Vaciar Carrito</button>
      <button id="btn-finalizar" class="btn-accion">Finalizar Compra</button>
    </div>
  `;

  document.getElementById("btn-vaciar").addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  document.getElementById("btn-finalizar").addEventListener("click", () => {
    mostrarMensaje("¡Gracias por tu compra! Pedido realizado con éxito.");
    vaciarCarrito();
    renderizarCarrito();
  });
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);