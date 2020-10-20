import { RepresentationService } from '../services'

const repr = new RepresentationService
const getClientManagerList = ({ role = null, params = null, additional = false, signal = null }) => {
    if (role === 'CliAdm') {
        return repr.displayDeleteList('client_managers', params, additional, signal)
    }
    else {
        return repr.displaySimpleList('client_managers', params, additional, signal)
    }
}

export {
    getClientManagerList
}