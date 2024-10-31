export default class View {
    constructor() {
        this.bookList = document.getElementById('list')
        this.bookForm = document.getElementById('bookForm')
        this.about = document.getElementById('about')
        this.form = document.getElementById('form')
        this.editingBookId = null 
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
            <h3 class="card-title">${moduleName.cliteral} (${book.id})</h3>
            <h4>Editorial</h4>
            <p class="publisher">${book.publisher}</p>
            <p class="pages">${book.pages} páginas</p>
            <p class="status">Estado: ${book.status}</p>
            <p class="sold-date">${book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta'}</p>
            <h5>Comentarios</h5>
            <p class="comments">${book.comments}</p>
            <h4 class="price">${book.price} €</h4>
            <button class="addtocart" value="${book.id}">
                <span class="material-icons">add_shopping_cart</span>
            </button>
            <button class="removebutton" value="${book.id}">
                <span class="material-icons">delete</span>
            </button>
            <button class="editbutton" value="${book.id}">
                <span class="material-icons">edit</span>
            </button>
        </div>
        `
        document.getElementById('list').appendChild(card)
    }

    renderEditedBook(book) {
        const card = document.getElementById(book.id);
    
        if (card) {
            card.querySelector('.card-title').textContent = book.moduleCode;
            card.querySelector('.publisher').textContent = book.publisher;
            card.querySelector('.pages').textContent = book.pages;

            card.querySelector('.status').textContent = book.status;
            card.querySelector('.price').textContent = book.price;
            card.querySelector('.comments').textContent = book.comments;
        }
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

    resetForm() {
        const h2 = this.form.querySelector('h2');
        h2.innerHTML = 'Añadir libro';
        this.bookForm.querySelector('button[type=submit]').innerHTML = 'Añadir';
        this.bookForm.reset();
        this.editingBookId = null;
        const idField = this.bookForm.querySelector('#id');
        const idLabel = this.bookForm.querySelector('label[for="id"]');
        if (idField && idLabel) {
            idField.classList.add('hidden');
            idLabel.classList.add('hidden');
        }
    }

    setFormResetHandler(callback) {
        this.bookForm.addEventListener('reset', (event) => {
            event.preventDefault();
            this.resetForm();
            callback();
        });
    }

    setBookSubmitHandler(callback) {
        this.bookForm.addEventListener('submit', (event) => {
           event.preventDefault();
           const moduleCode = document.getElementById('id-module').value;
           const publisher = document.getElementById('publisher').value;
           const pages = document.getElementById('pages').value;
    
           const statusRadios = this.bookForm.querySelectorAll('input[name="status"]');
           let selectedStatus;
           statusRadios.forEach(radio => {
               if (radio.checked) {
                   selectedStatus = radio.value;
               }
           });
    
           const price = document.getElementById('price').value;
           const comments = document.getElementById('comments').value;

           const book = { moduleCode, publisher, pages, status: selectedStatus, price, comments };
            
           callback(book, this.editingBookId);
        
           this.resetForm();
        });
    }

    setBookEditHandler(book) {
        const h2 = this.form.querySelector('h2');
        const bookForm = document.getElementById('bookForm');
        const idField = document.getElementById('id');
        const idLabel = document.getElementById('id-label');
        idField.classList.remove('hidden');
        idField.value = book.id;
        idLabel.classList.remove('hidden');
        h2.innerHTML = 'Editar libro';

        bookForm.querySelector('button[type=submit]').innerHTML = 'Editar';
        document.getElementById('id-module').value = book.moduleCode;
        document.getElementById('publisher').value = book.publisher;
        document.getElementById('pages').value = book.pages;
        const statusRadios = bookForm.querySelectorAll('input[name="status"]');
        statusRadios.forEach(radio => {
            radio.checked = (radio.value === book.status);
        });
        document.getElementById('price').value = book.price;
        document.getElementById('comments').value = book.comments;
        this.editingBookId = book.id;
    }

    setAddBookHandler() {
        const formLink = document.getElementById('form-link');

        formLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.hash = '#form';
            this.resetForm();
        });
    }

    validateField(field, errorMessageId) {
        if (!field.checkValidity()) {
            field.classList.add('error');
            document.getElementById(errorMessageId).textContent = this.messageError(field);
            return true;
        } else {
            field.classList.remove('error');
            document.getElementById(errorMessageId).textContent = '';
            return false;
        }
    }

    validateForm() {
        const moduleSelected = document.getElementById('id-module');
        const publisher = document.getElementById('publisher');
        const pages = document.getElementById('pages');
        const price = document.getElementById('price');
        const status = document.querySelector('input[name="status"]:checked');

        const errorFields = [];

        errorFields.push(this.validateField(moduleSelected, 'id-module-error'));
        errorFields.push(this.validateField(publisher, 'publisher-error'));
        errorFields.push(this.validateField(pages, 'pages-error'));
        errorFields.push(this.validateField(price, 'price-error'));

        if (status === null) {
            document.getElementById('status-error').textContent = 'Es necesario seleccionar un estado';
            errorFields.push(true);
        } else {
            errorFields.push(this.validateField(status, 'status-error'));
        }

        if (errorFields.includes(true)) {
            const errorMessage = 'Por favor, complete los campos obligatorios';
            document.getElementById('error-message').textContent = errorMessage;
        } else {
            document.getElementById('error-message').textContent = '';
        }

        const isValid = !errorFields.includes(true);

        return isValid;
    }

    messageError(element) {
        if (element.validity.valueMissing) {
            return 'Este campo es obligatorio';
        }

        if (element.validity.patternMismatch) {
            return 'El formato no es correcto';
        }

        if (element.validity.rangeUnderflow) {
            return `El valor debe ser mayor o igual a ${element.min}`;
            
        }

        if (element.validity.stepMismatch) {
            return `El valor debe tener ${element.step === '0.01' ? '2 decimales' : 'entero'}`;
        }
    }
}