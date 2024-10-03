$(document).ready(function() {
    let cart = [];

    function renderCart() {
        let cartItems = $('#cart-items');
        cartItems.empty();
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            cartItems.append(`
                <div class="cart-item" data-id="${item.id}">
                    <h4>${item.title}</h4>
                    <span>$${item.price}</span>
                    <span class="remove-item">Remove</span>
                </div>
            `);
        });

        $('#cart-total span').text(total.toFixed(2));
    }

    function makeRequest(url, method, data) {
        return $.ajax({
            url: url,
            method: method,
            data: JSON.stringify(data),
            contentType: 'application/json',
        });
    }

    // Consolidated event listener setup
    $('.add-to-cart-button').click(function() {
        let card = $(this).closest('.job_card');
        let id = card.data('id');
        let title = card.find('.text h2').text();
        let price = parseFloat(card.find('.job_salary h4').text().split('-')[0].replace('$', '').trim());

        if (!cart.some(item => item.id === id)) {
            cart.push({ id, title, price });
            renderCart();
            $('#cart-modal').show();
        }
    });

    $('#cart-items').on('click', '.remove-item', function() {
        let id = $(this).closest('.cart-item').data('id');
        cart = cart.filter(item => item.id !== id);
        renderCart();
    });

    $('#checkout-button').click(function() {
        let orderDetails = {
            items: cart,
            total: $('#cart-total span').text()
        };

        makeRequest('https://example.com/api/checkout', 'POST', orderDetails)
            .done(function(response) {
                alert('Checkout successful! Order ID: ' + response.orderId);
                cart = [];
                renderCart();
                $('#cart-modal').hide();
            })
            .fail(function() {
                alert('Checkout failed. Please try again.');
            });
    });

    // Event listeners for details and booking buttons, etc.
    // ...

    $('.close').click(function() {
        $(this).closest('.modal').hide();
    });
});


// Event listener for View Details button
$('.details-button').click(function() {
let card = $(this).closest('.job_card');
let id = card.data('id');
let title = card.find('.text h2').text();
let description = `${title} service details will be fetched from the server.`;
let price = parseFloat(card.find('.job_salary h4').text().split('-')[0].replace('$', '').trim());

$('#service-title').text(title);
$('#service-description').text(description);
$('#service-price span').text(price.toFixed(2));

$('#service-details-modal').show();
});

// Event listener for Book Service button
$('#book-service-button').click(function() {
// Example data for booking
let bookingDetails = {
    serviceId: $('#service-details-modal').data('id'),
    eventType: $('#event-type').val(),
    eventLocation: $('#event-location').val(),
    eventTime: $('#event-time').val(),
    photographers: $('#num-photographers').val()
};

// Send booking details to backend (example URL)
$.ajax({
    url: 'https://example.com/api/book',
    method: 'POST',
    data: JSON.stringify(bookingDetails),
    contentType: 'application/json',
    success: function(response) {
        alert('Service booked successfully! Booking ID: ' + response.bookingId);
        $('#service-details-modal').hide();
    },
    error: function() {
        alert('Booking failed. Please try again.');
    }
});
});

// Event listeners for closing modals
$('.close').click(function() {
$(this).closest('.modal').hide();
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const contentSections = document.querySelectorAll(".main");

    // Hide all content sections initially
    contentSections.forEach(section => {
        section.style.display = "none"; // Hide all sections
    });

    // Show the first section by default
    if (contentSections.length > 0) {
        contentSections[0].style.display = "block"; // Show the first section
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // Hide all content sections
            contentSections.forEach(section => {
                section.style.display = "none"; // Hide section
            });

            // Show the target content section
            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = "block"; // Show the selected section
            }
        });
    });
});