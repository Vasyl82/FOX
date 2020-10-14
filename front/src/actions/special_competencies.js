import { RepresentationService } from '../services'

const repr = new RepresentationService
const getSpecialCompetencyList = (params = null, additional = false, role = null, signal = null) => {
    if (role === "Contr") {
        return repr.displayDeleteList('worker_special_competencies', params, additional, signal)
    }
    else {
        return repr.displaySimpleList('worker_special_competencies', params, additional, signal)
    }
}

export {
    getSpecialCompetencyList
}