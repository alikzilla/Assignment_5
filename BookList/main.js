class Book {
    constructor(title, author, ISBN){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.avaibility = true;
    }

    displayDetails(){
        console.log("-------------------------------------");
        console.log("Book's title: " + this.title);
        console.log("Book's author: " + this.author);
        console.log("Book's ISBN: " + this.ISBN);
        console.log("Book's avaibility: " + this.avaibility);
    }
}

class Library{
    constructor() {
        this.books = [];
    }

    addBook(book){
        this.books.push(book);
    }

    displayBooks() {
        
        const tbody = table.querySelector("tbody");
        while (tbody.children.length > 1) {
            tbody.removeChild(tbody.lastChild);
        }

        if (this.books.length === 0) {
            console.log("-------------------------------------");
            console.log("      There are no books available   ");
        } else {
            console.log("-------------------------------------");
            console.log("           List of books             ");
    
            this.books.forEach((book, i) => {
                book.displayDetails();
    
                const tr = document.createElement("tr");
                const th1 = document.createElement("th");
                const th2 = document.createElement("th");
                const th3 = document.createElement("th");
                const th4 = document.createElement("th");
                const th5 = document.createElement("th");
    
                th1.textContent = i + 1;
                th2.textContent = book.title;
                th3.textContent = book.author;
                th4.textContent = book.ISBN;
                th5.textContent = book.avaibility;
    
                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                tr.appendChild(th5);
    
                tbody.appendChild(tr);

                clear();
            });
        }
    }
    

    removeBook(ISBN){
        const index = this.books.findIndex((book) => book.ISBN == ISBN);
        if(index !== -1){
            console.log("-------------------------------------");
            console.log("  Book has been succesfully removed  ");
            this.books.splice(index, 1);
        }else{
            console.log("-------------------------------------");
            console.log("           Book not found            ");
        }
    }

    searchBook(query){
        
        const tbody = table.querySelector("tbody");
        while (tbody.children.length > 1) {
            tbody.removeChild(tbody.lastChild);
        }

        const found = this.books.filter(
            (book) => 
                book.ISBN.toString().startsWith(query)
        );

        if(found === 0){
            console.log("-------------------------------------");
            console.log("           Book not found            ");
        }else{
            console.log("-------------------------------------");
            console.log("             Book found:             ");

            found.forEach((book, i) => {
                book.displayDetails();
    
                const tr = document.createElement("tr");
                const th1 = document.createElement("th");
                const th2 = document.createElement("th");
                const th3 = document.createElement("th");
                const th4 = document.createElement("th");
                const th5 = document.createElement("th");
    
                th1.textContent = i + 1;
                th2.textContent = book.title;
                th3.textContent = book.author;
                th4.textContent = book.ISBN;
                th5.textContent = book.avaibility;
    
                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                tr.appendChild(th5);
    
                tbody.appendChild(tr);

                clear();
            });
        }
    }

    checkIn(ISBN){
        const book = this.books.find((book) => book.ISBN === ISBN);
        if(book){
            if(!book.avaibility){
                book.avaibility = true;
                console.log("-------------------------------------");
                console.log("     Book checked in succesfully     ");
            }else{
                console.log("-------------------------------------");
                console.log("        Book isn't available         ");
            }
        }else{
            console.log("-------------------------------------");
            console.log("            Book not found           ");
        }
    }

    checkOut(ISBN){
        const book = this.books.find((book) => book.ISBN === ISBN);
        if(book){
            if(book.avaibility){
                book.avaibility = false;
                console.log("-------------------------------------");
                console.log("     Book checked out succesfully    ");
            }else{
                console.log("-------------------------------------");
                console.log("        Book isn't available         ");
            }
        }else{
            console.log("-------------------------------------");
            console.log("          Book not found             ");
        }
    }
}

function clear(){
    titleInput.value = "";
    authorInput.value = "";
    icbnInput.value = "";
}

const library = new Library();

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const icbnInput = document.querySelector("#icbn");

const submitButton = document.querySelector("#submit");
const searchButton = document.querySelector("#search");
const removeButton = document.querySelector("#remove");

const table = document.querySelector(".fixed-size-table");

submitButton.addEventListener("click", () => {
    if((titleInput.value != "" && authorInput.value != "" && icbnInput.value != "") /*&& (require)*/){
        const book = new Book(titleInput.value, authorInput.value, icbnInput.value);
        library.addBook(book);
        library.displayBooks();
    }else{
        alert("Invalid Input");
    }
});

searchButton.addEventListener("click", () => {
    if(icbnInput.value != "" /*&& (require)*/){
        library.searchBook(icbnInput.value);
    }else{
        confirm("You must to write only ICBN code");
    }
});

removeButton.addEventListener("click", () => {
    if(icbnInput.value != ""){
        library.removeBook(icbnInput.value);
        library.displayBooks();
    }else{
        confirm("Only ICBN code");
    }
});