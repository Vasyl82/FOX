import { RepresentationService } from '../services'

const repr = new RepresentationService
const getDocumentList = ({ params = null, additional = false, role = null, signal = null }) => {
  if (role === "CliAdm") {
    return repr.displayDeleteList('documents', params, additional, signal)
  }
  else {
    return repr.displaySimpleList('documents', params, additional, signal)
  }
}

export {
  getDocumentList
}
