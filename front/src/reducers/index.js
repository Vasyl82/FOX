const initialState = {
  language: "en-en",
  sidebarShow: "responsive",
  currentUser: {},
  loginError: false,
  registerError: false,
  registerAllowed: true,
  registrationToken: "",
  errorMessage: "",
  sidebar: [],
  headerNav: [],
  entityListTable: {},
  additionalEntityListTable: {},
  projectId: "",
  notifications: [],
  modal: {},
  submitting: false,
  projectDocs: [],
  invalidFilesNames: []
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    case "ALLOW_REGISTER":
      return { ...state, ...rest };
    case "FORBID_REGISTER":
      return { ...state, ...rest };
    case "REGISTER_USER":
      return { ...state, ...rest };
    case "LOGIN_USER":
      return { ...state, ...rest };
    case "LOGOUT_USER":
      return { ...state, currentUser: {} };
    case "LOGIN_ERROR":
      return { ...state, ...rest };
    case "REGISTER_ERROR":
      return { ...state, ...rest };
    case "INITIATE_DASHBOARD":
      return { ...state, ...rest };
    case "POPULATE_ENTITY_TABLE":
      return { ...state, ...rest };
    case "CLEAR_ENTITY_TABLE":
      return { ...state, entityListTable: {} };
    case "POPULATE_ADDITIONAL_ENTITY_TABLE":
      return { ...state, ...rest };
    case "SET_PROJECT_ID":
      return { ...state, ...rest };
    case "REFRESH_NOTIFICATION_LIST":
      return { ...state, ...rest };
    case "READ_NOTIFICATION":
      const newNotifications = [...state.notifications];
      newNotifications[
        newNotifications.findIndex(
          (element) => element.id === rest.notification.id
        )
      ] = rest.notification;
      return { ...state, notifications: newNotifications };
    case "UPDATE_MODAL":
      return { ...state, ...rest };
    case "UPDATE_SUBMIT":
      const { submitting } = state;
      return { ...state, submitting: !submitting };
    case "UPDATE_DOCUMENT":
      const newDocs = [...state.projectDocs];
      const searchIndex = newDocs.findIndex(
        (element) => element.id === rest.docInfo.id
      );
      searchIndex < 0 ? null : newDocs.splice(searchIndex, 1, rest.docInfo);
      return { ...state, projectDocs: newDocs };
    case "DELETE_DOCUMENT":
      const newDeleteDocs = [...state.projectDocs];
      const docToDelete = newDeleteDocs.splice(
        newDeleteDocs.findIndex((element) => element.name === rest.name),
        1
      )[0];
      if (docToDelete.id) {
        docToDelete.backend_action = "deleteEntityOf";
        newDeleteDocs.push(docToDelete);
      }
      return { ...state, projectDocs: newDeleteDocs };
    case "DELETE_DOCUMENTS_FROM_STORE":
      return { ...state, projectDocs: [] };
    case "ADD_ALL_DOCUMENTS_TO_STORE":
      const actualDocs = [...state.projectDocs];
      const incomeDocs = [...rest.projectDocs];
      incomeDocs.forEach((incomeDoc) => {
        const docIndex = actualDocs.findIndex(
          (actualDoc) => actualDoc.name === incomeDoc.name
        );
        if (docIndex < 0) {
          incomeDoc.backend_action = "createEntityWithFile";
          actualDocs.push(incomeDoc);
        } else if (actualDocs[docIndex].id) {
          incomeDoc.backend_action = "patchEntityWithFiles";
          actualDocs[docIndex] = { ...actualDocs[docIndex], ...incomeDoc };
        } else {
          incomeDoc.backend_action = "createEntityWithFiles";
          actualDocs[docIndex] = incomeDoc;
        }
      });
      return { ...state, projectDocs: actualDocs };
    case "ADD_ALL_DOCUMENTS_FROM_BACKEND":
      return { ...state, ...rest };
    case "ADD_ALL_DOCUMENTS_INVALID_NAMES":
      return {...state, ...rest}
    default:
      return state;
  }
};

export default changeState;
