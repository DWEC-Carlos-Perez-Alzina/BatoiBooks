const SERVER = import.meta.env.VITE_URL_API
export default class UsersApi {
    async getDBUsers() {
        const response = await fetch(`${SERVER}/users`)
        const data = await response.json()
        return data
    }
    
    async getDBUser(id) {
        const response = await fetch(`${SERVER}/users/${id}`)

        if (!response.ok) {
            throw new Error('Error al borrar el usuario')
        }

        const data = await response.json()
        return data
    }

    async addDBUser(user) {
        const response = await fetch(`${SERVER}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            throw new Error('Error al borrar el usuario')
        }

        const data = await response.json()
        return data
    }

    async removeDBUser(id) {
        const response = await fetch(`${SERVER}/users/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Error al borrar el usuario')
        }

        const data = await response.json()
        return data
    }

    async changeDBUser(user) {
        const response = await fetch(`${SERVER}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            throw new Error('Error al borrar el usuario')
        }

        const data = await response.json()
        return data
    }

    async changeDBUserPassword(id, contrasenya) {
        const response = await fetch(`${SERVER}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                password: contrasenya 
            })
        })

        if (!response.ok) {
            throw new Error('Error al borrar el usuario')
        }

        const data = await response.json()
        return data
    }
}
