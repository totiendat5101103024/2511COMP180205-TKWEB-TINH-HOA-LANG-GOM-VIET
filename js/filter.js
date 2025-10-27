document.addEventListener('DOMContentLoaded', () => {
    
    // PRODUCT FILTERING
    const filterContainer = document.getElementById('product-filter-buttons');
    if (filterContainer) { 
        console.log("Setting up product filters.");
        const filterButtons = filterContainer.querySelectorAll('button');
        const productCards = document.querySelectorAll('.product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || (cardCategory && cardCategory.includes(filterValue))) {
                        card.style.display = 'block'; 
                        card.classList.remove('hidden'); 
                    } else {
                        card.style.display = 'none'; 
                        card.classList.add('hidden'); 
                    }
                });
            });
        });
    }
}); // Kết thúc DOMContentLoaded