document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select'); // Ensure correct ID
    const serviceList = document.getElementById('service-list');

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


    // Fetch categories and services when the page loads
    fetchCategories().then(() => {
        fetchServices().then((services) => {
            // Add category filter listener after services are fetched
            categorySelect.addEventListener('change', () => filterServices(services));
        });
    });
});