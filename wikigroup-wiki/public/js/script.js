const toggleBtn = document.getElementById('toggle-menu');
const menu = document.querySelector('.menu');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Marca como "activo" el enlace del menú según scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const id = section.getAttribute('id');
    const link = document.querySelector(`.menu li a[href="#${id}"]`);

    if (scrollPos > section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      document.querySelectorAll('.menu li a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

function validarFormulario() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const respuesta = document.getElementById('respuesta');

  if (!nombre || !email || !mensaje) {
    respuesta.textContent = "Por favor completa todos los campos.";
    respuesta.style.color = "red";
    return false;
  }

  // Simula el envío (puedes conectarlo a un backend más adelante)
  respuesta.textContent = "Mensaje enviado con éxito. ¡Gracias por contactarnos!";
  respuesta.style.color = "green";

  // Limpia el formulario
  document.querySelector(".contact-form").reset();
  return false; // Evita que la página recargue
}
