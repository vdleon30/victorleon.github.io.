document.addEventListener('DOMContentLoaded', () => {
    // --- Language Switcher ---
    const langButtons = document.querySelectorAll('.language-switcher button');
    const translatableElements = document.querySelectorAll('[data-en], [data-es], [data-pt]'); // Selecciona todos los elementos con data attributes de idioma

    function changeLanguage(lang) {
        // Actualizar botón activo
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Actualizar texto de los elementos
        translatableElements.forEach(el => {
            const text = el.dataset[lang];
            if (text) {
                // Si el elemento es un <input> o <textarea>, usa .value
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.value = text;
                    // También actualiza el placeholder si existe
                    if (el.placeholder) {
                        el.placeholder = text;
                    }
                } else {
                    // Para otros elementos, usa textContent
                    el.textContent = text;
                }
            }
        });

        // Actualizar el atributo lang del HTML (buena práctica)
        document.documentElement.lang = lang;

        // Opcional: Guardar preferencia en localStorage
        // localStorage.setItem('preferredLanguage', lang);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            changeLanguage(button.dataset.lang);
        });
    });

    // Opcional: Cargar idioma preferido al inicio
    // const preferredLang = localStorage.getItem('preferredLanguage') || 'en';
    // changeLanguage(preferredLang);
    // Inicializar con el idioma por defecto (inglés en este caso)
    changeLanguage('en');


    // --- Download CV Button ---
    const downloadBtn = document.getElementById('download-cv-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            downloadCV();
        });
    }

        function downloadCV() {
            // Lógica para abrir el CV en otra pestaña según el idioma
            const currentLang = document.documentElement.lang || 'en';
            let cvPath = '';

            switch (currentLang) {
            case 'es':
                cvPath = './cv/VictorLeon_CV_ES.pdf';
                break;
            case 'pt':
                cvPath = './cv/VictorLeon_CV_PT.pdf';
                break;
            default:
                cvPath = './cv/VictorLeon_CV_EN.pdf';
            }

            // Abrir el archivo en una nueva pestaña
            window.open(cvPath, '_blank');

            console.log(`Abriendo CV para el idioma: ${currentLang} desde ${cvPath}`);
        }


    const experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach(item => {
        const toggleBtn = item.querySelector('.expand-details-btn');
        const detailsWrapper = item.querySelector('.experience-details-wrapper');
        const toggleTextSpan = toggleBtn ? toggleBtn.querySelector('.toggle-text') : null; // Span para el texto
        const currentLang = document.documentElement.lang || 'en'; // Obtener idioma actual

        if (toggleBtn && detailsWrapper && toggleTextSpan) {
            // Establecer texto inicial del botón según el idioma
            const showTextAttr = `data-${currentLang}-show`;
            toggleTextSpan.textContent = toggleBtn.getAttribute(showTextAttr) || toggleBtn.getAttribute('data-en-show'); // Texto inicial

            toggleBtn.addEventListener('click', () => {
                const isExpanded = item.classList.toggle('expanded'); // Añade/quita la clase 'expanded'
                toggleBtn.setAttribute('aria-expanded', isExpanded); // Actualiza ARIA

                // Actualizar texto del botón
                const lang = document.documentElement.lang || 'en'; // Re-chequear idioma por si cambió
                const textAttr = isExpanded ? `data-${lang}-hide` : `data-${lang}-show`;
                const fallbackAttr = isExpanded ? 'data-en-hide' : 'data-en-show';
                toggleTextSpan.textContent = toggleBtn.getAttribute(textAttr) || toggleBtn.getAttribute(fallbackAttr);

                // Opcional: Si usas display: none/block, no necesitas esto.
                // Si usas max-height, puede ser útil re-calcular si el contenido cambia dinámicamente.
                // if (isExpanded) {
                //   detailsWrapper.style.maxHeight = detailsWrapper.scrollHeight + "px";
                // } else {
                //   detailsWrapper.style.maxHeight = null;
                // }
            });
        }
    });

    // Asegurarse de que el texto del botón se actualice al cambiar de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Pequeña demora para asegurar que el cambio de idioma se aplicó
            setTimeout(() => {
                const newLang = document.documentElement.lang || 'en';
                experienceItems.forEach(item => {
                    const toggleBtn = item.querySelector('.expand-details-btn');
                    const toggleTextSpan = toggleBtn ? toggleBtn.querySelector('.toggle-text') : null;
                    if (toggleBtn && toggleTextSpan) {
                        const isExpanded = item.classList.contains('expanded');
                        const textAttr = isExpanded ? `data-${newLang}-hide` : `data-${newLang}-show`;
                        const fallbackAttr = isExpanded ? 'data-en-hide' : 'data-en-show';
                        toggleTextSpan.textContent = toggleBtn.getAttribute(textAttr) || toggleBtn.getAttribute(fallbackAttr);
                    }
                });
            }, 50); // 50ms de espera
        });
    });

}); // Fin de DOMContentLoaded
