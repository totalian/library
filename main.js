const newBook = document.querySelector('#newbook')
const modal = document.querySelector('#modal')
const modalClose = document.querySelector('#modalclose')
const newBookForm = document.querySelector('#newbookform')
const bookcase = document.querySelector('#bookcase')

let myLibrary = []

function Book(title,author,pages,hasRead){
    this.title = title,
    this.author = author,
    this.pages = pages
    this.hasRead = hasRead
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

const setEvents = () => {
    newBook.addEventListener('click',() => modal.style.display = "block")
    modalClose.addEventListener('click', () => modal.style.display = "none")
    newBookForm.addEventListener('submit',e => {
        e.preventDefault()
        createBook()
        displayLibrary(myLibrary)
    })
}

function createBook(){
    let title = document.querySelector('#ftitle').value
    let author = document.querySelector('#fauthor').value
    let pages = document.querySelector('#fpages').value
    let hasReadArray = Array.from(document.querySelectorAll('input[name="hasRead"]'))
    hasRead = (hasReadArray.filter(input => input.checked == true)[0].value == "true" ? true : false)
    let book = new Book(title,author,pages,hasRead)
    addBookToLibrary(book)
    save()
    document.querySelector('#ftitle').value = ""
    document.querySelector('#fauthor').value = ""
    document.querySelector('#fpages').value = ""
    modal.style.display = "none"
}

function removeBook(button){
    let i = button.target.dataset.index
    myLibrary.splice(i,1)
    save()
    displayLibrary(myLibrary)
}

function changeBookStatus(e){
    let i = e.target.dataset.index
    myLibrary[i].hasRead ? myLibrary[i].hasRead=false : myLibrary[i].hasRead=true
    console.log(e)
    e.target.parentElement.classList.toggle('read')
    e.target.innerHTML == "Read" ? e.target.innerHTML="Unread" : e.target.innerHTML="Read"
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function save(){
    localStorage.setItem('myLibrary',JSON.stringify(myLibrary))
}

function displayLibrary(library){
    removeAllChildNodes(bookcase)
    library.forEach((book,i) => {
        let displayedBook = document.createElement('div')
        let removeButton = document.createElement('button')
        let bookTitle = document.createElement('div')
        let bookAuthor = document.createElement('div')
        let bookPages = document.createElement('div')
        let bookStatus = document.createElement('div')
        displayedBook.classList.add('book')
        removeButton.classList.add('remove')
        bookTitle.classList.add('booktitle')
        bookAuthor.classList.add('author','subinfo')
        bookPages.classList.add('pages','subinfo')
        bookStatus.classList.add('status','subinfo')
        bookTitle.innerHTML = book.title
        bookAuthor.innerHTML = book.author
        bookPages.innerHTML = book.pages
        bookStatus.innerHTML = book.hasRead ? "Read" : "Unread"
        removeButton.innerHTML = "&times"
        displayedBook.appendChild(removeButton)
        displayedBook.appendChild(bookTitle)
        displayedBook.appendChild(bookAuthor)
        displayedBook.appendChild(bookPages)
        displayedBook.appendChild(bookStatus)
        removeButton.dataset.index = i
        bookStatus.dataset.index = i
        bookcase.appendChild(displayedBook)
        if(book.hasRead){
            displayedBook.classList.add('read')
        }
        removeButton.addEventListener('click',(e) => removeBook(e))
        bookStatus.addEventListener('click',e => changeBookStatus(e))
    })
}

window.onload = (() => {
    if(localStorage.length >0){
        myLibrary = JSON.parse(localStorage.myLibrary)
        displayLibrary(myLibrary)
    }
    setEvents()
})