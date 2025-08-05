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

const submitButton = document.querySelector(".submit-btn");
const bookForm = document.getElementById("bookForm");
const libraryContainer = document.getElementById("libraryContainer");
const totalBooks = document.getElementById("totalBooks");
const booksRead = document.getElementById("booksRead");

function addBookToLibrary(title, author, pageCount, readStatus) {
    let uniqueId = crypto.randomUUID();

    let newBook = new Book(title, author, pageCount, readStatus, uniqueId);
    myLibrary.push(newBook);

    updateStats();
    displayBooks();
}

function updateStats() {
    totalBooks.textContent = myLibrary.length;
    booksRead.textContent = myLibrary.filter(book => book.hasRead === true).length;
}

// Update your displayBooks() function to use the new HTML structure
function displayBooks() {
    if (myLibrary.length == 0) {
        libraryContainer.innerHTML = `<div class="empty-state">
            <i class="fas fa-book"></i>
            <h3>Your Library is empty</h3>
            <p>Add your first book to get started! Click the form to the left to begin building your collection.
            </p>
        </div>`;
        return;
    }

    libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        let bookElement = document.createElement("div");
        bookElement.classList.add("book-card");
        bookElement.dataset.id = book.uniqueId;

        const initials = book.title.split(' ').map(word => word[0]).join('').slice(0, 3).toUpperCase();

        bookElement.innerHTML = `
            <div class="book-cover">
                <div class="cover-inner">${initials}</div>
            </div>
            <div class="book-details">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-meta">
                    <span><i class="fas fa-file-alt"></i> ${book.pages} pages</span>
                    <span class="read-badge ${book.hasRead ? 'read' : 'not-read'}">
                        ${book.hasRead ? 'Read' : 'Not Read'}
                    </span>
                </div>
                <div class="book-actions">
                    <button class="action-btn toggle-read-btn" onclick="toggleReadStatus('${book.uniqueId}')">
                        <i class="fas ${book.hasRead ? 'fa-undo' : 'fa-check'}"></i>
                        ${book.hasRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button class="action-btn delete-btn" onclick="removeBook('${book.uniqueId}')">
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>
                </div>
            </div>
        `;
        libraryContainer.appendChild(bookElement);
    });
}

function toggleReadStatus(uniqueId) {
    const bookIndex = myLibrary.findIndex(book => book.uniqueId === uniqueId);
    if (bookIndex !== -1) {
        myLibrary[bookIndex].hasRead = !myLibrary[bookIndex].hasRead;
        updateStats();
        displayBooks();
    }
}

function removeBook(uniqueId) {
    const bookIndex = myLibrary.findIndex(book => book.uniqueId === uniqueId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        updateStats();
        displayBooks();
    }
}

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const bookTitle = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const pageCount = document.getElementById("page-count").value;
    const readStatus = document.getElementById("read-status").checked;

    addBookToLibrary(bookTitle, author, pageCount, readStatus);

    //Reset form
    bookForm.reset();
    document.getElementById("book-title").focus();
});

updateStats();