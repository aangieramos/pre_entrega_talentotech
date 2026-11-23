export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    // Suma la cantidad de cada producto (si no tiene cantidad aún, cuenta 1)
    const totalUnidades = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    contador.textContent = totalUnidades;
  }
};

export const mostrarMensaje = (texto) => {
  // Elimina una notificación anterior si todavía está visible
  const existente = document.querySelector(".toast-notificacion");
  if (existente) existente.remove();

  // Crea la notificación flotante
  const toast = document.createElement("div");
  toast.className = "toast-notificacion";
  toast.textContent = texto;
  document.body.appendChild(toast);

  // Muestra con animación suave y la oculta a los 2.5 segundos
  requestAnimationFrame(() => toast.classList.add("visible"));

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
};
