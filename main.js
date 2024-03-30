console.log("Javascript is running!!");
//Structure for Book object and function convert them into cards
const library = {};
function Book(title, author, numOfPages, isRead){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;

    this.print = function(){
        console.log(title+", "+author+", "+numOfPages+" pages, "+((isRead)? "Has already read": "Yet to read!"));
    }
}

library["Harry Potter"] = new Book("Harry Potter", "Luise Philip", 456, true);
library["Hamlate"] = new Book("Hamlate", "James Shakspere", 349, false);

//Generating Cards
let bookContainer = document.getElementById("booksContainer");
function addCardByName(name){
    const book = library[name];
    // Create card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Create card content
    const title = document.createElement('h2');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = book.author;

    const numOfPages = document.createElement('p');
    numOfPages.textContent = book.numOfPages;

    const isRead = document.createElement('p');
    isRead.textContent = (book.isRead)? "Finished": "Unread";
    isRead.classList.add("isRead");

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", ()=>{
        delete library[deleteButton.parentElement.querySelector('h2').textContent]
        console.log(library);
        deleteButton.parentElement.remove();
    });

    const readButton = document.createElement('button');
    readButton.textContent = (book.isRead)? "Unread": "Mark as read";
    readButton.classList.add("readButton");
    readButton.addEventListener("click",()=>{
        const isReadText = readButton.parentElement.querySelector(".isRead");
        if(isReadText.textContent === "Finished")isReadText.textContent = "Unread";
        else isReadText.textContent = "Finished";
    });

    // Append content to card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numOfPages);
    card.appendChild(isRead);
    card.appendChild(deleteButton);
    card.appendChild(readButton);

    // Append card to container
    bookContainer.appendChild(card);
}
for(const key in library){
    addCardByName(key);
}

//NEW BOOK
//show new dialog when new dialog is pressed
const newBookDialog = document.getElementById("newBookDialog");
const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener("click", ()=>{
    newBookDialog.showModal();
});

//saving data
const form = document.getElementById("bookForm");
const confirmButton = document.getElementById("confirm");
confirmButton.addEventListener("click", (event)=>{
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("bookName");
    const author = formData.get("author");
    const numOfPages = formData.get("numOfPages");
    const isRead = formData.get("isRead");

    if(name == ""){
        alert("Book name cannot be empty!!");
        return;
    }
    const confirmation = confirm("Please review the book details below:"
                                +`\nBook Name: ${name}`
                                +`\nAuthor: ${author}`
                                +`\nNumber of Pages: ${numOfPages}`
                                +`\nIs Read: ${isRead}`);
    if(confirmation){
        library[name] = new Book(name, author, numOfPages, (isRead === "Yes"));
        newBookDialog.close();
        addCardByName(name);
        form.reset();
    }
})