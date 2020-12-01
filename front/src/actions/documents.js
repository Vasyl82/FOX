import { RepresentationService, FoxApiService } from "../services";

const foxApi = new FoxApiService();

const repr = new RepresentationService();

const getDocumentList = ({
  params = null,
  additional = false,
  role = null,
  signal = null,
}) => {
  if (role === "CliAdm") {
    return repr.displayDeleteList("documents", params, additional, signal);
  } else {
    return repr.displaySimpleList("documents", params, additional, signal);
  }
};

const getDocuments = ({ signal = null, params = null, additional = null }) => {
  return async (dispatch) => {
    await foxApi
      .getEntityList("documents", params, signal)
      .then((documents) => {
        if (documents.length > 0) {
          dispatch(_addAllDocumentsFromBackend(documents));
          return Promise.resolve("Got some docs");
        }
      });
  };
};

const putAllDocumentsToStore = (documents) => {
  return (dispatch) => dispatch(_addAllDocumentsToStore(documents));
};

const addNewDocument = (document) => {
  return (dispatch) => dispatch(_updateDocument(document));
};

const updateDocument = (document) => {
  return (dispatch) => dispatch(_updateDocument(document));
};

const deleteDocument = (name) => {
  return (dispatch) => dispatch(_deleteDocument(name));
};

const deleteDocumentsFromStore = (allDocuments) => {
  return (dispatch) => dispatch(_deleteDocumentsFromStore(allDocuments));
};

const putAllDocumentsInvalidNamesToStore = (allInvalidDocsNames) => {
  return (dispatch) => dispatch(_addInvalidDocsNames(allInvalidDocsNames));
};

const _addInvalidDocsNames = (invalidFilesNames) => ({
  type: "ADD_ALL_DOCUMENTS_INVALID_NAMES",
  invalidFilesNames,
})

const _updateDocument = (docInfo) => ({
  type: "UPDATE_DOCUMENT",
  docInfo: docInfo,
});

const _deleteDocument = (name) => ({
  type: "DELETE_DOCUMENT",
  name: name,
});

const _addAllDocumentsToStore = (documents) => ({
  type: "ADD_ALL_DOCUMENTS_TO_STORE",
  projectDocs: documents,
});

const _addAllDocumentsFromBackend = (documents) => ({
  type: "ADD_ALL_DOCUMENTS_FROM_BACKEND",
  projectDocs: documents,
});

const _deleteDocumentsFromStore = () => ({
  type: "DELETE_DOCUMENTS_FROM_STORE",
});

export {
  getDocumentList,
  getDocuments,
  addNewDocument,
  deleteDocument,
  deleteDocumentsFromStore,
  putAllDocumentsToStore,
  updateDocument,
  putAllDocumentsInvalidNamesToStore,
};
