document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Form validation and character counting
    const form = document.querySelector('.contact-form');
    const inputs = {
        nombres: document.getElementById('nombres'),
        apellidos: document.getElementById('apellidos'),
        correo: document.getElementById('correo'),
        semestre: document.getElementById('semestre'),
        descripcion: document.getElementById('descripcion')
    };
    const charCounts = {
        nombres: document.getElementById('nombres-count'),
        apellidos: document.getElementById('apellidos-count'),
        descripcion: document.getElementById('descripcion-count')
    };
    const errorDiv = document.getElementById('error');

    // Character counting with visual feedback
    ['nombres', 'apellidos', 'descripcion'].forEach(field => {
        if (inputs[field] && charCounts[field]) {
            const max = field === 'descripcion' ? 500 : 100;
            
            // Initialize character count
            charCounts[field].textContent = `${inputs[field].value.length}/${max}`;
            
            inputs[field].addEventListener('input', () => {
                const value = inputs[field].value;
                const currentLength = value.length;
                
                if (currentLength > max) {
                    inputs[field].value = value.substring(0, max);
                }
                
                // Update character count
                charCounts[field].textContent = `${inputs[field].value.length}/${max}`;
                
                // Visual feedback
                if (currentLength > max * 0.8) {
                    charCounts[field].style.color = currentLength >= max ? '#e74c3c' : '#e67e22';
                } else {
                    charCounts[field].style.color = '#7f8c8d';
                }
            });
        }
    });

    // Real-time validation
    if (form) {
        // Add input event listeners for real-time validation
        Object.keys(inputs).forEach(field => {
            if (inputs[field]) {
                inputs[field].addEventListener('blur', () => validateField(field));
            }
        });
        
        // Form submission validation
        form.addEventListener('submit', (e) => {
            let errors = [];
            if (errorDiv) errorDiv.textContent = '';
            
            // Reset error styles
            Object.values(inputs).forEach(input => {
                if (input) input.classList.remove('error');
            });
            
            // Validate all fields
            Object.keys(inputs).forEach(field => {
                const error = validateField(field, false);
                if (error) errors.push(error);
            });
            
            if (errors.length > 0) {
                e.preventDefault();
                if (errorDiv) {
                    errorDiv.innerHTML = errors.map(err => `<div>${err}</div>`).join('');
                    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
        
        // Field validation function
        function validateField(field, showError = true) {
            const input = inputs[field];
            if (!input) return null;
            
            let error = null;
            input.classList.remove('error');
            
            switch (field) {
                case 'nombres':
                    if (!input.value.trim()) {
                        error = 'El campo nombres es obligatorio.';
                    }
                    break;
                case 'apellidos':
                    if (!input.value.trim()) {
                        error = 'El campo apellidos es obligatorio.';
                    }
                    break;
                case 'correo':
                    if (!input.value.trim()) {
                        error = 'El campo correo es obligatorio.';
                    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value)) {
                        error = 'Por favor, introduce un correo electrónico válido.';
                    }
                    break;
                case 'semestre':
                    if (!input.value) {
                        error = 'El campo semestre es obligatorio.';
                    } else if (input.value < 0 || input.value > 16) {
                        error = 'El semestre debe ser un número entre 0 y 16.';
                    }
                    break;
                case 'descripcion':
                    if (!input.value.trim()) {
                        error = 'El campo descripción es obligatorio.';
                    }
                    break;
            }
            
            if (error && showError) {
                input.classList.add('error');
                
                // Show tooltip or inline error
                const existingError = input.parentNode.querySelector('.field-error');
                if (existingError) {
                    existingError.textContent = error;
                } else {
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'field-error';
                    errorSpan.textContent = error;
                    errorSpan.style.color = '#e74c3c';
                    errorSpan.style.fontSize = '0.85rem';
                    errorSpan.style.display = 'block';
                    errorSpan.style.marginTop = '0.25rem';
                    input.parentNode.insertBefore(errorSpan, input.nextSibling);
                }
            } else if (!error && showError) {
                // Remove inline error if field is valid
                const existingError = input.parentNode.querySelector('.field-error');
                if (existingError) {
                    existingError.remove();
                }
            }
            
            return error;
        }
    }
});