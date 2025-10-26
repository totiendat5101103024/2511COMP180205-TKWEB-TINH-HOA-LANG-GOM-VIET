// Dữ liệu chỉ chứa Sản phẩm để tìm kiếm (thêm trường 'image')
const productSearchData = [
    // --- SẢN PHẨM --- (Bây giờ có thêm 'image' field)
    { id: "p1", name: "Bộ Bát Gốm Hoa Văn Sen", image: "https://images.unsplash.com/photo-1610733560133-722a8c66e4a2?q=80&w=1974&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p2", name: "Bộ Ấm Chén Men Lam Cổ", image: "https://images.unsplash.com/photo-1565194999252-9b2a75d18d48?q=80&w=1974&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p3", name: "Cốc Gốm Vuốt Tay Mộc", image: "https://images.unsplash.com/photo-1620499263901-d27376483b3e?q=80&w=1964&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p4", name: "Đĩa Trưng Bày Vẽ Cá Chép", image: "https://images.unsplash.com/photo-1598342435478-e6da377fb44f?q=80&w=1974&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p5", name: "Bình gốm men hỏa biến", image: "https://images.unsplash.com/photo-1605911998335-da2ac827a419?q=80&w=1964&auto=format&fit=crop", url: "index.html#featured-products" },
    { id: "p6", name: "Linh vật Thần Kim Quy", image: "img/nghenhan/nd-trando/kim quy1.gif", url: "html/nghenhan/sp_tranvando.html" },
    { id: "p7", name: "Tượng Rồng Triều Nguyễn", image: "img/nghenhan/nd-trando/trando-tuongrong.jpg", url: "html/nghenhan/sp_tranvando.html" },
    { id: "p8", name: "Giày Gốm Bát Tràng", image: "img/nghenhan/nd-vuducthang/vdt-giày gốm.jpg", url: "html/nghenhan/sp_vuducthang.html" },
    { id: "p9", name: "Bình Gốm Đắp Nổi Vinh Quy Bái Tổ", image: "img/nghenhan/nd-vuducthang/vdt-bình gốm.jpg", url: "html/nghenhan/sp_vuducthang.html" },
    { id: "p10", name: "Ấm Tử Sa", image: "img/nghenhan/nd-vuongmanhtuan/vmt-ấm tử sa.jpg", url: "html/nghenhan/sp_vuongmanhtuan.html" },
    { id: "p11", name: "Chiếc Vò Rồng", image: "img/nghenhan/nd-vuongmanhtuan/vmt-chiếc vò rồng.jpg", url: "html/nghenhan/sp_vuongmanhtuan.html" },
    // Thêm các sản phẩm khác, đảm bảo có image và url chính xác
];

let searchIndex; // Biến lưu chỉ mục Lunr

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed."); // Kiểm tra xem DOMContentLoaded có chạy không

    // --- NAVBAR SCROLL EFFECT ---
    const mainNavbar = document.getElementById('main-navbar');
    if (mainNavbar && !mainNavbar.classList.contains('bg-black')) {
        console.log("Setting up Navbar scroll effect.");
        const checkNavScroll = () => {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('navbar-scrolled');
            } else {
                mainNavbar.classList.remove('navbar-scrolled');
            }
        };
        checkNavScroll(); // Run on load
        window.addEventListener('scroll', checkNavScroll); // Run on scroll
    }

    // --- HERO PARALLAX EFFECT (Chỉ chạy ở trang chủ) ---
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        console.log("Setting up Hero parallax effect.");
        const parallaxBG = heroSection.querySelector('.hero-background');
        if (parallaxBG) {
            window.addEventListener('scroll', function () {
                const scrollPosition = window.pageYOffset;
                parallaxBG.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
            });
        }
    }

    const track = document.querySelector(".sc-track");
    if (!track) return;

    const item = track.querySelector(".sc-item");
    if (!item) return;

    const itemWidth = item.offsetWidth + 16; // 16px = gap 1rem
    let autoScroll;

    function scrollNext() {
        if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 5) {
            // nếu đến cuối → quay lại đầu
            track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            track.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
    }

    // auto-scroll mỗi 3 giây
    function startAutoScroll() {
        autoScroll = setInterval(scrollNext, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // Dừng khi hover
    track.addEventListener("mouseenter", stopAutoScroll);
    track.addEventListener("mouseleave", startAutoScroll);

    startAutoScroll();

    // --- BUILD LUNR.JS SEARCH INDEX (Chỉ tìm tên sản phẩm) ---
    try {
        if (typeof lunr !== 'undefined') {
            searchIndex = lunr(function () {
                this.ref('id');
                this.field('name');

                productSearchData.forEach(function (doc) {
                    this.add(doc);
                }, this);
            });
            console.log("Product search index built successfully!");
        } else {
            console.error("Lunr.js is not loaded.");
        }
    } catch (e) {
        console.error("Error building Lunr index:", e);
    }

    // --- LIVE SEARCH SUGGESTIONS (Hiển thị tên + ảnh sản phẩm) ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('search-results-list');

    if (searchInput && resultsList && typeof searchIndex !== 'undefined') {
        console.log("Setting up Live Search.");
        searchInput.addEventListener('input', () => {
            // ... (code live search giữ nguyên như trước) ...
            const query = searchInput.value.trim().toLowerCase();
            resultsList.innerHTML = '';

            if (query.length > 1) {
                try {
                    const results = searchIndex.search(query + '*');

                    if (results.length > 0) {
                        resultsList.classList.add('show');

                        results.slice(0, 7).forEach(result => {
                            const item = productSearchData.find(doc => doc.id === result.ref);
                            if (item) {
                                const listItem = document.createElement('a');
                                let itemUrl = item.url;
                                const isInsideHtmlFolder = window.location.pathname.includes('/html/');
                                const isArtisanSubFolder = window.location.pathname.includes('/nghenhan/');

                                if (!itemUrl.startsWith('http')) {
                                    if (isArtisanSubFolder) {
                                        if (itemUrl.startsWith('index.html#')) { itemUrl = `../../${itemUrl}`; }
                                        else if (itemUrl.startsWith('html/')) { itemUrl = `../${itemUrl.substring(5)}`; }
                                        else if (!itemUrl.startsWith('nghenhan/')) { itemUrl = `../${itemUrl}`; }
                                    } else if (isInsideHtmlFolder) {
                                        if (itemUrl.startsWith('index.html#')) { itemUrl = `../${itemUrl}`; }
                                        else if (itemUrl.startsWith('html/nghenhan/')) { itemUrl = itemUrl.substring(5); }
                                    }
                                }
                                listItem.href = itemUrl;
                                listItem.classList.add('list-group-item', 'list-group-item-action');

                                let imagePath = item.image;
                                if (!imagePath.startsWith('http')) {
                                    if (isArtisanSubFolder) { imagePath = `../../${imagePath}`; }
                                    else if (isInsideHtmlFolder) { imagePath = `../${imagePath}`; }
                                }

                                listItem.innerHTML = `
                                    <img src="${imagePath}" alt="${item.name}" class="search-item-image" onerror="this.style.display='none'">
                                    <span class="search-item-name">${item.name}</span>
                                `;
                                resultsList.appendChild(listItem);
                            }
                        });
                    } else {
                        resultsList.classList.remove('show');
                    }
                } catch (e) {
                    console.error("Lỗi khi tìm kiếm: ", e);
                    resultsList.classList.remove('show');
                }
            } else {
                resultsList.classList.remove('show');
            }
        });

        document.addEventListener('click', (event) => {
            if (searchForm && !searchForm.contains(event.target)) {
                resultsList.classList.remove('show');
            }
        });

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                let resultsPageUrl = 'html/search-results.html';
                if (window.location.pathname.includes('/html/')) {
                    resultsPageUrl = 'search-results.html';
                }
                window.location.href = `${resultsPageUrl}?query=${encodeURIComponent(query)}`;
            }
        });

    } else if (searchInput && resultsList && typeof searchIndex === 'undefined') {
        console.warn("Search index not ready yet or Lunr.js not loaded. Search disabled.");
    }
});