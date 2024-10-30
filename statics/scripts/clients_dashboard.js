document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select'); // Ensure correct ID
    const categorySelect1 = document.getElementById('category-select2');
    const serviceList = document.getElementById('service-list');

    async function init() {
        await fetchCategories();
        await fetchServices(); // Load all services by default
    }

    
    // Function to fetch categories from the backend
    async function fetchCategories() {
        try {
            const response = await fetch(`${config.API_URL}/categories/`, { // Replace with your backend URL
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError('Expected JSON response');
            }

            const categories = await response.json();
            renderCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            categorySelect.innerHTML = '<option value="all">All Services</option>'; // Default option if fetching fails
            categorySelect1.innerHTML = '<option value="all">All Services</option>'; // Default option if fetching fails
        }
    }

    // Function to render categories in the select dropdown
    function renderCategories(categories) {
        categorySelect.innerHTML = '<option value="all">All Services</option>'; // Default option
        categorySelect1.innerHTML = '<option value="all">All Services</option>'; // Default option
        categories.forEach(category => {
            // Create option element for the first select
            const optionElement1 = document.createElement('option');
            optionElement1.value = category.id; // Assuming 'id' is the unique identifier for each category
            optionElement1.textContent = category.name; // Assuming 'name' is the name of the category
            categorySelect.appendChild(optionElement1);

            // Create option element for the second select
            const optionElement2 = document.createElement('option');
            optionElement2.value = category.id; // Assuming 'id' is the unique identifier for each category
            optionElement2.textContent = category.name; // Assuming 'name' is the name of the category
            categorySelect1.appendChild(optionElement2);
        });
    }

    // Call the fetchCategories function to populate the dropdowns
    fetchCategories();
    

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
                <p>Price: Ksh ${service.price}</p>
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

    categorySelect1.addEventListener('change', function() {
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


