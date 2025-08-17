// Simple Language Toggle for Mas Saint Antoine

// Check if translations already exists to avoid duplicate declaration
if (typeof translations === 'undefined') {
    var translations = {
        en: {
        'nav-home': 'Home',
        'nav-gites': 'Gîtes', 
        'nav-services': 'Services',
        'nav-region': 'Region',
        'nav-contact': 'Contact',
        'nav-book': 'Book Now',
        'hero-title': 'Authentic Provençal Luxury',
        'hero-subtitle': 'Discover the magic of our 17th-century farmhouse nestled among orchards and gardens, offering six exquisite gîtes with modern comforts and timeless charm.',
        'btn-explore': 'Explore Our Gîtes',
        'btn-book': 'Check Availability'
        },
        fr: {
            'nav-home': 'Accueil',
            'nav-gites': 'Gîtes',
            'nav-services': 'Services', 
            'nav-region': 'Région',
            'nav-contact': 'Contact',
            'nav-book': 'Réserver',
            'hero-title': 'Luxe Provençal Authentique',
            'hero-subtitle': 'Découvrez la magie de notre bastide du XVIIe siècle nichée parmi les vergers et jardins, offrant six gîtes exquis avec le confort moderne et un charme intemporel.',
            'btn-explore': 'Découvrir nos Gîtes',
            'btn-book': 'Vérifier Disponibilité'
        }
    };
}

// Check if currentLanguage already exists to avoid duplicate declaration
if (typeof currentLanguage === 'undefined') {
    var currentLanguage = 'en';
}

function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('[onclick*="setLanguage"]').forEach(btn => {
        if (btn.textContent.trim() === lang.toUpperCase()) {
            btn.className = 'text-blue-600 font-medium';
        } else {
            btn.className = 'text-gray-500 hover:text-blue-600';
        }
    });
    
    // Update navigation if elements exist
    const navElements = {
        'nav-home': document.querySelector('a[href="index.html"]:not(.bg-blue-600)'),
        'nav-gites': document.querySelector('a[href="gites.html"]'),
        'nav-services': document.querySelector('a[href="services.html"]'),
        'nav-region': document.querySelector('a[href="region.html"]'),
        'nav-contact': document.querySelector('a[href="contact.html"]'),
        'nav-book': document.querySelector('a[href="booking.html"].bg-blue-600')
    };
    
    Object.keys(navElements).forEach(key => {
        if (navElements[key] && translations[lang][key]) {
            navElements[key].textContent = translations[lang][key];
        }
    });
    
    // Update hero section if on homepage
    const heroTitle = document.querySelector('h1 span:not(.text-transparent)');
    if (heroTitle && translations[lang]['hero-title']) {
        // Only update the "Luxury" part
        const luxurySpan = document.querySelector('h1 .text-transparent');
        if (luxurySpan) {
            luxurySpan.textContent = lang === 'fr' ? 'Luxe' : 'Luxury';
        }
    }
    
    const heroSubtitle = document.querySelector('h1 + p');
    if (heroSubtitle && translations[lang]['hero-subtitle']) {
        heroSubtitle.textContent = translations[lang]['hero-subtitle'];
    }
    
    const exploreBtn = document.querySelector('a[href="gites.html"]:not(.border-2)');
    if (exploreBtn && translations[lang]['btn-explore']) {
        exploreBtn.textContent = translations[lang]['btn-explore'];
    }
    
    const bookBtn = document.querySelector('a[href="booking.html"].border-2');
    if (bookBtn && translations[lang]['btn-book']) {
        bookBtn.textContent = translations[lang]['btn-book'];
    }
    
    // Store language preference
    localStorage.setItem('mas-language', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Always default to English first, then check if user has a saved preference
    const savedLanguage = localStorage.getItem('mas-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
        setLanguage(savedLanguage);
    } else {
        // Default to English
        setLanguage('en');
    }
});

// Make function available globally
window.setLanguage = setLanguage;