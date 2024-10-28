document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('categorySelect');
    const serviceList = document.getElementById('service-list');

    async function init() {
        await fetchCategories();
        await fetchServices(); // Load all services by default
    }

    init();

    let categories = [];

    async function fetchCategories() {
        try {
            const response = await fetch(`${config.API_URL}/categorys/`, {
                method: "GET",
                headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            categories = await response.json();
            console.log('Categories fetched:', categories);
            populateCategorySelect(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    function populateCategorySelect(categories) {
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All Categories';
        categorySelect.appendChild(allOption);

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id.toString(); // Ensure this is a string for comparison
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }

    async function fetchServices(selectedCategoryId = 'all') {
        try {
            const response = await fetch(`${config.API_URL}/services/`, {
                method: "GET",
                headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const services = await response.json();
            console.log('All Services fetched:', services);

            // Convert categoryID to string for comparison, and filter services
            const filteredServices = selectedCategoryId === 'all'
                ? services
                : services.filter(service => 
                      service.category && service.category.toString() === selectedCategoryId
                  );

            // Log for debugging
            if (filteredServices.length === 0) {
                console.log(`No services found for category ${selectedCategoryId}`);
            } else {
                console.log(`Filtered Services for category ${selectedCategoryId}:`, filteredServices);
            }

            renderServices(filteredServices);
        } catch (error) {
            console.error('Error fetching services:', error);
            serviceList.innerHTML = '<p class="error">Failed to load services. Please try again later.</p>';
        }
    }

    function renderServices(services) {
        serviceList.innerHTML = '';
        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service');
            serviceElement.setAttribute('data-category', service.category || 'N/A');
            serviceElement.innerHTML = `
                <a href="#" class="service-link">
                    <img src="${service.image || 'placeholder.jpg'}" alt="${service.name}">
                    <h3>${service.name}</h3>
                </a>
                <p>${service.description}</p>
                <p>Price: $${service.price}</p>
            `;
            serviceList.appendChild(serviceElement);
        });

        document.querySelectorAll('.service-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceElement = this.closest('.service');
                showModal(serviceElement);
            });
        });
    }

    categorySelect.addEventListener('change', function() {
        const selectedCategoryId = this.value;
        console.log(`Category changed: ${selectedCategoryId}`);
        fetchServices(selectedCategoryId);
    });
});


// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-item');

    if (hamburger && navbar) { // Ensure elements exist
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
            if (navbar.classList.contains('active')) {
                hamburger.innerHTML = '✕'; // X symbol
            } else {
                hamburger.innerHTML = '☰'; // Hamburger symbol
            }
        });
    }

    if (navItems.length > 0) { // Ensure nav items exist
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navbar.classList.remove('active');
                hamburger.innerHTML = '☰'; // Hamburger symbol
            });
        });
    }
});



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

hamburger?.classList.toggle('open');

$(document).ready(function () {
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("nav-links");

    hamburger.onclick = function () {
        navLinks.classList.toggle("active"); // Toggle active class on nav-links
    };
});

// Function to fetch categories from the backend
async function fetchCategories() {
    const categoriesUrl = `${config.API_URL}/categories/`;
    try {
        const response = await fetch(categoriesUrl, {
            method: 'GET',
            headers: new Headers({
                'ngrok-skip-browser-warning': '69420',
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const categoriesData = await response.json();
        return categoriesData;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}

// Function to populate category selects
async function populateCategorySelects() {
    const categories = await fetchCategories();
    const categorySelects = document.querySelectorAll('.categorySelect');

    categorySelects.forEach(categorySelect => {
        // Clear existing options
        categorySelect.innerHTML = '';

        // Add new options fetched from the backend
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            categorySelect.appendChild(option);
        });

        // Add event listener to each category select
        categorySelect.addEventListener('change', (event) => {
            console.log('Category changed:', event.target.value);
            // Add your filter functionality here
        });
    });
}

// Function to populate category selects
async function populateCategorySelects() {
    const categories = await fetchCategories();
    const categorySelects = document.querySelectorAll('.categorySelect');

    categorySelects.forEach(categorySelect => {
        // Clear existing options
        categorySelect.innerHTML = '';

        // Add new options fetched from the backend
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            categorySelect.appendChild(option);
        });

        // Add event listener to each category select
        categorySelect.addEventListener('change', (event) => {
            console.log('Category changed:', event.target.value);
            filterServicesByCategory(event.target.value);
        });
    });
}

// Function to filter services based on selected category
function filterServicesByCategory(categoryId) {
    const servicesList = document.getElementById('services-list');
    const servicesItems = servicesList.querySelectorAll('.services-item');

    servicesItems.forEach(serviceItem => {
        if (categoryId === "" || serviceItem.dataset.categoryId === categoryId) {
            serviceItem.style.display = 'block';
        } else {
            serviceItem.style.display = 'none';
        }
    });
}

// Initialize fetching and populating categories when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateCategorySelects();
});

