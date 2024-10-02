import User from '../model/user.class'
export default  class Users {

    constructor() {
        this.data = [];
    }

    populate(usersIniciales) {
        this.data = usersIniciales.map(user => new User(user.id, user.nick, user.email, user.password))
    }

    addUser(user) {
        let newUser = new User(user.id, user.nick, user.email, user.password)
        newUser.id = this.idGenerator()
        this.data.push(newUser)
        return newUser
    }

    removeUser(userId) {
        const index = this.data.splice(this.getUserIndexById(userId), 1)
        return this.data[index]
    }

    changeUser(newUser) {
        const index = this.getUserIndexById(newUser.id)
        this.data[index] = newUser
        return newUser
    }

    getUserById(userId) {
        const user = this.data.find(user => user.id === userId)
        if (!user) {
            throw new Error(`No existe usuario con id ${userId}`)
        }
        return user
    }

    toString() {
        return this.data.map(user => user.toString()).join(', ')
    }
    
    getUserIndexById(userId) {
        const index = this.data.findIndex(user => user.id === userId)
        if (index === -1) {
            throw new Error(`No existe usuario con id ${userId}`)
        }
        return index
    }
    
    getUserByNickName(nick) {
        const user = this.data.find(user => user.nick === nick)
        if (!user) {
            throw new Error(`No existe usuario con nick ${nick}`)
        }
        return user
    }

    idGenerator() {
        return this.data.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1
    }
}