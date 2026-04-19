const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formLogin);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({ email, password });
    swal.fire({
        icon: "loading",
        title: "Loadinggg...",
        showConfirmButton: false,
    });
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            swal.fire({
                title: "Success",
                text: "User signed in successfully!",
                icon: "success",
                willClose: () => {
                    window.location.href = "/index.html";
                },
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error({ errorCode, errorMessage });
            swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
            });
            // ..
        });
});
