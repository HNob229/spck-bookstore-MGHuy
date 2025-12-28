const bookName = document.getElementById("book-name");
const bookAuthor = document.getElementById("book-author");
const bookMoney = document.getElementById("book-price-original");
const bookDiscount = document.getElementById("book-discount");
const bookDesc = document.getElementById("book-description");
const bookImage = document.getElementById("book-image");

const queryString = window.location.search;
const bookId = Number(queryString.split("?")[1]);

const books = JSON.parse(localStorage.getItem("books")) || [];
const book = books.find((b) => b.id === bookId);

const formatVND = (value) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

if (book) {
    const originalPrice = book.money;
    const discountPercent = book.discount;
    const discountedPrice = Math.round(originalPrice - (originalPrice * discountPercent) / 100);

    bookName.innerText = book.name;
    bookAuthor.innerText = `Tác giả: ${book.author}`;

    bookMoney.innerHTML = `
        <span class="text-red-600 font-bold text-xl">
            ${formatVND(discountedPrice)}
        </span>
        <span class="ml-3 text-green-600 font-semibold">
            -${discountPercent}%
        </span>
        <span class="ml-3 text-gray-500 line-through">
            ${formatVND(originalPrice)}
        </span>
    `;

    bookDesc.innerText = book.description;
    bookImage.src = book.image;
}
