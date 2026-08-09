class Book {
  constructor(title, author, pages, check) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.check = check;
  }
}

const addBook = document.getElementById("add-book");
const submitBtn = document.getElementById("submit-button");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const displayBooks = document.getElementById("display-books");
const bookEntryTab = document.getElementById("demo");

const myLibrary = [];

function initLibrary() {
  if (myLibrary.length === 0) {
    myLibrary.push(new Book("Robison Crusoe", "Daniel Defoe", 252, true));
    myLibrary.push(
      new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
    );
    render();
  }
}

// book field validations
const fields = {
  title: {
    input: titleInput,
    error: document.querySelector(".error-title"),
    message: "Title is required",
  },
  author: {
    input: authorInput,
    error: document.querySelector(".error-author"),
    message: "Author is required",
  },
  pages: {
    input: pagesInput,
    error: document.querySelector(".error-pages"),
    message: "Enter page numbers (whole numbers only)",
  },
};
// validate that pages input is a whole number
function validatePagesInput() {
  const rawValue = pagesInput.value.trim();
  const isValidPages =
    rawValue !== "" && /^\d+$/.test(rawValue) && Number(rawValue) >= 1;

  if (!isValidPages) {
    fields.pages.error.textContent = "Enter page numbers (whole numbers only)";
    return false;
  }

  fields.pages.error.textContent = "";
  return true;
}

Object.values(fields).forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    if (input === pagesInput) {
      if (validatePagesInput()) {
        error.textContent = "";
      }
    } else if (input.value.trim() !== "") {
      error.textContent = "";
    }
  });

  // replace browser's invalid event with bespoke error messages for inputs
  input.addEventListener("invalid", (event) => {
    event.preventDefault();
    const fieldInput = Object.values(fields).find(
      (field) => field.input === input
    );
    if (fieldInput) {
      // use bespoke error message from fields object
      error.textContent = fieldInput.message;
    } else {
      // only use default browser error message if there is no bespoke error message
      error.textContent = input.validationMessage;
    }
  });
});

// check book entries are valid before adding to library
function processEntries(event) {
  event.preventDefault();
  // override browser default error messages so that my default error messages can show
  if (!addBook.checkValidity()) {
    addBook.reportValidity();
    return;
  }

  let isValid = true;

  Object.entries(fields).forEach(([key, field]) => {
    const value = field.input.value.trim();

    if (value === "") {
      field.error.textContent = field.message;
      isValid = false;
    } else {
      field.error.textContent = "";
    }
  });

  if (!validatePagesInput()) {
    isValid = false;
  }

  if (isValid) {
    let book = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      checkInput.checked
    );
    myLibrary.push(book);
    bookEntryTab.classList.remove("show");
    render();
    addBook.reset();
  }
}

function toggleReadStatus(index) {
  myLibrary[index].check = !myLibrary[index].check;
  render();
}

function deleteBook(index) {
  bookDeleteMessage(`You've deleted title: ${myLibrary[index].title}`);
  myLibrary.splice(index, 1);
  render();
}

function bookDeleteMessage(message, duration = 3000) {
  const existingMessage = document.querySelector(".book-delete-message");
  if (existingMessage) existingMessage.remove();

  const messageBox = document.createElement("div");
  messageBox.className = "book-delete-message";
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.remove();
  }, duration);
}

function createBookRow(book, index) {
  const row = document.createElement("tr");

  const titleCell = document.createElement("td");
  titleCell.textContent = book.title;

  const authorCell = document.createElement("td");
  authorCell.textContent = book.author;

  const pagesCell = document.createElement("td");
  pagesCell.textContent = book.pages;

  const readCell = document.createElement("td");
  const readButton = document.createElement("button");
  readButton.className = `btn btn-sm ${book.check ? "btn-success" : "btn-secondary"}`;
  readButton.textContent = book.check ? "Yes" : "No";
  readButton.style.color = "black";
  readButton.addEventListener("click", () => toggleReadStatus(index));
  readCell.appendChild(readButton);

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-sm btn-warning";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteBook(index));
  deleteCell.appendChild(deleteButton);

  row.append(titleCell, authorCell, pagesCell, readCell, deleteCell);
  return row;
}

function render() {
  displayBooks.innerHTML = "";

  const rows = myLibrary.map((book, index) => createBookRow(book, index));
  displayBooks.append(...rows);
}

// event listeners
addBook.addEventListener("submit", processEntries);
window.addEventListener("DOMContentLoaded", initLibrary);
