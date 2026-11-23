import { obtenerCarrito } from "./storege.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mantener actualizado el contador del carrito en el header
  actualizarContador(obtenerCarrito());

  const form = document.querySelector(".formulario");
  if (!form) return;

  // 2. Validación del formulario antes de enviar
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nombre || !email || !mensaje) {
      mostrarMensaje("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!emailValido) {
      mostrarMensaje("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // 3. Envío de datos a Formspree
    try {
      const respuesta = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (respuesta.ok) {
        mostrarMensaje("¡Mensaje enviado con éxito! Te responderemos pronto.");
        form.reset();
      } else {
        mostrarMensaje("Hubo un error al enviar el formulario. Verifica tu ID de Formspree.");
      }
    } catch (error) {
      mostrarMensaje("Error de conexión al intentar enviar el mensaje.");
      console.error(error);
    }
  });
});