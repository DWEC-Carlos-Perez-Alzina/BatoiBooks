import ModulesApi from '../services/modules.api'
import Module from './module.class.js'
export default class Modules {
    constructor() {
        this.data = [];
        this.modulesApi = new ModulesApi()
    }
    async populate() {
        const modulesData = await this.modulesApi.getDBModules()
        this.data = modulesData.map(module => new Module(module.code, module.cliteral, module.vliteral, module.courseId))
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