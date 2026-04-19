const bookContainer = document.getElementById("book-container");
const db = firebase.firestore();

// Hàm định dạng tiền tệ (đảm bảo bạn đã định nghĩa hàm này ở đâu đó)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
};

db.collection("books")
    .get()
    .then((querySnapshot) => {
        // Sử dụng map để tạo mảng các chuỗi HTML
        const booksHtml = querySnapshot.docs
            .map((doc) => {
                const book = doc.data();
                const id = doc.id; // Quan trọng: Lấy ID từ document

                // Tính toán giá sau khi giảm
                const discountedPrice = Math.round(book.money - (book.money * (book.discount || 0)) / 100);

                return `
                <a href="./html/detail-book.html?id=${id}" class="w-full bg-white rounded-lg shadow hover:shadow-md overflow-hidden flex flex-col">
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
            .join(""); // Nối tất cả thành 1 chuỗi lớn

        bookContainer.innerHTML = booksHtml;
    })
    .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        bookContainer.innerHTML = "<p>Đã có lỗi xảy ra khi tải dữ liệu.</p>";
    });
