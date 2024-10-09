document.addEventListener('DOMContentLoaded', async function() {
    const serviceImage = document.querySelector('.service-info img');
    const serviceTitle = document.querySelector('.service-text h2');
    const serviceDescription = document.querySelector('.service-text p');
    const servicePrice = document.querySelector('.service-text strong');
    const samplePhotos = document.querySelectorAll('#service-samples img');

    // Get the service ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    if (!serviceId) {
        console.error('Service ID not found in the URL');
        return;
    }

    try {
        // Fetch service details from the backend
        const response = await fetch(`${config.API_URL}/services/${serviceId}/`, {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const service = await response.json();

        // Update the HTML with the fetched service details
        serviceImage.src = service.image;
        serviceImage.alt = service.title;
        serviceTitle.textContent = service.title;
        serviceDescription.textContent = service.description;
        servicePrice.textContent = `Price: Ksh ${service.price}`;

        // Update the sample photos
        samplePhotos.forEach((img, index) => {
            if (service.samples && service.samples[index]) {
                img.src = service.samples[index];
                img.alt = `Sample Photo ${index + 1}`;
                img.classList.add('active');
            } else {
                img.style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Error fetching service details:', error);
        document.querySelector('main').innerHTML = '<p class="error">Failed to load service details. Please try again later.</p>';
    }

    // Slider functionality
    const slider = document.querySelector('.slider');
    const images = slider.querySelectorAll('img');
    const prevButton = slider.querySelector('.prev');
    const nextButton = slider.querySelector('.next');
    let currentIndex = 0;
    let autoPlayInterval;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        nextImage();
        resetAutoplay();
    });

    function startAutoplay() {
        autoPlayInterval = setInterval(nextImage, 3000); // Change slide every 3 seconds
    }

    function stopAutoplay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Start autoplay
    startAutoplay();

    // Stop autoplay on mouse enter, resume on mouse leave
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    showImage(currentIndex);
});
