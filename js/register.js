// Chờ cho tới khi trang được tải xong hết thì mới thực hiện câu lệnh bên trong
window.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    console.log(registerForm);

    // Lắng nghe sự kiện submit (gửi đi) của form đăng ký
    registerForm.addEventListener("submit", (event) => {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;
        let repeatPassword = event.target.repeatPassword.value;
        console.log(email, password, repeatPassword);

        //regex chữ hoa
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;

        //Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        //Kiểm tra chữ hoa
        if (!uppercaseRegex.test(password)) {
            alert("Password must contain at least one uppercase letter!");
            return;
        }

        //Kiểm tra chữ thường
        if (!lowercaseRegex.test(password)) {
            alert("Password must contain at least one lowercase letter!");
            return;
        }

        //Kiểm tra số
        if (!numberRegex.test(password)) {
            alert("Password must contain at least one number!");
            return;
        }

        // Kiểm tra xem mật khẩu và nhập lại mật khẩu có giống nhau không
        if (password !== repeatPassword) {
            alert("Passwords do not match!");
            return;
        }

        //Lấy ra dữ liệu trong localStorage
        //Chuyển đổi Chuỗi JSON thành mảng đối tượng
        let users = JSON.parse(localStorage.getItem("users")) || [];

        //Kiểm tra email đã tồn tại chưa
        let userExists = users.some((user) => user.email === email);
        if (userExists) {
            alert("Email already registered!");
            return;
        }

        //Thêm người dùng mới vào mảng
        users.push({ email: email, password: password });
        //Lưu mảng người dùng vào localStorage dưới dạng chuỗi JSON
        localStorage.setItem("users", JSON.stringify(users));

        //nếu tất cả đều hợp lệ, chuyển hướng đến trang đăng nhập
        alert("Registration successful!");
    });
});
