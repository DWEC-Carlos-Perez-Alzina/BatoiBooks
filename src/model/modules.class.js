export default class Modules {
    constructor() {
        this.data = [];
    }

    populate(modulesIniciales) {
        this.data = modulesIniciales
    }

    toString() {
        return this.data.map(module => module.toString()).join(', ')
    }

    getModuleByCode(modules, moduleCode) {
        const module = Array.from(modules).find(module => module.code === moduleCode)
        if (!module) {
            throw new Error(`No existe módulo con code ${moduleCode}`)
        }
        return module
    }
}