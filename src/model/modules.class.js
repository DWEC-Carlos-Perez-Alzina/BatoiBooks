import Module from './module.class.js'
export default class Modules {
    constructor() {
        this.data = [];
    }

    populate(modulesIniciales) {
        this.data = modulesIniciales.map(module => new Module(module.code, module.cliteral, module.vliteral, module.courseId))
    }

    toString() {
        return this.data.map(module => module.toString()).join(', ')
    }

    getModuleByCode(moduleCode) {
        const module = this.data.find(module => module.code === moduleCode)
        if (!module) {
            throw new Error(`No existe módulo con code ${moduleCode}`)
        }
        return module
    }
}