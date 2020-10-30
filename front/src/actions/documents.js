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

const addNewDocument = (document) => {
  return dispatch => dispatch(_updateDocument(document))
}

const deleteDocument = (docId) => {
  return dispatch => dispatch(_deleteDocument(docId))

}

const _updateDocument = docInfo => ({
  type: "UPDATE_DOCUMENT",
  docInfo: docInfo
})

const _deleteDocument = (docId) => ({
  type: "DELETE_DOCUMENT",
  docId: docId
})

export {
  getDocumentList,
  addNewDocument,
  deleteDocument
}
