// French Luxury Navigation Consistency Script
// This script ensures all navigation elements are properly linked and styled

document.addEventListener('DOMContentLoaded', function() {
    // Fix all navigation links to use proper French luxury styling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Ensure proper hover colors
        link.classList.remove('hover:text-amber-600', 'hover:text-blue-600');
        link.classList.add('hover:text-luxury-gold');
        
        // Add proper tracking
        if (!link.classList.contains('tracking-wide')) {
            link.classList.add('tracking-wide');
        }
    });

    // Fix CTA buttons
    const ctaButtons = document.querySelectorAll('[href="booking.html"]');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Book') || button.textContent.includes('Reserve')) {
            button.textContent = 'Réserver';
            button.classList.add('luxury-cta', 'tracking-wider', 'uppercase');
        }
    });

    // Fix mobile menu styling
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('hover:text-amber-600', 'hover:text-blue-600');
        mobileMenuBtn.classList.add('hover:text-luxury-gold');
    }

    // Ensure all internal links work properly
    const internalLinks = document.querySelectorAll('a[href^="#"], a[href$=".html"]');
    internalLinks.forEach(link => {
        if (link.href.includes('#') && !link.href.includes('.html')) {
            // These are anchor links - ensure they work on the homepage
            if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    link.href = 'index.html' + href;
                }
            }
        }
    });

    // Add luxury touch to form elements
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.classList.remove('focus:ring-amber-500', 'focus:ring-blue-500');
        input.classList.add('focus:ring-luxury-gold');
    });
});

// Ensure proper navigation highlighting based on current page
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('text-luxury-gold', 'font-semibold');
            link.classList.remove('text-gray-700');
        }
    });
}

// Run on page load
highlightCurrentPage();