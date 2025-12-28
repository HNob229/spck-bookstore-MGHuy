// lấy ra id của thẻ chứa các sách
const bookContainer = document.getElementById("book-container");
// lấy ra danh sách sách từ localStorage
const books = JSON.parse(localStorage.getItem("books")) || [];

// Hàm để định dạng tiền tệ (thêm dấu phẩy)
const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

let html = ``;

books.forEach((book) => {
    // 1. Lấy dữ liệu từ localStorage (ép kiểu số để tính toán)
    const originalPrice = book.money;
    const discountPercent = book.discount || 0;

    // 2. Tính toán giá sau khi giảm
    const discountedPrice = Math.round(originalPrice - (originalPrice * discountPercent) / 100);

    // 3. Tạo chuỗi HTML
    html += `
    <a href="./html/detail-book.html?${book.id}" class="w-full bg-white rounded-lg shadow hover:shadow-md overflow-hidden flex flex-col">
        <img src="${book.image}" alt="${book.name}" class="" />
        <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
                <span class="block overflow-hidden line-clamp-1 text-[#808089] text-[12px] uppercase font-normal mb-1"> 
                    ${book.author} 
                </span>
                <h1 class="font-medium text-lg line-clamp-2">${book.name}</h1>
                <div class="flex items-center gap-2 ">
                    <span class="text-red-600 text-xl font-bold">
                        ${formatCurrency(discountedPrice)}₫
                    </span>
                    ${
                        discountPercent > 0
                            ? `
                        <span class="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded border border-red-200">
                            -${discountPercent}%
                        </span>
                    `
                            : ""
                    }
                    ${
                        discountPercent > 0
                            ? `
                    <p class="text-gray-400 text-sm line-through">
                        ${formatCurrency(originalPrice)}₫
                    </p>
                `
                            : ""
                    }
                </div>
            </div>
        </div>
    </a>
    `;
});

// chèn các thẻ HTML vào trong thẻ chứa sách
bookContainer.innerHTML = html;
