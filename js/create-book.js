const btnCreateBook = document.getElementById("btn-create-book");

btnCreateBook.addEventListener("click", () => {
    // lấy giá trị từ các input
    const name = document.getElementById("book-name").value;
    const author = document.getElementById("book-author").value;
    const money = document.getElementById("book-money").value;
    const description = document.getElementById("book-description").value;
    const image = document.getElementById("book-image").value;
    // kiểm tra dữ liệu hợp lệ
    if (!name) {
        alert("Vui lòng nhập tên sách");
        return;
    }
    if (!author) {
        alert("Vui lòng nhập tên tác giả");
        return;
    }
    if (!money) {
        alert("Vui lòng giá tiền sách");
        return;
    }
    if (!description) {
        alert("Vui lòng nhập mô tả sách");
        return;
    }
    if (!image) {
        alert("Vui lòng nhập URL hình ảnh sách");
        return;
    }
    // tạo đối tượng sách mới
    const newbook = {
        id: Date.now(),
        name: name,
        author: author,
        money: money,
        description: description,
        image: image,
    };
    // lấy danh sách sách từ localStorage
    const books = JSON.parse(localStorage.getItem("books")) || [];
    // thêm sách mới vào danh sách
    books.push(newbook);
    // lưu danh sách sách vào localStorage
    localStorage.setItem("books", JSON.stringify(books));
    // chuyển về trang danh sách sách
    window.location.href = "/index.html";
});
