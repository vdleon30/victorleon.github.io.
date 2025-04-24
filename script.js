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
        // Lógica para descargar el CV
        // Podrías tener diferentes CVs por idioma
        const currentLang = document.documentElement.lang || 'en';
        let cvPath = '';

        // Ejemplo: Seleccionar CV según idioma
        switch(currentLang) {
            case 'es':
                cvPath = '/cv/VictorLeon_CV_ES.pdf'; // Ruta ejemplo
                break;
            case 'pt':
                cvPath = '/cv/VictorLeon_CV_PT.pdf'; // Ruta ejemplo
                break;
            default: // 'en' y otros
                cvPath = '/cv/VictorLeon_CV_EN.pdf'; // Ruta ejemplo
        }

        // Crear un enlace temporal y simular clic
        const link = document.createElement('a');
        link.href = cvPath;
        // El atributo 'download' sugiere el nombre del archivo al navegador
        link.download = cvPath.substring(cvPath.lastIndexOf('/') + 1); // Extrae el nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`Intentando descargar CV para el idioma: ${currentLang} desde ${cvPath}`);
    }

}); // Fin de DOMContentLoaded
