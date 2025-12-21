const bookName = document.getElementById("book-name");
const bookDesc = document.getElementById("book-description");
const bookImage = document.getElementById("book-image");

const queryString = window.location.search;
console.log(queryString.split("?")[1]);

// lấy ra danh sách món ăn từ localStorage
const books = JSON.parse(localStorage.getItem("books")) || [];

// tìm món ăn có id tương ứng
const book = books.find((f) => f.id === Number(queryString.split("?")[1]));

// hiển thị thông tin món ăn lên trang
if (book) {
    bookName.innerText = book.name;
    bookAuthor.innerText = book.author;
    bookMoney.innerText = book.money;
    bookDesc.innerText = book.description;
    bookImage.src = book.image;
}
