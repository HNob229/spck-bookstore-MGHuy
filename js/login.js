// Chờ cho tới khi trang được tải xong hết thì mới thực hiện câu lệnh bên trong
window.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    console.log(loginForm);

    // Lắng nghe sự kiện submit (gửi đi) của form đăng ký
    loginForm.addEventListener("submit", (event) => {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;

        if (!email || !password) {
            alert("Hãy điền đầy đủ vào ô thông tin!");
            return;
        }

        //Lấy ra dữ liệu trong localStorage
        //Chuyển đổi Chuỗi JSON thành mảng đối tượng
        let users = JSON.parse(localStorage.getItem("users")) || [];

        //Kiểm tra email đã tồn tại chưa
        let userExists = users.find((user) => user.email === email && user.password === password);
        console.log(userExists);
        if (!userExists) {
            swal.fire({
                title: "Login failed!",
                icon: "error",
            });
            return;
        }

        //Tạo người dùng mới
        let newUser = {
            email: userExists.email,
            password: userExists.password,
        };
        //Lưu người dùng hiện tại vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        swal.fire({
            title: "Login Successful!",
            icon: "success",
            willClose: () => {
                //Chuyển hướng về trang chủ
                window.location.href = "/index.html";
            },
        });
    });
});
