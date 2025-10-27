document.addEventListener('DOMContentLoaded', () => {
    
    // --- PRODUCT FILTERING (Code cũ của bạn, giữ nguyên) ---
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
    } // Kết thúc Product Filtering

    
    // --- **PHẦN MỚI:** LOGIC CHO QUICK VIEW MODAL ---
    
    // 1. Khởi tạo Modal của Bootstrap một lần
    const productModalElement = document.getElementById('productQuickViewModal');
    if (productModalElement) {
        const productModal = new bootstrap.Modal(productModalElement, {});

        // 2. Lấy các phần tử placeholder trong Modal
        const modalImage = document.getElementById('modalProductImage');
        const modalTitle = document.getElementById('modalProductTitle');
        const modalPrice = document.getElementById('modalProductPrice');
        
        // 3. Lấy TẤT CẢ các nút "Thêm vào giỏ" trong lưới sản phẩm
        // (Chúng ta dùng class chung .product-grid .btn-primary)
        const quickViewButtons = document.querySelectorAll('.product-grid .product-card .btn-primary');

        // 4. Gán sự kiện click cho TẤT CẢ các nút
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                
                // Ngăn hành vi mặc định (nếu nút là thẻ <a>)
                event.preventDefault(); 
                
                // Tìm card cha gần nhất chứa thông tin
                const card = event.target.closest('.product-card');
                if (!card) return;

                // Lấy thông tin trực tiếp từ card (đơn giản, không cần data-attribute)
                const name = card.querySelector('h5').textContent;
                const price = card.querySelector('p').textContent;
                const image = card.querySelector('img').src;

                // 5. "Đổ" thông tin vào Modal
                modalTitle.textContent = name;
                modalPrice.textContent = price;
                modalImage.src = image;

                // 6. Hiển thị Modal
                productModal.show();
            });
        });
    } // Kết thúc Quick View Modal

}); // Kết thúc DOMContentLoaded