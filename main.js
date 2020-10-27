const newBook = document.querySelector('#newbook')
const modal = document.querySelector('#modal')
const modalClose = document.querySelector('#modalclose')
const newBookForm = document.querySelector('#newbookform')

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

newBook.addEventListener('click',() => modal.style.display = "block")
modalClose.addEventListener('click', () => modal.style.display = "none")
newBookForm.addEventListener('submit',e => {
    // e.preventDefault()
    createBook()
})

function createBook(){
    let title = document.querySelector('#ftitle').value
    let author = document.querySelector('#fauthor').value
    let pages = document.querySelector('#fpages').value
    let hasReadArray = Array.from(document.querySelectorAll('input[name="hasRead"]'))
    hasRead = (hasReadArray.filter(input => input.checked == true)[0].value == "true" ? true : false)
    let book = new Book(title,author,pages,hasRead)
    addBookToLibrary(book)
}