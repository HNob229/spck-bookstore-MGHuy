const formAddProduct = document.getElementById("form-create-book");

formAddProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formAddProduct);
    const name = formData.get("book-name");
    const money = formData.get("book-price-original");
    const image = formData.get("book-image");
    const description = formData.get("book-description");
    const author = formData.get("book-author");
    const discount = formData.get("book-price-discount");
    console.log({ name, money, image, description, author, discount });

    if (!name.trim()) {
        Swal.fire({
            title: "Error",
            text: "Book name is required!",
            willClose: () => {
                document.getElementById("book-name").focus();
            },
        });
        return;
    }

    if (!money.trim()) {
        Swal.fire({
            title: "Error",
            text: "Book price is required!",
            willClose: () => {
                document.getElementById("book-price-original").focus();
            },
        });
        return;
    }

    if (!image.trim()) {
        Swal.fire({
            title: "Error",
            text: "Book image is required!",
            willClose: () => {
                document.getElementById("book-image").focus();
            },
        });
        return;
    }

    if (!description.trim()) {
        Swal.fire({
            title: "Error",
            text: "Book description is required!",
            willClose: () => {
                document.getElementById("book-description").focus();
            },
        });
        return;
    }

    if (!author.trim()) {
        Swal.fire({
            title: "Error",
            text: "Book author is required!",
            willClose: () => {
                document.getElementById("book-author").focus();
            },
        });
        return;
    }

    if (!discount.trim()) {
        Swal.fire({
            title: "Error",
            text: "Book discount is required!",
            willClose: () => {
                document.getElementById("book-price-discount").focus();
            },
        });
        return;
    }

    console.log({ name, money, image, description, author, discount });
    Swal.fire({
        icon: "loading",
        title: "Adding Book...",
        showConfirmButton: false,
    });
    const db = firebase.firestore();
    // Add a new document with a generated id.
    const newBook = { name, money, image, description, author, discount };
    console.log(newBook);
    db.collection("books")
        .add(newBook)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            Swal.fire({
                title: "Success",
                text: "Book added successfully!",
                willClose: () => {
                    window.location.href = "../index.html";
                },
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            Swal.fire({
                title: "Add product failed",
                text: error.message,
            });
        });
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
