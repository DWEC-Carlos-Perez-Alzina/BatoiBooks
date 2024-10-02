import Book from './book.class'
const TYPE = "Apunts"
export default class Books {
    constructor() {
        this.data = [];
    }

    populate(datosIniciales) {
        this.data = datosIniciales.map(book => new Book(book))
    }

    addBook(book) {
        let newBook = new Book(book)
        newBook.id = this.idGenerator()
        this.data.push(newBook)
        return newBook
    }

    removeBook(bookId) {
        const index = this.data.splice(this.getBookIndexById(bookId), 1)
        return this.data[index]
    }

    changeBook(newBook) {
        const index = this.getBookIndexById(newBook.id)
        this.data[index] = newBook
        return newBook
    }

    toString() {
        return this.data.map(book => book.toString()).join(', ')
    }

    getBookById(bookId) {
        const book = this.data.find(book => book.id === bookId)
        if (!book) {
            throw new Error(`No existe libro con id ${bookId}`)
        }
        return book
    }
    
    getBookIndexById(bookId) {
        const index = Array.from(this.data).findIndex(book => book.id === bookId)
        if (index === -1) {
            throw new Error(`No existe libro con id ${bookId}`)
        }
        return index
    
    }
    
    bookExists(userId, moduleCode) {
        return this.data.some(book => book.userId === userId && book.moduleCode === moduleCode)
    }
    
    booksFromUser(userId) {
        return this.data.filter(book => book.userId === userId)
    }
    
    booksFromModule(moduleCode) {
        return this.data.filter(book => book.moduleCode === moduleCode)
    }
    
    booksCheeperThan(price) {
        return this.data.filter(book => book.price <= price)
    }
    
    booksWithStatus(status) {
        return this.data.filter(book => book.status === status)
    }
    
    averagePriceOfBooks() {
        if (this.data.length === 0) {
            return '0.00 €'
        }
        const sum = this.data.reduce((acc, book) => acc + book.price, 0)
        const average = sum / this.data.length
        return average.toFixed(2) + ' €'
    }
    
    booksOfTypeNotes() {
        return this.data.filter(book => book.publisher === TYPE)
    }
    
    booksNotSold() {
        return this.data.filter(book => !book.soldDate)
    }
    
    incrementPriceOfbooks(percentage) {
        return this.data.map(book => {
            return {
                ...book,
                price: Number((book.price * (1 + percentage)).toFixed(1))
            }
        })
    }

    idGenerator() {
        return this.data.reduce((maxId, book) => Math.max(maxId, book.id), 0) + 1
    }
}