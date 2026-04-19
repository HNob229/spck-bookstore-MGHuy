const profileUI = document.getElementById("profile");
const btnlogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const displayName = document.getElementById("displayName");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const { displayName, email, photoURL } = user;
        profileUI.style.display = "flex";
        btnlogin.style.display = "none";
        displayName.innerText = displayName || email;
        console.log({ displayName, email, photoURL });
    } else {
        profileUI.style.display = "none";
        btnlogin.style.display = "flex";
    }
});
