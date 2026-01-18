const btnEditbook = document.getElementById("btn-edit-book");
const name = document.getElementById("book-name");
const description = document.getElementById("book-description");
const author = document.getElementById("book-author");
const bookOriginalPrice = document.getElementById("book-price-original");
const bookPercent = document.getElementById("book-discount");
const image = document.getElementById("book-image");
let imagePreview = document.getElementById("image-preview");

const queryString = window.location.search;
// lấy ra danh sách món ăn từ localStorage
const books = JSON.parse(localStorage.getItem("books")) || [];

// lấy id từ URL
const bookId = Number(queryString.split("?")[1]);

// tìm quyển sách có id tương ứng
const book = books.find((f) => f.id === bookId);
// hiển thị thông tin sách lên các input để chỉnh sửa
if (book) {
    name.value = book.name;
    author.value = book.author;
    description.value = book.description;
    bookOriginalPrice.value = book.money;
    bookPercent.value = book.discount;
    image.value = book.image;
}

btnEditbook.addEventListener("click", () => {
    // kiểm tra dữ liệu hợp lệ
    if (!name.value) {
        alert("Vui lòng nhập tên sách");
        return;
    }
    if (!author.value) {
        alert("Vui lòng nhập tên tác giả");
        return;
    }
    if (!description.value) {
        alert("Vui lòng nhập mô tả sách");
        return;
    }
    if (!bookOriginalPrice.value) {
        alert("Vui lòng nhập giá tiền");
        return;
    }
    if (!bookPercent.value) {
        alert("Vui lòng nhập phần trăm giảm giá");
        return;
    }
    if (!image.value) {
        alert("Vui lòng nhập URL hình ảnh sách");
        return;
    }

    // tìm index của sách cần cập nhật
    const bookIndex = books.findIndex((f) => f.id === bookId);

    // cập nhật thông tin sách
    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: bookId, // giữ nguyên id
            name: name.value,
            description: description.value,
            author: author.value,
            money: Math.round(Number(bookOriginalPrice.value)),
            discount: Math.round(Number(bookPercent.value)),
            image: image.value,
        };

        // lưu danh sách sách vào localStorage
        localStorage.setItem("books", JSON.stringify(books));

        // chuyển về trang danh sách sách
        window.history.back();
    }
});
