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
