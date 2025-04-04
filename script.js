// Language switching functionality
function changeLanguage(lang) {
    // Update active button
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${lang}-btn`).classList.add('active');

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}

// Download CV functionality
function downloadCV() {
    // Create a link to download the CV
    const link = document.createElement('a');
    link.href = 'Victor_Leon_CV.pdf'; // Make sure to add your CV file to the project
    link.download = 'Victor_Leon_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize with English
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('en');
});

// Add smooth scroll animation for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});