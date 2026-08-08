class Book {
  constructor(title, author, pages, check) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.check = check;
  }
}

const addBookForm = document.getElementById("add-book");
const submitBtn = document.getElementById("submit-button");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const displayBooks = document.querySelector(".display-books");
const bookEntryTab = document.getElementById("demo");

let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    myLibrary.push(new Book("Robison Crusoe", "Daniel Defoe", "252", true));
    myLibrary.push(
      new Book("The Old Man and the Sea", "Ernest Hemingway", "127", true)
    );
    render();
  }
}

// form submission event listeners - add new books
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  processEntries();
});

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

Object.values(fields).forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      error.textContent = "";
    }
  });
});

// check book entry is valid before adding to library
function processEntries() {
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

  if (isValid) {
    let book = new Book(title.value, author.value, pages.value, check.checked);
    myLibrary.push(book);
    bookEntryTab.classList.remove("show");
    render();
    addBookForm.reset();
  }
}

const createBookRow = (book, index) => {
  const { title, author, pages, check: hasBeenRead } = book;
  const row = document.createElement("tr");

  const titleCell = document.createElement("td");
  const authorCell = document.createElement("td");
  const pagesCell = document.createElement("td");
  const readCell = document.createElement("td");
  const deleteCell = document.createElement("td");

  titleCell.textContent = title;
  authorCell.textContent = author;
  pagesCell.textContent = pages;

  const readButton = document.createElement("button");
  readButton.className = `btn btn-sm ${hasBeenRead ? "btn-success" : "btn-secondary"}`;
  readButton.textContent = hasBeenRead ? "Yes" : "No";
  readButton.style.color = "black";
  readCell.appendChild(readButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-sm btn-warning";
  deleteButton.textContent = "Delete";
  deleteCell.appendChild(deleteButton);

  readButton.addEventListener("click", () => toggleReadStatus(index));

  deleteButton.addEventListener("click", () => deleteBook(index));

  row.append(titleCell, authorCell, pagesCell, readCell, deleteCell);
  return row;
};

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

function render() {
  displayBooks.innerHTML = "";

  const table = document.createElement("table");
  table.className = "table table-striped";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Title", "Author", "Pages", "Read", "Delete"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  const bookRows = myLibrary.map((book, index) => createBookRow(book, index));
  tbody.append(...bookRows);
  table.appendChild(tbody);

  displayBooks.appendChild(table);
}
