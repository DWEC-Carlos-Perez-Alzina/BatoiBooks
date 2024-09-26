export default  class Users {

    constructor() {
        this.data = [];
    }

    populate(usersIniciales) {
        this.data = usersIniciales
    }

    addUser(user) {
        const newUser = { ...user, id: this.idGenerator() }
        this.data.push(newUser)
    }

    removeUser(userId) {
        if (this.getUserById)
        this.data = this.data.filter(user => user.id !== userId)
        else
        throw new Error(`No existe usuario con id ${userId}`)
    }

    changeUser(userId, newUser) {
        const user = this.getUserById(this.data, userId)
        if (!user) {
            throw new Error(`No existe usuario con id ${userId}`)
        }
        this.data[this.getUserIndexById(this.data, userId)] = newUser
    }

    getUserById(users, userId) {
        const user = Array.from(users).find(user => user.id === userId)
        if (!user) {
            throw new Error(`No existe usuario con id ${userId}`)
        }
        return user
    }

    toString() {
        return this.data.map(user => user.toString()).join(', ')
    }
    
    getUserIndexById(users, userId) {
        const index = Array.from(users).findIndex(user => user.id === userId)
        if (index === -1) {
            throw new Error(`No existe usuario con id ${userId}`)
        }
        return index
    }
    
    getUserByNickName(users, nick) {
        const user = Array.from(users).find(user => user.nick === nick)
        if (!user) {
            throw new Error(`No existe usuario con nick ${nick}`)
        }
        return user
    }

    idGenerator() {
        return this.data.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1
    }
}