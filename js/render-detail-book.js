const name = document.getElementById("book-name");
const price = document.getElementById("book-price-original");
const image = document.getElementById("book-image");
const description = document.getElementById("book-description");
const discount = document.getElementById("book-discount");
const btnEditBook = document.getElementById("edit-book");

console.log({ name, price, image, description, discount });

// Cách lấy ID an toàn
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

const db = firebase.firestore();

if (id) {
    db.collection("books")
        .doc(id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const book = doc.data();

                // Hiển thị dữ liệu
                name.innerText = book.name;
                description.innerText = book.description || "Không có mô tả.";
                image.src = book.image;

                // Xử lý giá và giảm giá (giả sử field là 'money')
                if (book.discount > 0) {
                    console.log(book);
                    console.log(price);
                    const discounted = Math.round(book.money - (book.money * book.discount) / 100);
                    price.innerText = book.money.toLocaleString("vi-VN") + "₫";
                    discount.innerText = `-${book.discount}%`;
                    discount.style.display = "inline-block"; // Hiện tag giảm giá
                    document.getElementById("book-discount").innerText = discounted.toLocaleString("vi-VN") + "₫";
                } else {
                    price.innerText = (book.money || 0).toLocaleString("vi-VN") + "₫";
                    discount.style.display = "none"; // Ẩn tag giảm giá nếu không có
                }

                // Cập nhật link cho nút sửa (thêm id= để đồng bộ)
                btnEditBook.href = `./edit-book.html?id=${id}`;
            } else {
                throw new Error("Sách không tồn tại trong hệ thống.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
                title: "Lỗi!",
                text: error.message || "Không thể tải chi tiết sách.",
                icon: "error",
            });
        });
}
