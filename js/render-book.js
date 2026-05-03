const bookContainer = document.getElementById("book-container");
const searchInput = document.getElementById("search-input"); // Đảm bảo HTML của bạn có input với ID này
const db = firebase.firestore();

// 1. Biến lưu trữ toàn bộ dữ liệu sách
let allBooks = [];

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
};

// 2. Hàm render UI (Dùng chung cho cả lúc load lần đầu và lúc tìm kiếm)
const renderUI = (books) => {
    if (books.length === 0) {
        bookContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 font-semibold py-10">Không tìm thấy cuốn sách đó</p>`;
        return;
    }

    const booksHtml = books
        .map((book) => {
            const discountedPrice = Math.round(book.money - (book.money * (book.discount || 0)) / 100);

            return `
            <a href="./html/detail-book.html?id=${book.id}" class="w-full bg-white rounded-lg shadow hover:shadow-md overflow-hidden flex flex-col">
                <img src="${book.image}" alt="${book.name}" class="h-48 w-full object-cover" />
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <span class="block overflow-hidden line-clamp-1 text-[#808089] text-[12px] uppercase font-normal mb-1"> 
                            ${book.author || "Đang cập nhật"} 
                        </span>
                        <h1 class="font-medium text-lg line-clamp-2">${book.name}</h1>
                        <div class="flex items-center gap-2 mt-2">
                            <span class="text-red-600 text-xl font-bold">
                                ${formatCurrency(discountedPrice)}₫
                            </span>
                            ${
                                book.discount > 0
                                    ? `
                                <span class="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded border border-red-200">
                                    -${book.discount}%
                                </span>
                                <p class="text-gray-400 text-sm line-through">
                                    ${formatCurrency(book.money)}₫
                                </p>
                            `
                                    : ""
                            }
                        </div>
                    </div>
                </div>
            </a>
        `;
        })
        .join("");

    bookContainer.innerHTML = booksHtml;
};

// 3. Tải dữ liệu từ Firebase
db.collection("books")
    .get()
    .then((querySnapshot) => {
        allBooks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Render lần đầu
        renderUI(allBooks);
    })
    .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        bookContainer.innerHTML = "<p>Đã có lỗi xảy ra khi tải dữ liệu.</p>";
    });

// 4. Lắng nghe sự kiện tìm kiếm
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    // Lọc danh sách sách dựa trên tên
    const filteredBooks = allBooks.filter((book) => book.name.toLowerCase().includes(searchTerm));

    // Gọi hàm render với danh sách đã lọc
    renderUI(filteredBooks);
});
