const initialState = {
    language: "en-en",
    sidebarShow: 'responsive',
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
    projectDocs: []

}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest };
        case 'ALLOW_REGISTER':
            return { ...state, ...rest };
        case 'FORBID_REGISTER':
            return { ...state, ...rest };
        case 'REGISTER_USER':
            return { ...state, ...rest };
        case 'LOGIN_USER':
            return { ...state, ...rest };
        case 'LOGOUT_USER':
            return { ...state, currentUser: {} };
        case 'LOGIN_ERROR':
            return { ...state, ...rest };
        case 'REGISTER_ERROR':
            return { ...state, ...rest };
        case 'INITIATE_DASHBOARD':
            return { ...state, ...rest };
        case 'POPULATE_ENTITY_TABLE':
            return { ...state, ...rest };
        case 'CLEAR_ENTITY_TABLE':
            return { ...state, entityListTable: {} };
        case 'POPULATE_ADDITIONAL_ENTITY_TABLE':
            return { ...state, ...rest };
        case 'SET_PROJECT_ID':
            return { ...state, ...rest };
        case 'REFRESH_NOTIFICATION_LIST':
            return { ...state, ...rest };
        case 'READ_NOTIFICATION':
            const newNotifications = [...state.notifications]
            newNotifications[newNotifications.findIndex(element => element.id === rest.notification.id)] = rest.notification;
            return { ...state, notifications: newNotifications };
        case 'UPDATE_MODAL':
            return { ...state, ...rest };
        case 'UPDATE_SUBMIT':
            const { submitting } = state
            return { ...state, submitting: !submitting }

        default:
            return state;
    }
}

export default changeState
