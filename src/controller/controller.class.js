import Modules from '../model/modules.class'
import Users from '../model/users.class'
import Books from '../model/books.class'
import Cart from '../model/cart.class'
import View from '../view/view.class'

export default class Controller {
    constructor() {
        this.model = {
            modules: new Modules(),
            users: new Users(),
            books: new Books(),
            cart: new Cart()
        }
        this.view = new View()
    }

    async init() {
        try {
            await Promise.all([
                this.model.modules.populate(), 
                this.model.users.populate(), 
                this.model.books.populate(),
                this.model.cart.populate()
            ])
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))
            this.view.renderModulesOptions(this.model.modules.data)
            this.view.setAddBookHandler()
            const allBooks = this.model.books.data
            allBooks.forEach(book => this.view.renderBook(book, this.model.modules.getModuleByCode(book.moduleCode)))
            this.setBookRemoveEventListener(allBooks)
            this.setBookAddToCartEventListener(allBooks)
            this.setBookEditHandlerController(allBooks)
        } catch (error) {
            this.view.renderMessage('error', 'Error al cargar los datos')
        }
    }

    setBookRemoveEventListener(books) {
        books.forEach(book => {
            if (!document.getElementById(book.id).querySelector('.removebutton').onclick) {
                document.getElementById(book.id).querySelector('.removebutton').addEventListener('click', (event) => {
                    event.preventDefault()
                    this.handleRemoveBook(book.id)
                })    
            }
        })
    }

    setBookAddToCartEventListener(books) {
        books.forEach(book => {
            if (!document.getElementById(book.id).querySelector('.addtocart').onclick) {
                document.getElementById(book.id).querySelector('.addtocart').addEventListener('click', (event) => {
                    event.preventDefault()
                    this.handleCartAdd(book)
                })    
            }
        })
    }

    setBookEditHandlerController(books) {
        books.forEach(book => {
            if (!document.getElementById(book.id).querySelector('.editbutton').onclick) {
                document.getElementById(book.id).querySelector('.editbutton').addEventListener('click', (event) => {
                    event.preventDefault()
                    this.view.setBookEditHandler(book)
                })    
            }
        })
    }

    async handleSubmitBook(payLoad, editingBookId) {
        try {
            let book;
            if (editingBookId) {
                const bookToEdit = this.model.books.getBookById(editingBookId);
                book = await this.model.books.changeBook({...bookToEdit, ...payLoad});
                this.view.renderMessage('success', 'Libro editado correctamente');
                this.view.renderEditedBook(book);
            } else {
                book = await this.model.books.addBook(payLoad);
                this.view.renderMessage('success', 'Libro agregado');
                this.view.renderBook(book, this.model.modules.getModuleByCode(book.moduleCode));
                this.setBookRemoveEventListener([book]);
                this.setBookAddToCartEventListener([book]);
                this.setBookEditHandlerController([book]);
            }
        } catch (error) {
            console.error(error);
            this.view.renderMessage('error', 'Error al procesar el libro');
        }
    }

    async handleRemoveBook(bookId) {
        if(!confirm('¿Seguro que quieres borrar este libro?')) {
            return
        }
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

    handleCartAdd(book) {
        try {
            this.model.cart.addItem(book)
            this.view.renderMessage('success', 'Libro agregado al carrito')
        } catch (error) {
            this.view.renderMessage('error', 'Error al agregar el libro al carrito')
        }
    }
}