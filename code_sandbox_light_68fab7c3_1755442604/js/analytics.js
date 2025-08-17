// Mas Saint Antoine - Analytics & SEO Tracking

// Google Analytics 4 Configuration
// Replace 'G-XXXXXXXXXX' with your actual GA4 measurement ID
if (typeof GA_MEASUREMENT_ID === 'undefined') {
    var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
}

// Initialize Google Analytics
function initializeGA4() {
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
    });
}

// Track booking interactions
function trackBookingEvent(eventName, giteType = null, dates = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'booking',
            event_label: giteType,
            custom_parameters: {
                gite_type: giteType,
                check_in: dates?.checkin || null,
                check_out: dates?.checkout || null
            }
        });
    }
    
    // Console log for debugging (remove in production)
    console.log('Booking Event:', {
        event: eventName,
        gite: giteType,
        dates: dates
    });
}

// Track contact form submissions
function trackContactEvent(inquiryType, contactMethod) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
            event_category: 'contact',
            event_label: inquiryType,
            custom_parameters: {
                inquiry_type: inquiryType,
                contact_method: contactMethod
            }
        });
    }
}

// Track page scrolling engagement
function trackScrollDepth() {
    let maxScroll = 0;
    const trackingPoints = [25, 50, 75, 90];
    const trackedPoints = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
        }
        
        trackingPoints.forEach(point => {
            if (scrollPercent >= point && !trackedPoints.has(point)) {
                trackedPoints.add(point);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        event_category: 'engagement',
                        event_label: `${point}%`,
                        value: point
                    });
                }
            }
        });
    });
}

// Track external link clicks
function trackExternalLinks() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Check if it's an external link
        if (href.startsWith('http') && !href.includes(window.location.hostname)) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'external_link',
                    event_label: href,
                    transport_type: 'beacon'
                });
            }
        }
        
        // Track social media clicks
        if (href.includes('facebook.com') || href.includes('instagram.com') || href.includes('tripadvisor.com')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    event_category: 'social',
                    event_label: href.includes('facebook') ? 'facebook' : 
                               href.includes('instagram') ? 'instagram' : 'tripadvisor'
                });
            }
        }
    });
}

// Track file downloads (if any)
function trackFileDownloads() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Check for common file extensions
        const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.jpg', '.png'];
        const isFileDownload = fileExtensions.some(ext => href.toLowerCase().includes(ext));
        
        if (isFileDownload) {
            const fileName = href.split('/').pop();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'file_download', {
                    event_category: 'download',
                    event_label: fileName
                });
            }
        }
    });
}

// Enhanced eCommerce tracking for booking funnel
function trackBookingFunnel(step, giteType = null, value = null) {
    const steps = {
        'view_gites': 1,
        'select_dates': 2,
        'view_pricing': 3,
        'begin_checkout': 4,
        'add_payment': 5,
        'complete_booking': 6
    };
    
    if (typeof gtag !== 'undefined') {
        gtag('event', step, {
            event_category: 'ecommerce',
            event_label: giteType,
            value: value,
            currency: 'EUR',
            custom_parameters: {
                funnel_step: steps[step] || 0,
                gite_type: giteType
            }
        });
    }
}

// Track search functionality
function trackSiteSearch(searchTerm, resultsCount = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'search', {
            search_term: searchTerm,
            event_category: 'site_search',
            custom_parameters: {
                search_results: resultsCount
            }
        });
    }
}

// Performance monitoring
function trackPagePerformance() {
    // Track page load time
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    name: 'page_load',
                    value: loadTime,
                    event_category: 'performance'
                });
            }
        }, 0);
    });
}

// Track form interactions
function trackFormInteractions() {
    // Track form starts
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        let formStarted = false;
        
        form.addEventListener('focusin', function() {
            if (!formStarted) {
                formStarted = true;
                const formType = this.id || 'unknown_form';
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_start', {
                        event_category: 'form',
                        event_label: formType
                    });
                }
            }
        });
        
        // Track form submissions
        form.addEventListener('submit', function(e) {
            const formType = this.id || 'unknown_form';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'form',
                    event_label: formType
                });
            }
        });
    });
}

// Initialize all tracking on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not in development mode
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        initializeGA4();
    }
    
    // Initialize tracking functions
    trackScrollDepth();
    trackExternalLinks();
    trackFileDownloads();
    trackFormInteractions();
    trackPagePerformance();
});

// Export functions for use in other scripts
window.MasAnalytics = {
    trackBookingEvent,
    trackContactEvent,
    trackBookingFunnel,
    trackSiteSearch
};