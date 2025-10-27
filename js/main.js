const productSearchData = [
    //SẢN PHẨM TỪ GIADUNG.HTML 
    { id: "p1", name: "Bộ Bát Đĩa Men Xanh", image: "/img/gốm gia dụng/Bộ Bát Đĩa Men Xanh.jpg", url: "/html/giadung.html" },
    { id: "p2", name: "Bộ Ấm Trà Gốm Cao Cấp", image: "/img/gốm gia dụng/Bộ Ấm Trà Gốm Cao Cấp.jpg", url: "/html/giadung.html" },
    { id: "p3", name: "Cốc Sứ Tráng Men", image: "/img/gốm gia dụng/Cốc Sứ Tráng Men.jpg", url: "/html/giadung.html" },
    { id: "p4", name: "Lọ Hoa Men Hỏa Biến Cao Cấp", image: "/img/gốm gia dụng/Lọ Hoa Men Hỏa Biến Cao Cấp.jpg", url: "/html/giadung.html" },
    { id: "p5", name: "Chậu Trồng Cây Men Xanh", image: "/img/gốm gia dụng/Chậu Trồng Cây Men Xanh.jpg", url: "/html/giadung.html" },
    { id: "p6", name: "Bình Đựng Gia Vị Gốm Mộc", image: "/img/gốm gia dụng/Bình Đựng Gia Vị Gốm Mộc.jpg", url: "/html/giadung.html" },

    //SẢN PHẨM TỪ TRANGTRI.HTML
    { id: "p7", name: "Chậu cây", image: "/img/gốm trang trí/chaucay.jpg", url: "/html/trangtri.html" }, 
    { id: "p8", name: "Bình gốm Mã Đáo", image: "/img/gốm trang trí/gom-su1.jpg", url: "/html/trangtri.html" },
    { id: "p9", name: "Lọ hoa men nâu", image: "/img/gốm trang trí/lohoa.jpg", url: "/html/trangtri.html" },
    { id: "p10", name: "Đèn gốm để bàn", image: "/img/gốm trang trí/den.webp", url: "/html/trangtri.html" },
    { id: "p11", name: "Tượng Di Lặc", image: "/img/gốm trang trí/tuong.png", url: "/html/trangtri.html" },
    { id: "p12", name: "Bình gốm thiên nga", image: "/img/gốm trang trí/binhgomthiennga.jpg", url: "/html/trangtri.html" },

    //SẢN PHẨM TỪ TRANGSUC.HTML
    { id: "p13", name: "Vòng Cổ Gốm Men Con Cua", image: "/img/gốm trang sức/1Lg7BiJVR7eWn7nFNObR5w_thumb_196f.jpeg", url: "/html/trangsuc.html" },
    { id: "p14", name: "Bông Tai Gốm", image: "/img/gốm trang sức/bongtaigom.jpg", url: "/html/trangsuc.html" },
    { id: "p15", name: "Cặp Nhẫn Gốm", image: "/img/gốm trang sức/capnhangom.jpg", url: "/html/trangsuc.html" },
    { id: "p16", name: "Mặt Dây Chuyền Gốm", image: "/img/gốm trang sức/matdaychuyengom.jpg", url: "/html/trangsuc.html" },
    { id: "p17", name: "Vòng Tay Gốm Sứ Nhiều Màu", image: "/img/gốm trang sức/vongtaygomnhieumau.webp", url: "/html/trangsuc.html" },
    { id: "p18", name: "Trâm Cài Tóc Gốm", image: "/img/gốm trang sức/tramcaitoc.jpg", url: "/html/trangsuc.html" },
    { id: "p19", name: "Lắc Tay Gốm", image: "/img/gốm trang sức/lactaygom.webp", url: "/html/trangsuc.html" },
    { id: "p20", name: "Dây Chuyền Gốm Hình Viên Kẹo", image: "/img/gốm trang sức/daychuyengomvienkeo.jpg", url: "/html/trangsuc.html" },
    { id: "p21", name: "Bông Tai Gốm Sứ Xanh", image: "/img/gốm trang sức/bongtaigom (2).jpg", url: "/html/trangsuc.html" },
    { id: "p22", name: "Nhẫn Gốm Men", image: "/img/gốm trang sức/nhangommen.jpg", url: "/html/trangsuc.html" },
    { id: "p23", name: "Lắc Tay Gốm Lục Lạc", image: "/img/gốm trang sức/lactay.jpg", url: "/html/trangsuc.html" },
    { id: "p24", name: "Vòng Cổ Gốm Men", image: "/img/gốm trang sức/vongcogomen.jpg", url: "/html/trangsuc.html" },
];

let searchIndex; // Biến lưu chỉ mục Lunr

document.addEventListener('DOMContentLoaded', () => {

    //NAVBAR SCROLL EFFECT
    const mainNavbar = document.getElementById('main-navbar');
    if (mainNavbar && !mainNavbar.classList.contains('bg-black')) {
        const checkNavScroll = () => {
             if (window.scrollY > 50) {
                 mainNavbar.classList.add('navbar-scrolled');
             } else {
                 mainNavbar.classList.remove('navbar-scrolled');
             }
        };
        checkNavScroll();
        window.addEventListener('scroll', checkNavScroll);
    }

    //HERO PARALLAX EFFECT
    const heroSection = document.getElementById('hero');
    if (heroSection) { 
        const parallaxBG = heroSection.querySelector('.hero-background');
        if (parallaxBG) {
             window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                parallaxBG.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
             });
        }
    }

    //LUNR.JS SEARCH INDEX ---
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

    //Hiển thị tên + ảnh sản phẩm
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('search-results-list');

    if (searchInput && resultsList && typeof searchIndex !== 'undefined') {
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
 
                                listItem.href = item.url; 
                                listItem.classList.add('list-group-item', 'list-group-item-action');

                                listItem.innerHTML = `
                                    <img src="${item.image}" alt="${item.name}" class="search-item-image" onerror="this.style.display='none'">
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

    } else if (searchInput && resultsList && typeof searchIndex === 'undefined') {
        console.warn("Lunr.js chưa load");
    }
});