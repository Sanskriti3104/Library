const myLibrary = [];

function Book(title, author, pages, hasRead, uniqueId) {
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.uniqueId = uniqueId;
}

const submitButton = document.querySelector(".submit-btn");
const totalBooks = document.getElementById("totalBooks");
const booksRead = document.getElementById("booksRead");

submitButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const pageCount = document.getElementById("page-count").value;
    const readStatus = document.getElementById("read-status").checked;

    let uniqueId = crypto.randomUUID();

    let newBook = new Book(bookTitle, author, pageCount, readStatus, uniqueId);
    myLibrary.push(newBook);

    let reads = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i]);
        if (myLibrary[i].hasRead) {
            reads++;
        }
    }

    totalBooks.textContent = myLibrary.length;
    booksRead.textContent = reads;
}