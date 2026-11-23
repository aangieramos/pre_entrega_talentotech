import { guardarCarrito, obtenerCarrito, vaciarCarritoStorage } from "./storege.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => String(item.id) === String(producto.id));

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado al carrito");
};

export const cambiarCantidad = (indice, delta) => {
  const carrito = obtenerCarrito();
  if (!carrito[indice]) return;

  carrito[indice].cantidad += delta;
  if (carrito[indice].cantidad <= 0) {
    carrito.splice(indice, 1);
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  carrito.splice(indice, 1);

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado");
};