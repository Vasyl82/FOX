import { RepresentationService } from '../services'

const repr = new RepresentationService
const getClientManagerList = (role, signal = null) => {
    if (role === 'CliAdm') {
        return repr.displayDeleteList('client_managers', null, false, signal)
    }
    else {
        return repr.displaySimpleList('client_managers', null, false, signal)
    }
}

export {
    getClientManagerList
}