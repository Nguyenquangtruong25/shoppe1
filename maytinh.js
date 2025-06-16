// Danh sách sản phẩm mẫu (dựa trên hình ảnh)
const products = [
    { name: "Cáp Sạc Nhanh", price: 58800, category: "Thời Trang", discount: "-40%", rating: "6.6", sold: "47.4k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lx20nq32n3yzfa.webp" },
    { name: "Bộ sạc nhanh", price: 99000, category: "Thời Trang", discount: "-48%", rating: "6.6", sold: "21.7k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m86820ip4kufaf.webp" },
    { name: " Dây Sạc Tự Ngắt Bọc Dù", price: 99000, category: "Áo Vest & Blazer", discount: "-50%", rating: "6.6", sold: "63.1k", img: "https://down-vn.img.susercontent.com/file/4e4121aa9e78116cdb68e644e13b37c4.webp" },
    { name: "Ốp điện thoại iPhone", price: 65000, category: "Áo Hoodie, Áo Len & Áo Ni", discount: "-55%", rating: "6.6", sold: "35.8k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9zs9d9ti6myac.webp" },
    { name: "Túi Đựng Điện Thoại Chống Nước", price: 58880, category: "Quần Jeans", discount: "-54%", rating: "6.6", sold: "5.7k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu1k014yxpg11f.webp" },
    { name: "Ốp điện thoại trong suốt", price: 189000, category: "Thời Trang", discount: "-33%", rating: "6.6", sold: "63.9k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9zt2aqhj22s27.webp" },
    { name: "Gậy chụp hình gấp gọn", price: 79000, category: "Thời Trang", discount: "-40%", rating: "6.6", sold: "7.7k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyg80iwzr7f1b9.webp" },
    { name: "Gậy Livestream", price: 7999, category: "Thời Trang", discount: "-20%", rating: "6.6", sold: "19.2k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m48lbvxlp94g4e.webp" },
    { name: "Cáp Sạc Nhanh 3 Đầu ", price: 31900, category: "Thời Trang", discount: "-42%", rating: "6.6", sold: "6.6k", img: "https://down-vn.img.susercontent.com/file/sg-11134201-7qvd2-lj3q4gfkm7sn50.webp" },
    { name: "Dây cáp sạc điện thoại", price: 39000, category: "Thời Trang", discount: "-57%", rating: "6.6", sold: "35.2k", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyurenyhc2w179.webp" },
];

// Hiển thị sản phẩm
function displayProducts(productList) {
    const productContainer = document.getElementById('productList');
    productContainer.innerHTML = '';
    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="discount">${product.discount}</div>
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₫${product.price.toLocaleString()}</p>
            <div class="rating">Đánh giá: ${product.rating}</div>
<div class="sold">Đã bán: ${product.sold}</div>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Tìm kiếm sản phẩm
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

// Lọc theo danh mục
function filterCategory(category) {
    const filteredProducts = category === "Tất cả" 
        ? products 
        : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Lọc theo loại sản phẩm (checkbox)
let selectedTypes = [];
function filterByType(type) {
    if (selectedTypes.includes(type)) {
        selectedTypes = selectedTypes.filter(t => t !== type);
    } else {
        selectedTypes.push(type);
    }
    let filteredProducts = products;
    if (selectedTypes.length > 0) {
        filteredProducts = products.filter(product => 
            selectedTypes.some(type => product.name.toLowerCase().includes(type.toLowerCase()))
        );
    }
    displayProducts(filteredProducts);
}

// Sắp xếp sản phẩm
function sortProducts(criteria) {
    // Định dạng giá
    let sortedProducts = [...products];
    if (criteria === 'popular') {
        // Sắp xếp theo đánh giá (rating)
        sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (criteria === 'newest') {
        // Giả lập sắp xếp theo mới nhất (dùng tên làm ví dụ)
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === 'bestselling') {
        // Sắp xếp theo số lượng bán
        sortedProducts.sort((a, b) => parseFloat(b.sold) - parseFloat(a.sold));
    } else if (criteria === 'price-asc') {
        // Sắp xếp giá tăng dần
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
        // Sắp xếp giá giảm dần
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(sortedProducts);

    // Cập nhật trạng thái active cho nút sắp xếp
    document.querySelectorAll('.sort-options button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.onclick.toString().includes(criteria)) {
            btn.classList.add('active');
        }
    });
}


// Hiển thị tất cả sản phẩm khi tải trang
displayProducts(products);
sortProducts('popular');