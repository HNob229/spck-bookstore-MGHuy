const name = document.getElementById("book-name");
const price = document.getElementById("book-price-original");
const image = document.getElementById("book-image");
const description = document.getElementById("book-description");
const author = document.getElementById("book-author");
const discount = document.getElementById("book-discount");

const id = window.location.search.split("id=")[1];
console.log(id);

const db = firebase.firestore();

db.collection("books")
    .doc(id)
    .get()
    .then((doc) => {
        const book = doc.data();
        console.log(book);
        console.log(name.value);
        console.log(book.name);
        name.value = book.name;
        price.value = book.money;
        image.value = book.image;
        description.value = book.description;
        author.value = book.author;
        discount.value = book.discount;
    })
    .catch((error) => {
        console.log("Error getting document:", error);
        Swal.fire({
            title: "Error",
            text: "Failed to load book details.",
            icon: "error",
        });
    });

const formEditBook = document.getElementById("form-edit-book");
console.log("hihi");
formEditBook.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formEditBook);
    const name = formData.get("book-name");
    const money = formData.get("book-price-original");
    const image = formData.get("book-image");
    const description = formData.get("book-description");
    const author = formData.get("book-author");
    const discount = formData.get("book-discount");
    console.log(document.getElementById("book-discount").value);
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
    console.log(discount);

    if (discount.value < 0 || discount.value > 100) {
        Swal.fire({
            title: "Error",
            text: "Book discount must be between 0 and 100!",
            willClose: () => {
                document.getElementById("book-discount").focus();
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
    console.log(id);
    // Add a new document with a generated id.
    const newBook = { name, money, image, description, author, discount };
    console.log(newBook);
    db.collection("books")
        .doc(id)
        .update(newBook)
        .then((docRef) => {
            Swal.fire({
                title: "Success",
                text: "Book updated successfully!",
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
