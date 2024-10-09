// URL to fetch services from the backend
const servicesUrl = `${config.API_URL}/services/`;

// Define the orderDetails variable globally so it's accessible in all functions
let orderDetails;

// Function to fetch services from the backend
async function fetchServices() {
    try {
        const response = await fetch(servicesUrl, {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const servicesData = await response.json();
        console.log('Fetched Services:', servicesData);
        renderServices(servicesData);
    } catch (error) {
        console.error('Failed to fetch services:', error);
    }
}

// Function to render services
function renderServices(services) {
    const servicesList = document.getElementById('servicess-list');
    servicesList.innerHTML = ''; // Clear existing services

    services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('servicess-item');
        serviceElement.innerHTML = `
            <label class="servicess-item">
                <input type="checkbox" class="servicess-checkbox" data-id="${service.id}" data-price="${service.price}" data-category-id="${service.category}">
                <span>${service.name}</span>
                <span class="price"> - Ksh. ${service.price}</span>
                <div class="quantity-controls">
                    <button class="decrease" disabled>-</button>
                    <span class="count">0</span>
                    <button class="increase" disabled>+</button>
                </div>
            </label>
        `;
        servicesList.appendChild(serviceElement);

        // Add event listeners for increase and decrease buttons
        const increaseButton = serviceElement.querySelector('.increase');
        const decreaseButton = serviceElement.querySelector('.decrease');
        const countDisplay = serviceElement.querySelector('.count');
        const checkbox = serviceElement.querySelector('.servicess-checkbox');

        let count = 0;

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                increaseButton.disabled = false;
                decreaseButton.disabled = false;
                count = 1;
                countDisplay.textContent = count;
                updateTotalCost();
            } else {
                increaseButton.disabled = true;
                decreaseButton.disabled = true;
                count = 0;
                countDisplay.textContent = count;
                updateTotalCost();
            }
        });

        increaseButton.addEventListener('click', () => {
            count++;
            countDisplay.textContent = count;
            updateTotalCost();
        });

        decreaseButton.addEventListener('click', () => {
            if (count > 1) {
                count--;
                countDisplay.textContent = count;
                updateTotalCost();
            } else {
                count = 1;
                countDisplay.textContent = count;
            }
        });
    });
}

function updateTotalCost() {
    const selectedServices = Array.from(document.querySelectorAll('.servicess-checkbox:checked')).map(checkbox => {
        const servicePrice = parseFloat(checkbox.getAttribute('data-price'));
        const serviceCount = parseInt(checkbox.closest('.servicess-item').querySelector('.count').textContent);
        return servicePrice * serviceCount;
    });

    const totalCost = selectedServices.reduce((acc, curr) => acc + curr, 0);
    document.getElementById('total-cost').textContent = totalCost;
}

// Initialize the service rendering
fetchServices();


// Add event listener for checkout button
document.getElementById('checkout').addEventListener('click', () => {
    const selectedServices = Array.from(document.querySelectorAll('.servicess-checkbox:checked')).map(checkbox => {
        const serviceName = checkbox.nextElementSibling.textContent.trim(); // Get service name
        const servicePrice = checkbox.getAttribute('data-price');
        const serviceCount = parseInt(checkbox.closest('.servicess-item').querySelector('.count').textContent);
        const serviceDescription = "Service description here"; // You may want to fetch or set this dynamically
        const serviceCategory = parseInt(checkbox.getAttribute('data-category-id'), 10); // Ensure category ID is an integer

        // Check if serviceCategory is null
        if (isNaN(serviceCategory) || serviceCategory === null) {
            console.error('Service category is null or invalid:', serviceCategory);
        }

        return {
            service: {
                name: serviceName,
                description: serviceDescription,
                price: servicePrice,
                category: serviceCategory,
            },
            quantity: serviceCount, // Use the actual count for quantity
            price: servicePrice, // Price for each service
        };
    });

    const userId = localStorage.getItem('userId');
    const userDetails = {
        telephone: localStorage.getItem('telephone') || 'string', // Ensure you have the telephone in local storage
        location: document.getElementById('location').value || 'string',
    };

    // Define orderDetails here
    orderDetails = {
        user: userId, // User ID, replace with the actual user ID as necessary
        items: selectedServices,
        event_type: document.getElementById('event-type').value || 'string', // Event type selected by user
        paid: false, // Set to true once payment is confirmed
        mpesa_code: '', // To be set after confirmation
        total_price: document.getElementById('total-cost').textContent,
        telephone: userDetails.telephone,
        location: userDetails.location,
        date: document.getElementById('date').value || new Date().toISOString().split('T')[0], // Default to today's date
        status: "PENDING",
    };

    console.log('Order Details:', orderDetails);

    sendOrderToBackend(orderDetails);

    // Here you would send orderDetails to your backend
    // Example: await sendOrderToBackend(orderDetails);

    // Display the payment modal
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.style.display = 'block';
    } else {
        console.error('Payment modal element not found');
    }
});

const token = localStorage.getItem('auth_token')
console.log(token)

// Function to send the order to the backend (pseudo-code)
async function sendOrderToBackend(orderDetails) {
    try {
        const response = await fetch(`${config.API_URL}/orders/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                "ngrok-skip-browser-warning": "69420",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
            throw new Error('Failed to send order to backend');
        }

        const responseData = await response.json();
        console.log('Order confirmed:', responseData);
        

        // Call fetchBookings to refresh the bookings page
        fetchBookings();

        // Notify user of success, etc.
    } catch (error) {
        console.error('Error sending order:', error);
    }
}

// Add event listener for payment method change
document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const tillNumberInput = document.getElementById('till-number-input');
        if (tillNumberInput) {
            if (this.value === 'paybil' || this.value === 'till-number') {
                tillNumberInput.style.display = 'block';
            } else {
                tillNumberInput.style.display = 'none';
            }
        } else {
            console.error('Till number input element not found');
        }
    });
});

// Initialize fetching services when the page loads
document.addEventListener('DOMContentLoaded', fetchServices);

// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error(`Modal with ID ${modalId} not found.`);
    }
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error(`Modal with ID ${modalId} not found.`);
    }
}

// Event listener for the close button of the payment modal
document.getElementById('close-payment-modal').addEventListener('click', () => {
    closeModal('payment-modal');
});

// Event listener for the confirm payment button
document.getElementById('confirm-payment').addEventListener('click', () => {
    closeModal('payment-modal'); // Close payment modal
    openModal('phone-number-modal'); // Open phone number modal
});

// Event listener for the close button of the phone number modal
document.getElementById('close-phone-number-modal').addEventListener('click', () => {
    closeModal('phone-number-modal');
});

// Event listener for proceeding with the M-Pesa code
document.getElementById('proceed-mpesa').addEventListener('click', async () => {
    const mpesaCode = document.getElementById('mpesa-code').value.trim();

    if (mpesaCode) {
        // Show verification notification
        const notification = document.getElementById('notification');
        notification.textContent = 'Verifying M-Pesa code...';
        notification.style.display = 'block';

        // Simulate verification process (for demo purposes)
        setTimeout(async () => {
            // This is where you would typically check the response from the server
            notification.textContent = 'M-Pesa code is being verified.';
            setTimeout(async () => {
                notification.style.display = 'none';
                closeModal('phone-number-modal'); // Close the phone number modal

                // Set the M-Pesa code in orderDetails
                orderDetails.mpesa_code = mpesaCode;

                // Send order details to the backend
                await sendOrderToBackend(orderDetails);
            }, 3000); // Display message for 3 seconds
        }, 1000); // Simulate a delay for the verification process
    } else {
        alert('Please enter the M-Pesa code.');
    }
});

// Function to fetch bookings from the backend
async function fetchBookings() {
    const bookingsUrl = `${config.API_URL}/orders/`; // URL to fetch bookings

    try {
        const response = await fetch(bookingsUrl, {
            method: "GET",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
                'Authorization': `Token ${localStorage.getItem('auth_token')}`, // Ensure you have the correct token
                'Content-Type': 'application/json',
            }),
        });

        // Log the response for debugging
        console.log('Response:', response);

        if (!response.ok) {
            // Log the response status and text for more details
            const responseText = await response.text();
            console.error('Response status:', response.status);
            console.error('Response text:', responseText);
            throw new Error('Network response was not ok');
        }
        
        const bookingsData = await response.json();
        renderBookings(bookingsData);
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
    }
}

// Function to render bookings in the bookings section
function renderBookings(bookings) {
    const bookingsList = document.getElementById('bookings-list');
    bookingsList.innerHTML = ''; // Clear existing bookings

    bookings.forEach(booking => {
        const bookingCard = document.createElement('div');
        bookingCard.classList.add('booking-card');
        bookingCard.innerHTML = `
            <h3>${booking.items[0].service.name}</h3>
            <p>Date: ${new Date(booking.date).toLocaleDateString()}</p>
            <p>Status: ${booking.status}</p>
        `;
        bookingsList.appendChild(bookingCard);
    });
}

// Call fetchBookings on page load
document.addEventListener('DOMContentLoaded', fetchBookings);


/*const eventTypeSelect = document.getElementById('event-type');

    // Fetch event types from the backend
    async function fetchEventTypes() {
        try {
            const response = await fetch(`${config.API_URL}/event-types/`, {
                method: 'GET',
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const eventTypes = await response.json();
            populateEventTypes(eventTypes);
        } catch (error) {
            console.error('Failed to fetch event types:', error);
        }
    }

    // Populate the event type select element with options
    function populateEventTypes(eventTypes) {
        eventTypes.forEach(eventType => {
            const option = document.createElement('option');
            option.value = eventType;
            option.textContent = eventType;
            eventTypeSelect.appendChild(option);
        });
    }

    // Call the function to fetch and populate event types
    fetchEventTypes();*/

