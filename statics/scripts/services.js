document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const serviceList = document.getElementById('service-list');

    // Function to fetch services from the backend
    async function fetchServices() {
        try {
            const response = await fetch('https://ae3f-102-212-236-194.ngrok-free.app/services/', { // Replace with your backend URL
                method: "get",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "69420",
                }),
              });

            // Log the headers for debugging
            console.log('Response Headers:', response.headers);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // Log the raw response text for debugging
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
        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service');
            serviceElement.setAttribute('data-category', service.category);
            serviceElement.innerHTML = `
                <a href="service1.html?id=${service.id}">
                    <img src="${service.image}" alt="${service.title}">
                    <h3>${service.name}</h3>
                </a>
                <p>${service.description}</p>
            `;
            serviceList.appendChild(serviceElement);
        });
    }

    // Filter services based on the selected category
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        const services = document.querySelectorAll('.service');
        services.forEach(service => {
            if (selectedCategory === 'all' || service.getAttribute('data-category') === selectedCategory) {
                service.style.display = 'block';
            } else {
                service.style.display = 'none';
            }
        });
    });

    // Fetch services when the page loads
    fetchServices();
});

