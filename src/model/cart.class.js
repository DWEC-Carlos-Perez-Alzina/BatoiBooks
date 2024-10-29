import Book from "./book.class";

export default class Cart {
    constructor() { 
        this.data = [];
    }

    populate() {
        
    }

    getBookById(id) {
        return this.data.find(book => book.id === id)
    }

    addItem(book) {
        if (this.getBookById(book.id)) {
            throw new Error(`Ya existe un libro con id ${book.id}`)
        }
        const newBook = new Book(book)
        this.data.push(newBook)
        console.log(this.data)
    }

    removeItem(id) {
        const index = this.data.findIndex(book => book.id === id)
        if (index !== -1) {
            this.data.splice(index, 1)
        } else {
            throw new Error(`No existe libro con id ${id}`)
        }
    }

    toString() {
        return this.data.map(book => book.toString()).join('\n')
    }

    /*
    populate: por ahora no hará nada
    getBookById: recibe una id y devuelve el libro del carrito con esa id o {} si no existe
    addItem: recibe un objeto de tipo Book del que hace una copia y 
        lo añade al data (es decir, no añade el libro recibido sino una copia del mismo). Si ya estuviera lanza un error
    removeItem: recibe una id y borra del carrito el libro con esa id. Si no estuviera lanza un error
    toString: muestra información de los libros del carrito

    */
}