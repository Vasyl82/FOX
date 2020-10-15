import { RepresentationService } from '../services'

const repr = new RepresentationService
const getWorkerList = ({ params = null, additional = false, role = null, signal = null }) => {
    if (role === "Contr") {
        return repr.displayDeleteList('workers', params, additional, signal)
    }
    else {
        return repr.displaySimpleList('workers', params, additional, signal)
    }
}

export {
    getWorkerList
}