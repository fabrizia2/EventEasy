$(document).ready(function() {
    // Hide all sections except for the first one (default)
    $('.main').hide();
    $('#services').show(); // Show services section by default

    // Navigation item click functionality
    $('.nav-item').on('click', function(e) {
        e.preventDefault(); // Prevent the default anchor click behavior
        const targetSection = $(this).attr('href'); // Get the href attribute which corresponds to the section ID

        // Hide all sections and show the target section
        $('.main').hide(); 
        $(targetSection).show(); 
    });

    // Functionality for removing items from cart
    $('.remove-item').on('click', function() {
        $(this).parent('.cart-item').remove();
        updateCartTotal(); // Update total after removing item
    });

    // Functionality for showing the service details modal
    $('.service-card').on('click', function() {
        const title = $(this).find('h3').text();
        const description = $(this).find('p:first').text();
        const price = $(this).find('p:last').text().replace('Price: $', '');
        
        $('#service-title').text(title);
        $('#service-description').text(description);
        $('#service-price span').text(price);
        
        $('#service-details-modal').fadeIn(); // Show modal
    });

    // Close modal functionality
    $('.close').on('click', function() {
        $('#service-details-modal').fadeOut(); // Hide modal
    });

    // Functionality for booking service
    /*$('#book-service-button').on('click', function() {
        alert("Service booked!"); // Booking action
        $('#service-details-modal').fadeOut(); // Hide modal after booking
    });*/

    // Functionality for adding to cart
    $('.add-to-cart-button').on('click', function() {
        const title = $('#service-title').text();
        const price = $('#service-price span').text();
        $('#cart-items').append(`
            <div class="cart-item">
                <h4>${title}</h4>
                <span>$${price}</span>
                <span class="remove-item">Remove</span>
            </div>
        `);
        updateCartTotal(); // Update cart total after adding item
        $('#service-details-modal').fadeOut(); // Hide modal after adding to cart
    });

    // Function to update cart total
    function updateCartTotal() {
        let total = 0;
        $('#cart-items .cart-item').each(function() {
            const price = parseFloat($(this).find('span').eq(1).text().replace('$', ''));
            total += price;
        });
        $('#cart-total span').text(total);
    }

    // Prevent default form submission
    $('#profile-form').on('submit', function(e) {
        e.preventDefault();
        alert('Profile updated successfully!'); // Handle form submission
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const services = document.querySelectorAll('.service');

    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        services.forEach(service => {
            if (selectedCategory === 'all' || service.getAttribute('data-category') === selectedCategory) {
                service.style.display = 'block';
            } else {
                service.style.display = 'none';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const serviceModal = document.getElementById('service-details-modal');
    const bookingModal = document.getElementById('booking-modal');
    const bookServiceButton = document.getElementById('book-service-button');
    const closeButtons = document.querySelectorAll('.close');

    // Open booking modal when "Book Service" button is clicked
    bookServiceButton.addEventListener('click', function() {
        serviceModal.style.display = 'none'; // Hide service details modal
        bookingModal.style.display = 'block'; // Show booking modal
    });

    // Close modals when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            serviceModal.style.display = 'none';
            bookingModal.style.display = 'none';
        });
    });

    // Close modals when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target == serviceModal) {
            serviceModal.style.display = 'none';
        }
        if (event.target == bookingModal) {
            bookingModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    updateCartTotal();

    // Add event listener to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.remove();
            updateCartTotal();
        });
    });
});

function updateCartTotal() {
    const cartItems = document.querySelectorAll('#cart-items .cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('span').innerText.replace('$', '');
        const price = parseFloat(priceText);
        if (!isNaN(price)) {
            total += price;
        }
    });

    document.querySelector('#cart-total span').innerText = total.toFixed(2);
}


// JavaScript to handle the gig application modal
$(document).ready(function () {
    // Get the modal
    var modal = document.getElementById("gig-application-modal");

    // Get the button that opens the modal
    var applyButtons = document.querySelectorAll(".apply-button");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    applyButtons.forEach(button => {
        button.onclick = function () {
            var gigCard = this.closest('.gig-card');
            var gigTitle = gigCard.querySelector('h3').innerText;
            var gigDescription = gigCard.querySelector('p').innerText;
            
            document.getElementById('gig-title').innerText = gigTitle;
            document.getElementById('gig-description').innerText = gigDescription;
            
            modal.style.display = "block";
        }
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle the form submission
    $("#gig-application-form").submit(function (event) {
        event.preventDefault();
        // Handle the form submission logic here
        alert("Your application has been submitted!");
        modal.style.display = "none";
    });
});

$(document).ready(function () {
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("nav-links");

    hamburger.onclick = function () {
        navLinks.classList.toggle("active"); // Toggle active class on nav-links
    };
});
