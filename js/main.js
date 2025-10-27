const productSearchData = [
    // --- SẢN PHẨM TỪ GIADUNG.HTML ---
    { id: "p1", name: "Bộ Bát Đĩa Men Xanh", image: "img/gốm gia dụng/Bộ Bát Đĩa Men Xanh.jpg", url: "../html/giadung.html" },
    { id: "p2", name: "Bộ Ấm Trà Gốm Cao Cấp", image: "img/gốm gia dụng/Bộ Ấm Trà Gốm Cao Cấp.jpg", url: "../html/giadung.html" },
    { id: "p3", name: "Cốc Sứ Tráng Men", image: "img/gốm gia dụng/Cốc Sứ Tráng Men.jpg", url: "../html/giadung.html" },
    { id: "p4", name: "Lọ Hoa Men Hỏa Biến Cao Cấp", image: "img/gốm gia dụng/Lọ Hoa Men Hỏa Biến Cao Cấp.jpg", url: "../html/giadung.html" },
    { id: "p5", name: "Chậu Trồng Cây Men Xanh", image: "img/gốm gia dụng/Chậu Trồng Cây Men Xanh.jpg", url: "../html/giadung.html" },
    { id: "p6", name: "Bình Đựng Gia Vị Gốm Mộc", image: "img/gốm gia dụng/Bình Đựng Gia Vị Gốm Mộc.jpg", url: "../html/giadung.html" },

    // --- SẢN PHẨM TỪ TRANGTRI.HTML ---
    { id: "p7", name: "Chậu cây", image: "img/gốm trang trí/chaucay.jpg", url: "../html/trangtri.html" }, 
    { id: "p8", name: "Bình gốm Mã Đáo", image: "img/gốm trang trí/gom-su1.jpg", url: "../html/trangtri.html" },
    { id: "p9", name: "Lọ hoa men nâu", image: "img/gốm trang trí/lohoa.jpg", url: "../html/trangtri.html" },
    { id: "p10", name: "Đèn gốm để bàn", image: "img/gốm trang trí/den.webp", url: "../html/trangtri.html" },
    { id: "p11", name: "Tượng Di Lặc", image: "img/gốm trang trí/tuong.png", url: "../html/trangtri.html" },
    { id: "p12", name: "Bình gốm thiên nga", image: "img/gốm trang trí/binhgomthiennga.jpg", url: "../html/trangtri.html" },

    // --- SẢN PHẨM TỪ TRANGSUC.HTML ---
    { id: "p13", name: "Vòng Cổ Gốm Men Con Cua", image: "img/gốm trang sức/1Lg7BiJVR7eWn7nFNObR5w_thumb_196f.jpeg", url: "../html/trangsuc.html" },
    { id: "p14", name: "Bông Tai Gốm", image: "img/gốm trang sức/bongtaigom.jpg", url: "../html/trangsuc.html" },
    { id: "p15", name: "Cặp Nhẫn Gốm", image: "img/gốm trang sức/capnhangom.jpg", url: "../html/trangsuc.html" },
    { id: "p16", name: "Mặt Dây Chuyền Gốm", image: "img/gốm trang sức/matdaychuyengom.jpg", url: "../html/trangsuc.html" },
    { id: "p17", name: "Vòng Tay Gốm Sứ Nhiều Màu", image: "img/gốm trang sức/vongtaygomnhieumau.webp", url: "../html/trangsuc.html" },
    { id: "p18", name: "Trâm Cài Tóc Gốm", image: "img/gốm trang sức/tramcaitoc.jpg", url: "../html/trangsuc.html" },
    { id: "p19", name: "Lắc Tay Gốm", image: "img/gốm trang sức/lactaygom.webp", url: "../html/trangsuc.html" },
    { id: "p20", name: "Dây Chuyền Gốm Hình Viên Kẹo", image: "img/gốm trang sức/daychuyengomvienkeo.jpg", url: "../html/trangsuc.html" },
    { id: "p21", name: "Bông Tai Gốm Sứ Xanh", image: "img/gốm trang sức/bongtaigom (2).jpg", url: "../html/trangsuc.html" },
    { id: "p22", name: "Nhẫn Gốm Men", image: "img/gốm trang sức/nhangommen.jpg", url: "../html/trangsuc.html" },
    { id: "p23", name: "Lắc Tay Gốm Lục Lạc", image: "img/gốm trang sức/lactay.jpg", url: "../html/trangsuc.html" },
    { id: "p24", name: "Vòng Cổ Gốm Men", image: "img/gốm trang sức/vongcogomen.jpg", url: "../html/trangsuc.html" },
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

    // --- CAROUSEL INFINITE LOOP ---
    const track = document.querySelector(".sc-track");
    if (track) { 
        console.log("Setting up Infinite Carousel.");
        const items = track.querySelectorAll(".sc-item");
        
        if (items.length > 1) { // Chỉ nhân bản nếu có item
            // Nhân bản tất cả item để tạo hiệu ứng lặp vô tận
            items.forEach((item) => {
                const clone = item.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true'); // Thêm để hỗ trợ trình đọc màn hình
                track.appendChild(clone);
            });
            console.log("Carousel items duplicated for infinite loop.");
        }
    } else {
        console.log("Carousel track (.sc-track) not found.");
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
                                        else { itemUrl = `../${itemUrl}`; } // Sửa lỗi: Về html/ (ví dụ giadung.html)
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
                                if (!imagePath.startsWith('http') && !imagePath.startsWith('../')) { // Nếu không phải link tuyệt đối và không bắt đầu bằng ../
                                    if (isArtisanSubFolder) { imagePath = `../../${imagePath}`; } // Đang ở html/nghenhan/ -> ../../img/...
                                    else if (isInsideHtmlFolder) { imagePath = `../${imagePath}`; } // Đang ở html/ -> ../img/...
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