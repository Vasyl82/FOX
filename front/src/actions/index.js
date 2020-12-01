import {
  userLoginFetch,
  getProfileFetch,
  logoutUser,
  userRegisterFetch,
  userRegisterValidationFetch,
  registerError,
  allowRegistration,
} from "./auth";

import getDashboardLayout from "./dashboard";
import { getProjectList, setProjectId } from "./projects";
import { getClientManagerList } from "./client_managers";
import {
  getDocumentList,
  addNewDocument,
  updateDocument,
  deleteDocumentsFromStore,
  getDocuments,
  putAllDocumentsToStore,
  deleteDocument,
  putAllDocumentsInvalidNamesToStore,
} from "./documents";
import { getContractorList } from "./contractors";
import { getWorkerList } from "./workers";
import { getApprovalList } from "./approvals";
import { getSpecialCompetencyList } from "./special_competencies";
import {
  getNotifications,
  clearNotifications,
  readNotification,
} from "./notifications";
import { updateModal } from "./modals";
import {
  clearList,
  populateAdditionalEntityTable,
  populateEntityTable,
} from "./tables";
import { changeSubmitState } from "./submitions";

const userLoggedIn = () => {
  return {
    type: "user_logged_in",
  };
};

export {
  userLoggedIn,
  userLoginFetch,
  getProfileFetch,
  logoutUser,
  userRegisterFetch,
  userRegisterValidationFetch,
  registerError,
  allowRegistration,
  deleteDocumentsFromStore,
  getDashboardLayout,
  getProjectList,
  getClientManagerList,
  getDocumentList,
  addNewDocument,
  updateDocument,
  getContractorList,
  getDocuments,
  getWorkerList,
  setProjectId,
  getApprovalList,
  getSpecialCompetencyList,
  getNotifications,
  clearNotifications,
  readNotification,
  updateModal,
  clearList,
  putAllDocumentsToStore,
  putAllDocumentsInvalidNamesToStore,
  populateEntityTable,
  populateAdditionalEntityTable,
  changeSubmitState,
  deleteDocument,
};
