// Mas Saint Antoine - Booking System JavaScript

// Gîte data structure
const gitesData = {
    'the-mas': {
        name: 'The Mas',
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        type: 'Main House',
        description: 'The crown jewel of our property with authentic Provençal charm',
        features: ['Fully equipped kitchen', 'Private terrace with BBQ', 'Original stone fireplace', 'Air conditioning'],
        priceHigh: 180,
        priceMid: 150,
        priceLow: 120
    },
    'casa-dora': {
        name: 'Casa Dora',
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        type: 'Family Gîte',
        description: 'Spacious and comfortable, ideal for families or small groups',
        features: ['Large living room', 'Modern kitchen', 'Private terrace', 'Air conditioning'],
        priceHigh: 150,
        priceMid: 125,
        priceLow: 100
    },
    'chez-pauline': {
        name: 'Chez Pauline',
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        type: 'Romantic Cottage',
        description: 'Charming cottage perfect for romantic getaways',
        features: ['Kitchenette', 'Private garden', 'Garden views', 'Air conditioning'],
        priceHigh: 120,
        priceMid: 100,
        priceLow: 85
    },
    'st-sebastien': {
        name: 'St Sébastien',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        type: 'Garden Studio',
        description: 'Peaceful retreat among the orchards',
        features: ['Kitchenette', 'Garden views', 'Private entrance', 'Air conditioning'],
        priceHigh: 100,
        priceMid: 85,
        priceLow: 70
    },
    'le-cabanon': {
        name: 'Le Cabanon',
        guests: 3,
        bedrooms: 1,
        bathrooms: 1,
        type: 'Rustic Cabin',
        description: 'Cozy cabin-style gîte with rustic charm',
        features: ['Kitchenette', 'Rustic décor', 'Private terrace', 'Air conditioning'],
        priceHigh: 110,
        priceMid: 90,
        priceLow: 75
    },
    'le-kiwi': {
        name: 'Le Kiwi',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        type: 'Studio Apartment',
        description: 'Bright and airy studio with garden views',
        features: ['Studio layout', 'Garden views', 'Pool access', 'Air conditioning'],
        priceHigh: 95,
        priceMid: 80,
        priceLow: 65
    },
    'pool-studio': {
        name: 'Pool Studio',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        type: 'Pool Studio',
        description: 'Modern studio with direct pool access',
        features: ['Pool access', 'Modern design', 'Panoramic views', 'Air conditioning'],
        priceHigh: 105,
        priceMid: 90,
        priceLow: 75
    }
};

// Booking system initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingForm();
    initializeCalendar();
    setDefaultDates();
    
    // Check for URL parameters (if coming from gîte page)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedGite = urlParams.get('gite');
    if (selectedGite && gitesData[selectedGite]) {
        document.getElementById('gite-select').value = selectedGite;
        updateGiteInfo(selectedGite);
    }
});

// Initialize booking form functionality
function initializeBookingForm() {
    const form = document.getElementById('booking-form');
    const giteSelect = document.getElementById('gite-select');
    const checkinDate = document.getElementById('checkin-date');
    const checkoutDate = document.getElementById('checkout-date');
    
    // Gîte selection change handler
    giteSelect.addEventListener('change', function() {
        const selectedGite = this.value;
        if (selectedGite) {
            updateGiteInfo(selectedGite);
        } else {
            hideGiteInfo();
        }
    });
    
    // Date change handlers
    checkinDate.addEventListener('change', validateDates);
    checkoutDate.addEventListener('change', validateDates);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSearch();
    });
}

// Set default dates (today + 7 days for a week stay)
function setDefaultDates() {
    const today = new Date();
    const checkin = new Date(today);
    checkin.setDate(today.getDate() + 7); // Default check-in 7 days from now
    
    const checkout = new Date(checkin);
    checkout.setDate(checkin.getDate() + 7); // Default 1 week stay
    
    document.getElementById('checkin-date').value = formatDate(checkin);
    document.getElementById('checkout-date').value = formatDate(checkout);
}

// Quick date setting function
function setQuickDates(nights) {
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
    
    let checkin = new Date();
    checkin.setDate(checkin.getDate() + 7); // Start 7 days from now
    
    let checkout = new Date(checkin);
    checkout.setDate(checkin.getDate() + nights);
    
    checkinInput.value = formatDate(checkin);
    checkoutInput.value = formatDate(checkout);
    
    validateDates();
}

// Format date for input fields
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Validate dates
function validateDates() {
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
    
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if check-in is in the past
    if (checkin < today) {
        checkinInput.setCustomValidity('Check-in date must be in the future');
        return false;
    } else {
        checkinInput.setCustomValidity('');
    }
    
    // Check if checkout is after checkin
    if (checkout <= checkin) {
        checkoutInput.setCustomValidity('Check-out must be after check-in date');
        return false;
    } else {
        checkoutInput.setCustomValidity('');
    }
    
    // Calculate nights and update display if both dates are valid
    if (checkinInput.value && checkoutInput.value && checkout > checkin) {
        const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
        updatePriceEstimate(nights);
    }
    
    return true;
}

// Update gîte information display
function updateGiteInfo(giteId) {
    const gite = gitesData[giteId];
    const giteInfoContainer = document.getElementById('gite-info');
    const detailsContainer = document.getElementById('selected-gite-details');
    
    if (!gite) return;
    
    detailsContainer.innerHTML = `
        <div class="border-b border-gray-200 pb-4 mb-4">
            <h4 class="font-playfair text-lg font-semibold text-gray-800">${gite.name}</h4>
            <p class="text-sm text-gray-600">${gite.type}</p>
        </div>
        
        <div class="space-y-2 mb-4">
            <div class="flex justify-between">
                <span class="text-gray-600">Guests:</span>
                <span class="font-semibold">Up to ${gite.guests}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Bedrooms:</span>
                <span class="font-semibold">${gite.bedrooms}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Bathrooms:</span>
                <span class="font-semibold">${gite.bathrooms}</span>
            </div>
        </div>
        
        <p class="text-gray-600 text-sm mb-4">${gite.description}</p>
        
        <div class="bg-gray-50 rounded-lg p-3">
            <h5 class="text-sm font-semibold text-gray-800 mb-2">Key Features:</h5>
            <ul class="text-xs text-gray-600 space-y-1">
                ${gite.features.map(feature => `<li>• ${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="mt-4 p-3 bg-amber-50 rounded-lg">
            <div class="text-sm">
                <div class="flex justify-between mb-1">
                    <span class="text-gray-600">High Season:</span>
                    <span class="font-semibold text-amber-800">€${gite.priceHigh}/night</span>
                </div>
                <div class="flex justify-between mb-1">
                    <span class="text-gray-600">Mid Season:</span>
                    <span class="font-semibold text-blue-800">€${gite.priceMid}/night</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Low Season:</span>
                    <span class="font-semibold text-green-800">€${gite.priceLow}/night</span>
                </div>
            </div>
        </div>
    `;
    
    giteInfoContainer.style.display = 'block';
}

// Hide gîte info
function hideGiteInfo() {
    document.getElementById('gite-info').style.display = 'none';
}

// Update price estimate based on selected dates and gîte
function updatePriceEstimate(nights) {
    const giteSelect = document.getElementById('gite-select');
    const selectedGite = giteSelect.value;
    
    if (!selectedGite || !gitesData[selectedGite]) return;
    
    const gite = gitesData[selectedGite];
    const checkinDate = new Date(document.getElementById('checkin-date').value);
    const month = checkinDate.getMonth() + 1; // JavaScript months are 0-indexed
    
    // Determine season pricing
    let pricePerNight;
    let seasonName;
    
    if (month >= 7 && month <= 8) { // July-August: High season
        pricePerNight = gite.priceHigh;
        seasonName = 'High Season';
    } else if ((month >= 5 && month <= 6) || month === 9) { // May-June, September: Mid season
        pricePerNight = gite.priceMid;
        seasonName = 'Mid Season';
    } else { // October-April: Low season
        pricePerNight = gite.priceLow;
        seasonName = 'Low Season';
    }
    
    const totalPrice = pricePerNight * nights;
    
    // Update price display (you could add a price summary element)
    console.log(`${nights} nights in ${seasonName}: €${totalPrice} total (€${pricePerNight}/night)`);
}

// Handle booking search/availability check
function handleBookingSearch() {
    const formData = {
        gite: document.getElementById('gite-select').value,
        guests: document.getElementById('guests-select').value,
        checkin: document.getElementById('checkin-date').value,
        checkout: document.getElementById('checkout-date').value
    };
    
    // Validate form
    if (!formData.gite) {
        showNotification('Please select a gîte', 'error');
        return;
    }
    
    if (!formData.checkin || !formData.checkout) {
        showNotification('Please select both check-in and check-out dates', 'error');
        return;
    }
    
    if (!validateDates()) {
        showNotification('Please check your dates', 'error');
        return;
    }
    
    // Check guest capacity
    const selectedGite = gitesData[formData.gite];
    if (parseInt(formData.guests) > selectedGite.guests) {
        showNotification(`This gîte accommodates up to ${selectedGite.guests} guests`, 'error');
        return;
    }
    
    // Simulate availability check and show results
    showBookingResults(formData);
}

// Show booking search results
function showBookingResults(formData) {
    const gite = gitesData[formData.gite];
    const checkin = new Date(formData.checkin);
    const checkout = new Date(formData.checkout);
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    
    // Determine pricing
    const month = checkin.getMonth() + 1;
    let pricePerNight, seasonName;
    
    if (month >= 7 && month <= 8) {
        pricePerNight = gite.priceHigh;
        seasonName = 'High Season';
    } else if ((month >= 5 && month <= 6) || month === 9) {
        pricePerNight = gite.priceMid;
        seasonName = 'Mid Season';
    } else {
        pricePerNight = gite.priceLow;
        seasonName = 'Low Season';
    }
    
    const subtotal = pricePerNight * nights;
    const cleaningFee = 75; // Standard cleaning fee
    const total = subtotal + cleaningFee;
    
    // Create booking results modal/popup
    const resultsHtml = `
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" id="booking-results">
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-6">
                        <h2 class="font-playfair text-2xl font-bold text-gray-800">Booking Summary</h2>
                        <button onclick="closeBookingResults()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="bg-amber-50 rounded-lg p-6">
                            <h3 class="font-playfair text-xl font-semibold text-gray-800 mb-2">${gite.name}</h3>
                            <p class="text-gray-600 mb-4">${gite.description}</p>
                            
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">Check-in:</span>
                                    <p class="font-semibold">${checkin.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div>
                                    <span class="text-gray-600">Check-out:</span>
                                    <p class="font-semibold">${checkout.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div>
                                    <span class="text-gray-600">Guests:</span>
                                    <p class="font-semibold">${formData.guests}</p>
                                </div>
                                <div>
                                    <span class="text-gray-600">Nights:</span>
                                    <p class="font-semibold">${nights}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-6">
                            <h4 class="font-semibold text-gray-800 mb-4">Price Breakdown</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">€${pricePerNight} × ${nights} nights (${seasonName})</span>
                                    <span class="font-semibold">€${subtotal}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Cleaning fee</span>
                                    <span class="font-semibold">€${cleaningFee}</span>
                                </div>
                                <div class="border-t border-gray-200 pt-2 mt-2">
                                    <div class="flex justify-between text-lg">
                                        <span class="font-bold text-gray-800">Total</span>
                                        <span class="font-bold text-amber-600">€${total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex space-x-4">
                            <button onclick="proceedToBooking()" class="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                <i class="fas fa-credit-card mr-2"></i>
                                Proceed to Booking
                            </button>
                            <button onclick="closeBookingResults()" class="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Modify Search
                            </button>
                        </div>
                        
                        <div class="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                            <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                            <strong>Availability confirmed!</strong> This gîte is available for your selected dates. 
                            Click "Proceed to Booking" to complete your reservation.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', resultsHtml);
}

// Close booking results modal
function closeBookingResults() {
    const modal = document.getElementById('booking-results');
    if (modal) {
        modal.remove();
    }
}

// Proceed to actual booking process
function proceedToBooking() {
    showNotification('Redirecting to secure booking platform...', 'info');
    // Here you would typically redirect to a secure booking platform like Stripe, PayPal, or a property management system
    setTimeout(() => {
        closeBookingResults();
        showNotification('In a real implementation, this would redirect to the payment processing system.', 'info');
    }, 2000);
}

// Simple calendar initialization (placeholder)
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    // Generate a simple calendar for January 2024 (placeholder)
    const daysInMonth = 31;
    const firstDayOfWeek = 1; // Monday (0 = Sunday, 1 = Monday, etc.)
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'h-10';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer hover:bg-amber-100 transition-colors';
        dayElement.textContent = day;
        
        // Mark some days as unavailable (red), available (green), or partially booked (yellow)
        const rand = Math.random();
        if (rand < 0.1) {
            dayElement.classList.add('bg-red-100', 'text-red-800', 'cursor-not-allowed');
            dayElement.title = 'Unavailable';
        } else if (rand < 0.2) {
            dayElement.classList.add('bg-yellow-100', 'text-yellow-800');
            dayElement.title = 'Limited availability';
        } else {
            dayElement.classList.add('bg-green-100', 'text-green-800');
            dayElement.title = 'Available';
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Notification function (reused from main.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}