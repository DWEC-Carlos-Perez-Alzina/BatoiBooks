import Book from './book.class'
export default  class Books {
    constructor() {
        this.data = [];
    }

    populate(datosIniciales) {
        this.data = datosIniciales
    }

    addBook(book) {
        const newBook = { ...book, id: this.idGenerator() }
        this.data.push(newBook)
    }

    removeBook(bookId) {
        if (this.getBookById)
        this.data = this.data.filter(book => book.id !== bookId)
        else
        throw new Error(`No existe libro con id ${bookId}`)
    }

    changeBook(bookId, newBook) {
        const index = this.data.findIndex(book => book.id === bookId)
        if (index === -1) {
            throw new Error(`No existe libro con id ${bookId}`)
        }
        this.data[index] = newBook
    }

    toString() {
        return this.data.map(book => book.toString()).join(', ')
    }

    getBookById(books, bookId) {
        const book = this.getBookById(books, bookId)
        if (!book) {
            throw new Error(`No existe libro con id ${bookId}`)
        }
        return book
    }
    
    getBookIndexById(books, bookId) {
        const index = Array.from(books).findIndex(book => book.id === bookId)
        if (index === -1) {
            throw new Error(`No existe libro con id ${bookId}`)
        }
        return index
    
    }
    
    bookExists(books, userId, moduleCode) {
        return Array.from(books).some(book => book.userId === userId && book.moduleCode === moduleCode)
    }
    
    booksFromUser(books, userId) {
        return Array.from(books).filter(book => book.userId === userId)
    }
    
    booksFromModule(books, moduleCode) {
        return Array.from(books).filter(book => book.moduleCode === moduleCode)
    }
    
    booksCheeperThan(books, price) {
        return Array.from(books).filter(book => book.price <= price)
    }
    
    booksWithStatus(books, status) {
        return Array.from(books).filter(book => book.status === status)
    }
    
    averagePriceOfBooks(books) {
        if (Array.from(books).length === 0) {
            return '0.00 €'
        }
        const sum = Array.from(books).reduce((acc, book) => acc + book.price, 0)
        const average = sum / books.length
        return average.toFixed(2) + ' €'
    }
    
    booksOfTypeNotes(books) {
        return Array.from(books).filter(book => book.publisher === 'Apunts')
    }
    
    booksNotSold(books) {
        return Array.from(books).filter(book => !book.soldDate)
    }
    
    incrementPriceOfbooks(books, percentage) {
        return Array.from(books).map(book => {
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