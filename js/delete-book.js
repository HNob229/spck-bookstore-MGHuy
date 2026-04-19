const btnDeleteBook = document.getElementById("delete-book");
btnDeleteBook.addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection("books")
                .doc(id)
                .delete()
                .then(() => {
                    Swal.fire("Deleted!", "Your book has been deleted.", "success").then(() => {
                        window.location.href = "../index.html";
                    });
                })
                .catch((error) => {
                    console.error("Error deleting document: ", error);
                    Swal.fire({
                        title: "Delete book failed",
                        text: error.message,
                    });
                });
        }
    });
});
