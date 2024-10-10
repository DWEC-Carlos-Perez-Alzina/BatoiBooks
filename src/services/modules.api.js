const SERVER = import.meta.env.VITE_URL_API
export default class ModulesApi {
    async getDBModules() {
        const response = await fetch(`${SERVER}/modules`)
        const data = await response.json()
        return data
    }

    async getDBModule(id) {
        const response = await fetch(`${SERVER}/module/${id}`)
        const data = await response.json()
        return data
    }
}