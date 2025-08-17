// Simple Navigation - No interference with page links
// Only handles mobile menu toggle and smooth scrolling for anchor links

document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple navigation loaded');
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Smooth scrolling for anchor links only
    initializeAnchorScrolling();
    
    // Navbar scroll effects
    initializeNavbarEffects();
});

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function initializeAnchorScrolling() {
    // Only handle links that start with # (anchor links)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeNavbarEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/98', 'shadow-lg');
                navbar.classList.remove('bg-white/95');
            } else {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/98', 'shadow-lg');
            }
        });
    }
}