import { RepresentationService } from '../services'

const repr = new RepresentationService
const getContractorList = ({ role, signal } = {}) => {
    if (role === 'CliAdm') {
        return repr.displayDeleteList('contractors', null, false, signal)
    }
    else {
        return repr.displaySimpleList('contractors', null, false, signal)
    }
}

export {
    getContractorList
}