// Dữ liệu chỉ chứa Sản phẩm để tìm kiếm (thêm trường 'image')
const productSearchData = [
    // --- SẢN PHẨM TỪ GIADUNG.HTML ---
    { id: "p1", name: "Bộ Bát Gốm Hoa Văn Sen", image: "https://images.unsplash.com/photo-1610733560133-722a8c66e4a2?q=80&w=1974&auto=format&fit=crop", url: "html/giadung.html" }, 
    { id: "p2", name: "Bộ Ấm Chén Men Lam Cổ", image: "https://images.unsplash.com/photo-1565194999252-9b2a75d18d48?q=80&w=1974&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p3", name: "Cốc Gốm Vuốt Tay Mộc", image: "https://images.unsplash.com/photo-1620499263901-d27376483b3e?q=80&w=1964&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p4", name: "Đĩa Trưng Bày Vẽ Cá Chép", image: "https://images.unsplash.com/photo-1598342435478-e6da377fb44f?q=80&w=1974&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p5", name: "Bộ Bát Men Ngọc Lục Bảo", image: "https://images.unsplash.com/photo-1605832525181-702353a404c0?q=80&w=1974&auto=format&fit=crop", url: "html/giadung.html" },
    { id: "p6", name: "Hũ Đựng Trà Men Rạn Cổ", image: "https://images.unsplash.com/photo-1618343890587-195c47953b27?q=80&w=1964&auto=format&fit=crop", url: "html/giadung.html" },

    // --- SẢN PHẨM TỪ TRANGTRI.HTML ---
    { id: "p7", name: "Chậu cây", image: "img/gốm trang trí/chaucay.jpg", url: "html/trangtri.html" }, 
    { id: "p8", name: "Bình gốm Mã Đáo", image: "img/gốm trang trí/gom-su1.jpg", url: "html/trangtri.html" },
    { id: "p9", name: "Lọ hoa men nâu", image: "img/gốm trang trí/lohoa.jpg", url: "html/trangtri.html" },
    { id: "p10", name: "Đèn gốm để bàn", image: "img/gốm trang trí/den.webp", url: "html/trangtri.html" },
    { id: "p11", name: "Tượng Di Lặc", image: "img/gốm trang trí/tuong.png", url: "html/trangtri.html" },
    { id: "p12", name: "Bình gốm thiên nga", image: "img/gốm trang trí/binhgomthiennga.jpg", url: "html/trangtri.html" },

    // --- SẢN PHẨM TỪ TRANGSUC.HTML ---
    { id: "p13", name: "Vòng Cổ Gốm Men Con Cua", image: "img/gốm trang sức/1Lg7BiJVR7eWn7nFNObR5w_thumb_196f.jpeg", url: "html/trangsuc.html" },
    { id: "p14", name: "Bông Tai Gốm", image: "img/gốm trang sức/bongtaigom.jpg", url: "html/trangsuc.html" },
    { id: "p15", name: "Cặp Nhẫn Gốm", image: "img/gốm trang sức/capnhangom.jpg", url: "html/trangsuc.html" },
    { id: "p16", name: "Mặt Dây Chuyền Gốm", image: "img/gốm trang sức/matdaychuyengom.jpg", url: "html/trangsuc.html" },
    { id: "p17", name: "Vòng Tay Gốm Sứ Nhiều Màu", image: "img/gốm trang sức/vongtaygomnhieumau.webp", url: "html/trangsuc.html" },
    { id: "p18", name: "Trâm Cài Tóc Gốm", image: "img/gốm trang sức/tramcaitoc.jpg", url: "html/trangsuc.html" },
    { id: "p19", name: "Lắc Tay Gốm", image: "img/gốm trang sức/lactaygom.webp", url: "html/trangsuc.html" },
    { id: "p20", name: "Dây Chuyền Gốm Hình Viên Kẹo", image: "img/gốm trang sức/daychuyengomvienkeo.jpg", url: "html/trangsuc.html" },
    { id: "p21", name: "Bông Tai Gốm Sứ Xanh", image: "img/gốm trang sức/bongtaigom (2).jpg", url: "html/trangsuc.html" },
    { id: "p22", name: "Nhẫn Gốm Men", image: "img/gốm trang sức/nhangommen.jpg", url: "html/trangsuc.html" },
    { id: "p23", name: "Lắc Tay Gốm Lục Lạc", image: "img/gốm trang sức/lactay.jpg", url: "html/trangsuc.html" },
    { id: "p24", name: "Vòng Cổ Gốm Men", image: "img/gốm trang sức/vongcogomen.jpg", url: "html/trangsuc.html" },

];

let searchIndex; // Biến lưu chỉ mục Lunr

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed."); // Kiểm tra xem DOMContentLoaded có chạy không

    // --- NAVBAR SCROLL EFFECT ---
    const mainNavbar = document.getElementById('main-navbar');
    // Chỉ thêm hiệu ứng scroll nếu navbar không có class 'bg-black' (không phải trang login/register)
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
             window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                parallaxBG.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
             });
        }
    }

    // --- BUILD LUNR.JS SEARCH INDEX (Chỉ tìm tên sản phẩm) ---
    try {
        if (typeof lunr !== 'undefined') {
            searchIndex = lunr(function () {
                this.ref('id');      // Trường tham chiếu duy nhất
                this.field('name'); // Chỉ tìm kiếm trong trường 'name'

                // Nạp dữ liệu sản phẩm vào chỉ mục
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

                                // --- Xử lý URL tương đối ---
                                let itemUrl = item.url;
                                const isInsideHtmlFolder = window.location.pathname.includes('/html/');
                                const isArtisanSubFolder = window.location.pathname.includes('/nghenhan/');
                                
                                if (!itemUrl.startsWith('http')) {
                                     if (isArtisanSubFolder) { // Đang ở html/nghenhan/
                                        if (itemUrl.startsWith('index.html#')) { itemUrl = `../../${itemUrl}`; } // Về index
                                        else if (itemUrl.startsWith('html/nghenhan/')) { itemUrl = item.url.substring(13); } // Tới sp_khac
                                        else if (itemUrl.startsWith('html/')) { itemUrl = `../${itemUrl.substring(5)}`; } // Về html/
                                        else { itemUrl = `../../${itemUrl}`; } // Về index (nếu link là #...)
                                    } else if (isInsideHtmlFolder) { // Đang ở html/
                                        if (itemUrl.startsWith('index.html#')) { itemUrl = `../${itemUrl}`; } // Về index
                                        else if (itemUrl.startsWith('html/nghenhan/')){ itemUrl = itemUrl.substring(5); } // Tới nghenhan/
                                        // Giữ nguyên nếu link là 'giadung.html', 'khampha.html'...
                                    }
                                    // Nếu ở index.html, mọi thứ đều đúng (html/..., index.html#...)
                                }
                                listItem.href = itemUrl; 
                                listItem.classList.add('list-group-item', 'list-group-item-action');

                                // --- Xử lý đường dẫn Ảnh tương đối ---
                                let imagePath = item.image;
                                if (!imagePath.startsWith('http')) { 
                                    if (isArtisanSubFolder) { imagePath = `../../${imagePath}`; } 
                                    else if (isInsideHtmlFolder) { imagePath = `../${imagePath}`; }
                                    // Nếu ở index.html, giữ nguyên (vd: img/...)
                                }

                                // Tạo nội dung HTML cho mỗi item (ảnh + tên)
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

        // Ẩn dropdown khi click ra ngoài
        document.addEventListener('click', (event) => {
            if (searchForm && !searchForm.contains(event.target)) {
                resultsList.classList.remove('show');
            }
        });

        // Xử lý khi nhấn Enter (Chuyển đến trang kết quả đầy đủ)
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