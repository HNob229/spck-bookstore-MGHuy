const btnDelete = document.getElementById("btn-delete-book");

btnDelete.addEventListener("click", () => {
    // Xác nhận trước khi xóa
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?");

    if (isConfirm) {
        // 2. Lấy danh sách từ LocalStorage
        let books = JSON.parse(localStorage.getItem("books")) || [];

        // 3. Lọc bỏ cuốn sách có ID trùng với ID hiện tại
        // Lưu ý: Sử dụng != hoặc !== tùy thuộc kiểu dữ liệu của bạn
        const newBooks = books.filter((book) => book.id != bookId);

        // 4. Lưu lại mảng mới vào LocalStorage
        localStorage.setItem("books", JSON.stringify(newBooks));

        // 5. Thông báo và chuyển hướng về trang chủ
        alert("Xóa thành công!");
        window.location.href = "/index.html";
    }
});
