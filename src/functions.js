function getBookById(books, bookId) {
    const book = books.find(book => book.id === bookId)
    if (!book) {
        throw new Error(`No existe libro con id ${bookId}`)
    }
    return book
}

function getBookIndexById(books, bookId) {
    const index = books.findIndex(book => book.id === bookId)
    if (index === -1) {
        throw new Error(`No existe libro con id ${bookId}`)
    }
    return index

}

function bookExists(books, userId, moduleCode) {
    return books.some(book => book.userId === userId && book.moduleCode === moduleCode)
}

function booksFromUser(books, userId) {
    return books.filter(book => book.userId === userId)
}

function booksFromModule(books, moduleCode) {
    return books.filter(book => book.moduleCode === moduleCode)
}

function booksCheeperThan(books, price) {
    return books.filter(book => book.price <= price)
}

function booksWithStatus(books, status) {
    return books.filter(book => book.status === status)
}

function averagePriceOfBooks(books) {
    if (books.length === 0) {
        return '0.00 €'
    }
    const sum = books.reduce((acc, book) => acc + book.price, 0)
    const average = sum / books.length
    return average.toFixed(2) + ' €'
}

function booksOfTypeNotes(books) {
    return books.filter(book => book.publisher === 'Apunts')
}

function booksNotSold(books) {
    return books.filter(book => !book.soldDate)
}

function incrementPriceOfbooks(books, percentage) {
    return books.map(book => {
        return {
            ...book,
            price: Number((book.price * (1 + percentage)).toFixed(1))
        }
    })
}

function getUserById(users, userId) {
    const user = users.find(user => user.id === userId)
    if (!user) {
        throw new Error(`No existe usuario con id ${userId}`)
    }
    return user
}

function getUserIndexById(users, userId) {
    const index = users.findIndex(user => user.id === userId)
    if (index === -1) {
        throw new Error(`No existe usuario con id ${userId}`)
    }
    return index
}

function getUserByNickName(users, nick) {
    const user = users.find(user => user.nick === nick)
    if (!user) {
        throw new Error(`No existe usuario con nick ${nick}`)
    }
    return user
}

function getModuleByCode(modules, moduleCode) {
    const module = modules.find(module => module.code === moduleCode)
    if (!module) {
        throw new Error(`No existe módulo con code ${moduleCode}`)
    }
    return module
}

export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserByNickName,
    getUserIndexById,
    getModuleByCode
  }