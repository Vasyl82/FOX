const updateModal = ({ modalType, ...params }) => {
    return dispatch => {
        dispatch(updateModalState({ modalType, ...params }))
    }
}

const updateModalState = (modal) => {
    return {
        type: "UPDATE_MODAL",
        modal: modal
    }
}

export { updateModal }