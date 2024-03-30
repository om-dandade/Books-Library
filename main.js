console.log("Javascript is running!!");
//Structure for Book object and function convert them into cards
const library = [];
function Book(title, author, numOfPages, isRead){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;

    this.print = function(){
        console.log(title+", "+author+", "+numOfPages+" pages, "+((isRead)? "Has already read": "Yet to read!"));
    }
}

library.push(new Book("Harry Potter", "Luise Philip", 456, true));
library.push(new Book("Hamlate", "James Shakspere", 349, false));

//Generating Cards
let bookContainer = document.getElementById("booksContainer");
function generateCards(){
    library.forEach(book => {
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

        // Append content to card
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(numOfPages);
        card.appendChild(isRead);

        // Append card to container
        bookContainer.appendChild(card);
    });
}
generateCards();

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

    const confirmation = confirm("Is below Correct:"
                                +`\nBook Name: ${name}`
                                +`\nAuthor: ${author}`
                                +`\nNumber of Pages: ${numOfPages}`
                                +`\nIs Read: ${isRead}`);

    if(confirmation){
        library.push(new Book(name, author, numOfPages, (isRead === "Yes")));
        newBookDialog.close();
        form.reset();
        while (bookContainer.firstChild) {
            bookContainer.removeChild(bookContainer.firstChild);
          }
        generateCards();
    }
})