const profileUI = document.getElementById("profile");
const btnlogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const displayName = document.getElementById("display-name");

// console.log({ profileUI, btnlogin, btnLogout, displayName });

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("meomeo");
        // console.log({ profileUI, btnlogin, btnLogout, displayName });
        // console.log(user);
        // const { displayName, email, photoURL } = user;
        profileUI.style.display = "flex";
        btnlogin.style.display = "none";
        displayName.innerText = "Xin Chào: " + user.email.split("@")[0];
        // console.log({ displayName, email, photoURL });
    } else {
        profileUI.style.display = "none";
        btnlogin.style.display = "flex";
        // console.log("gaugau");
    }
});

btnLogout.addEventListener("click", () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // Sign-out successful.
            console.log("User signed out successfully!");
        })
        .catch((error) => {
            // An error happened.
            console.error("Error signing out: ", error);
            Swal.fire({
                title: "Error",
                text: "Failed to sign out!",
                icon: "error",
            });
        });
});
