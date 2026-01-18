const btnCreateBook = document.getElementById("btn-create-book");

btnCreateBook.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("book-name").value;
    const author = document.getElementById("book-author").value;

    // Chuyển sang số và làm tròn theo VNĐ (không có số lẻ)
    const money = Math.round(Number(document.getElementById("book-price-original").value));
    const discount = Math.round(Number(document.getElementById("book-price-discount").value));

    const description = document.getElementById("book-description").value;
    const image = document.getElementById("book-image").value;

    if (!name || !author || !money || !discount || !description || !image) {
        alert("Vui lòng điền đầy đủ tất cả các thông tin!");
        return;
    }

    const newbook = {
        id: Date.now(),
        name,
        author,
        money, // lưu số nguyên (vd: 150000)
        discount, // lưu số nguyên
        description,
        image,
    };

    try {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(newbook);
        localStorage.setItem("books", JSON.stringify(books));

        swal.fire({
            title: "Create Successful!",
            icon: "success",
            willClose: () => {
                //Chuyển hướng về trang chủ
                window.location.href = "/index.html";
            },
        });
    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
        alert("Có lỗi xảy ra khi lưu sách!");
    }
});

// Xem trước ảnh
const inputImage = document.getElementById("book-image");
const previewImage = document.getElementById("image-preview");

inputImage.addEventListener("input", () => {
    if (inputImage.value) {
        previewImage.src = inputImage.value;
        previewImage.classList.remove("hidden");
    } else {
        previewImage.classList.add("hidden");
    }
});
