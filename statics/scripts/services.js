document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select'); // Ensure correct ID
    const serviceList = document.getElementById('services-container'); // Ensure correct ID

    if (!categorySelect) {
        console.error('Category select element not found');
    }
    if (!serviceList) {
        console.error('Service list container not found');
    }

    // Function to fetch categories from the backend
    async function fetchCategories() {
        try {
            const response = await fetch(`${config.API_URL}/categories/`, {
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
        }
    }

    // Function to render categories in the select dropdown
    function renderCategories(categories) {
        categorySelect.innerHTML = '<option value="all">All Services</option>'; // Default option
        categories.forEach(category => {
            const optionElement = document.createElement('option');
            optionElement.value = category.id; // Assuming 'id' is the unique identifier for each category
            optionElement.textContent = category.name; // Assuming 'name' is the name of the category
            categorySelect.appendChild(optionElement);
        });
    }

    // Function to filter services based on the selected category
    function filterServices() {
        const selectedCategory = categorySelect.value;
        const services = document.querySelectorAll('.service');
        services.forEach(service => {
            if (selectedCategory === 'all' || service.getAttribute('data-category') === selectedCategory) {
                service.style.display = 'block';
            } else {
                service.style.display = 'none';
            }
        });
    }

    // Function to fetch services from the backend
    async function fetchServices() {
        try {
            const response = await fetch(`${config.API_URL}/services/`, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            });

            // Log the headers for debugging
            console.log('Response Headers:', response.headers);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.log('Response Text:', text);
                throw new TypeError('Expected JSON response');
            }

            const services = await response.json();
            renderServices(services);
        } catch (error) {
            console.error('Error fetching services:', error);
            serviceList.innerHTML = '<p class="error">Failed to load services. Please try again later.</p>';
        }
    }

    // Function to render services on the page
    function renderServices(services) {
        serviceList.innerHTML = ''; // Clear the existing services
        if (services.length === 0) {
            serviceList.innerHTML = '<p>No services available.</p>';
            return;
        }
        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service');
            serviceElement.setAttribute('data-category', service.categoryID); // Ensure categoryID is consistent
            serviceElement.innerHTML = `
                <a href="service1.html?id=${service.id}">
                    <img src="${service.image}" alt="${service.title}">
                    <h3>${service.name}</h3>
                </a>
                <p>${service.description}</p>
            `;
            serviceList.appendChild(serviceElement);
        });

        // Apply the filter after rendering the services
        filterServices();
    }

    // Fetch categories and services when the page loads
    fetchCategories();
    fetchServices();

    // Add event listener to category select after services are fetched
    categorySelect.addEventListener('change', filterServices);
});
