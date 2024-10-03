document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonials-carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let index = 0;

    function showItem(index) {
        const offset = index * -100; // Adjusted to show one item at a time
        carousel.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : items.length - 1;
        showItem(index);
    });

    nextBtn.addEventListener('click', () => {
        index = (index < items.length - 1) ? index + 1 : 0;
        showItem(index);
    });

    // Auto play
    setInterval(() => {
        nextBtn.click();
    }, 5000); // Change slide every 5 seconds
});

