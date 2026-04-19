const formRegister = document.getElementById("form-register");

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formRegister);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeat_password");
    console.log({ email, password, repeatPassword });

    if (!email.trim()) {
        swal.fire({
            title: "Error",
            text: "Email is required!",
            willClose: () => {
                document.getElementById("email").focus();
            },
        });
        return;
    }

    if (!password.trim()) {
        swal.fire({
            title: "Error",
            text: "Password is required!",
            willClose: () => {
                document.getElementById("password").focus();
            },
        });
        return;
    }

    if (password !== repeatPassword) {
        swal.fire({
            title: "Error",
            text: "Passwords do not match!",
            willClose: () => {
                document.getElementById("repeat_password").focus();
            },
        });
        return;
    }

    swal.fire({
        icon: "loading",
        title: "Creating user...",
        showConfirmButton: false,
    });
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            swal.fire({
                title: "Success",
                text: "Register successfully!",
                icon: "success",
                willClose: () => {
                    window.location.href = "./login.html";
                },
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error({ errorCode, errorMessage });
            swal.fire({
                title: "Register Failed",
                text: errorMessage,
                icon: "error",
            });
            // ..
        });
});
