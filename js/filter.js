document.addEventListener('DOMContentLoaded', () => {
    // --- PRODUCT FILTERING ---
    const filterContainer = document.getElementById('product-filter-buttons');
    if (filterContainer) { // Chỉ chạy nếu có thanh filter trên trang
        console.log("Setting up product filters.");
        const filterButtons = filterContainer.querySelectorAll('button');
        const productCards = document.querySelectorAll('.product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                // Cập nhật trạng thái 'active' cho button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Lặp qua tất cả sản phẩm để ẩn/hiện
                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || (cardCategory && cardCategory.includes(filterValue))) {
                        card.style.display = 'block'; // Hiển thị card
                        card.classList.remove('hidden'); // Dùng cho hiệu ứng
                    } else {
                        card.style.display = 'none'; // Ẩn card
                        card.classList.add('hidden'); // Dùng cho hiệu ứng
                    }
                });
            });
        });
    }
});