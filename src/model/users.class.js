import User from '../model/user.class'
import ApiUser from '../services/users.api'
export default  class Users {

    constructor() {
        this.data = [];
        this.usersApi = new ApiUser();
    }

    async populate() {
        const usersApi = await this.usersApi.getDBUsers()
        this.data = usersApi.map(user => new User(user.id, user.nick, user.email, user.password))

    }

    async addUser(user) {
        const userDB = await this.usersApi.addDBUser(user)
        let newUser = new User(userDB.id, userDB.nick, userDB.email, userDB.password)
        this.data.push(newUser)
        return newUser
    }

    async removeUser(userId) {
        await this.usersApi.removeDBUser(userId)
        const index = this.data.splice(this.getUserIndexById(userId), 1)
        return this.data[index]
    }

    async changeUser(user) {
        const newUserFDB = await this.usersApi.changeDBUser(user)
        const newUser = new User(newUserFDB.id, newUserFDB.nick, newUserFDB.email, newUserFDB.password)
        const index = this.getUserIndexById(newUser.id)
        this.data[index] = newUser
        return newUser
    }

    async changeUserPassword(userId, password) {
        const modifiedUser = await this.usersApi.changeDBUserPassword(userId, password)
        const newUser = new User(modifiedUser.id, modifiedUser.nick, modifiedUser.email, modifiedUser.password)
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
}