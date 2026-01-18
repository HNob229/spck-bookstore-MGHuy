const btnDelete = document.getElementById("btn-delete-book");

btnDelete.addEventListener("click", () => {
    // Xác nhận trước khi xóa
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?");

    if (isConfirm) {
        // Lấy danh sách từ LocalStorage
        let books = JSON.parse(localStorage.getItem("books")) || [];

        // Lọc bỏ cuốn sách có ID trùng với ID hiện tại
        const newBooks = books.filter((book) => book.id != bookId);

        // Lưu lại mảng mới vào LocalStorage
        localStorage.setItem("books", JSON.stringify(newBooks));

        // Thông báo và chuyển hướng về trang chủ
        swal.fire({
            title: "Deleted Successful!",
            icon: "success",
            willClose: () => {
                //Chuyển hướng về trang chủ
                window.location.href = "/index.html";
            },
        });
    }
});
