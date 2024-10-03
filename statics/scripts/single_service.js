document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const bookNowButton = document.querySelector('.btn.book-now');
    const addToCartButton = document.querySelector('.btn.add-to-cart');

    // Book Now button event
    bookNowButton.addEventListener('click', function() {
        window.location.href = 'login_signup.html'; // Redirect to login/signup page
    });

    // Add to Cart button event
    addToCartButton.addEventListener('click', function() {
        window.location.href = 'login_signup.html'; // Redirect to login/signup page
    });

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