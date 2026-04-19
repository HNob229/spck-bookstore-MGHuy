const btnGoogle = document.getElementById("btn-google");

btnGoogle.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            console.log(user);
            swal.fire({
                title: "Success",
                text: "User signed in successfully!",
                icon: "success",
                willClose: () => {
                    window.location.href = "../index.html";
                },
            });
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
        });
});
