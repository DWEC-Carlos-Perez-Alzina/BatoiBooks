const SERVER = import.meta.env.VITE_URL_API

export default class BooksApi {
    async getDBBooks() {
        const response = await fetch(`${SERVER}/books`)

        if (!response.ok) {
            throw new Error('Error al borrar el libro')
        }

        const data = await response.json()
        return data
    }

    async getDBBook(id) {
        const response = await fetch(`${SERVER}/books/${id}`)

        if (!response.ok) {
            throw new Error('Error al borrar el libro')
        }

        const data = await response.json()
        return data
    }

    async addDBBook(book) {
        const response = await fetch(`${SERVER}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })

        if (!response.ok) {
            throw new Error('Error al borrar el libro')
        }

        const data = await response.json()
        return data
    }

    async removeDBBook(id) {
        const response = await fetch(`${SERVER}/books/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Error al borrar el libro')
        }

        const data = await response.json()
        return data
    }

    async changeDBBook(book) {
        const response = await fetch(`${SERVER}/books/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })

        if (!response.ok) {
            throw new Error('Error al borrar el libro')
        }

        const data = await response.json()
        return data        
    }

    async getDBBooksByUserIdAndModule(userId, moduleCode) {
        const response = await fetch(`${SERVER}/books?userId=${userId}&moduleCode=${moduleCode}`)
        const data = await response.json()
        return data
    }
}