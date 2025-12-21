// lây ra id của thẻ chứa các sách
const bookContainer = document.getElementById("book-container");
// lấy ra danh sách sách từ localStorage
const books = JSON.parse(localStorage.getItem("books")) || [];
// duyệt qua từng sách và tạo thẻ HTML tương ứng
let html = ``;

books.forEach((book) => {
    let x = book.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    book.money = x;
    html += `
    <a href="./html/detail-book.html?${book.id}" class="w-full bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
        <img src="${book.image}" alt="" />
        <div class="p-5">
            <span class="block overflow-hidden line-clamp-1 text-[#808089] text-ellipsis font-inter text-[14px] italic-none font-normal leading-[1.5] uppercase"> ${book.author} </span>
            <h1 class="font-medium text-xl">${book.name}</h1>
            <p class="text-gray-600 mt-1 text-2xl font-bold">${book.money}₫</p>
        </div>
    </a>
    `;
});

// chèn các thẻ HTML vào trong thẻ chứa sách
bookContainer.innerHTML = html;
