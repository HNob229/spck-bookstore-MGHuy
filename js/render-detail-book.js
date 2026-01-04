const bookName = document.getElementById("book-name");
const bookOriginalPrice = document.getElementById("book-price-original");
const bookDiscountPrice = document.getElementById("book-discount");
const bookPercent = document.getElementById("book-percent");
const bookDesc = document.getElementById("book-description");
const bookImage = document.getElementById("book-image");
const href = document.getElementById("btn-edit-book");

// console.log(bookName, bookOriginalPrice, bookDiscountPrice, bookPercent, bookDesc, bookImage);

const params = window.location.search;
const bookId = params.split("?")[1];

const books = JSON.parse(localStorage.getItem("books")) || [];
const book = books.find((b) => b.id == bookId);
console.log(book);

const formatVND = (value) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

if (!book) {
    alert("Không tìm thấy sách!");
    window.location.href = "/index.html";
} else {
    const originalPrice = Number(book.money) || 0;
    console.log("originalPrice:", originalPrice);
    const discountPercent = Number(book.discount) || 0;
    const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
    href.href = `./edit-book.html?${book.id}`;

    // Kiểm tra và gán dữ liệu
    if (bookName) bookName.innerText = book.name;

    if (bookOriginalPrice) bookOriginalPrice.innerText = formatVND(originalPrice);
    if (bookDiscountPrice) bookDiscountPrice.innerText = formatVND(discountedPrice);
    if (bookPercent) bookPercent.innerText = `-${discountPercent}%`;
    console.log(book.description);
    if (bookDesc) bookDesc.innerText = book.description;
    if (bookImage) bookImage.src = book.image;
}
