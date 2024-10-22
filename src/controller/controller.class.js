import Modules from '../model/modules.class'
import Users from '../model/users.class'
import Books from '../model/books.class'
import View from '../view/view.class'
import Book from '../model/book.class'

export default class Controller {
    constructor() {
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books()
        }
        this.view = new View()
    }

    async init() {
        try {
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))
            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this))
            await this.model.modules.populate()
            await this.model.users.populate()
            await this.model.books.populate()
            this.view.renderModulesOptions(this.model.modules.data)
            this.model.books.data.forEach(book => this.view.renderBook(book))
        } catch (error) {
            this.view.renderMessage('error', 'Error al cargar los datos')
        }
    }

    async handleSubmitBook(payLoad) {
        alert('form enviado')
        console.log(payLoad)
        try {
            const newBook = await this.model.books.addBook(payLoad).then(() => {
                this.view.renderMessage('success', 'Libro agregado')
                this.view.renderBook(payLoad)
            })
            // const bookUp = new Book(newBook)
        } catch (error) {
            console.error(error)
            this.view.renderMessage('error', 'Error al agregar el libro')
        }
    }

    async handleRemoveBook(bookId) {
        alert('form enviado')
        console.log(bookId)
        try {
            const newData = await this.model.books.removeBook(bookId).then(() => {
                console.log('Libro eliminado correctamente')
                this.view.renderMessage('success', 'Libro eliminado correctamente')
                this.view.removeBook(bookId)
            })
        } catch (error) {
            this.view.renderMessage('error', 'Error al eliminar el libro')
            console.log('No se encontró el libro con el ID especificado')
        }
    }
}