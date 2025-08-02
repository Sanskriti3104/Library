console.log("Welcome to the Library");

const myLibrary = [];

function Book(title, author, pages, hasRead, uniqueId) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.uniqueId = uniqueId;
}

function addBookToLibrary() {

    while (true) {
        let title = prompt("Enter Book Name :");
        let author = prompt("Enter Author's Name: ");
        let pages = prompt("Enter number of pages: ");
        let hasRead = confirm("Have you read this book?");

        let uniqueId = crypto.randomUUID();

        let newBook = new Book(title, author, pages, hasRead, uniqueId);
        myLibrary.push(newBook);

        if (!confirm("Do you want to add another book?")) break;
    }

    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i]);
    }
}

addBookToLibrary();