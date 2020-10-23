import { RepresentationService } from '../services'

const repr = new RepresentationService
const getClientManagerList = ({ role = null, params = null, additional = false, signal = null }) => {
    if (role === 'CliAdm') {
        return repr.displayDeleteList('managers', params, additional, signal)
    }
    else {
        return repr.displaySimpleList('managers', params, additional, signal)
    }
}

export {
    getClientManagerList
}