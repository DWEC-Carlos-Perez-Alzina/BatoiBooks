export default class View {
    constructor() {
        this.bookList = document.getElementById('list')
        this.bookForm = document.getElementById('bookForm')
        this.remove = document.getElementById('remove')
        this.about = document.getElementById('about')
        this.form = document.getElementById('form')
        this.messages = document.getElementById('messages')
    }

    renderModulesOptions(modules) {
        const select = document.getElementById('id-module');

        modules.forEach(module => {
            const option = document.createElement('option');
            option.setAttribute('value', module.code);
            option.innerHTML = module.cliteral;
            select.appendChild(option);
        });
    }

    renderBook(book, moduleName) {
        const card = document.createElement('div')
        card.classList.add('card')
        card.id = book.id

        card.innerHTML = `
        <img class="card-img-top" src="${book.photo || 'https://png.pngtree.com/png-vector/20230105/ourmid/pngtree-book-icon-vector-image-png-image_6552370.png'}" alt="Imagen del libro">
        <h4>Libro: ${book.id}</h4>
        <div class="card-body">
            <h3>${moduleName.cliteral} (${book.id})</h3>
            <h4>Editorial</h4>
            <p>${book.publisher}</p>
            <p>${book.pages} páginas</p>
            <p>Estado: ${book.status}</p>
            <p>${book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta'}</p>
            <h5>Comentarios</h5>
            <p>${book.comments}</p>
            <h4>${book.price} €</h4>
        </div>
        `
        document.getElementById('list').appendChild(card)
    }

    removeBook(bookId) {
        const card = document.getElementById(bookId)
        card.remove()
    }

    renderMessage(type, message) {
        const messagesDiv = document.getElementById('messages')
        const div = document.createElement('div')
        div.classList.add('alert', 'alert-dismissible', 'd-flex', 'justify-content-between', 'align-items-center')
        if (type === 'success') {
            div.classList.add('alert-info')
        } else {
            div.classList.add('alert-danger')
        }
        div.setAttribute('role', 'alert')
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="margin: 0; flex-grow: 1;">${message}</p>
                <button type="button" class="btn-close" style="margin-left: auto;">x</button>
            </div>
        `
        messagesDiv.appendChild(div)

        div.querySelector('.btn-close').addEventListener('click', () => {
            div.remove()
        });

        setTimeout(() => {
            div.remove()
        }, 3000)
    }

    setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
           event.preventDefault()
           const moduleCode = document.getElementById('id-module').value
           console.log('VALOR DE ID MODULE')
           console.log(moduleCode)
           console.log('YA NO ES EL VALOR')
           const publisher = document.getElementById('publisher').value
           const pages = document.getElementById('pages').value
           const status = document.getElementById('status').value
           const price = document.getElementById('price').value
           const comments = document.getElementById('comments').value
           console.log(moduleCode, publisher, pages, price, comments)
           const book = {moduleCode, publisher, pages, status, price, comments}
        callback(book)
        })
    }
       
    setBookRemoveHandler(callback) {
        this.remove.addEventListener('click', () => {
            const idToRemove = document.getElementById('id-remove').value
            callback(idToRemove)
        })
    }
}