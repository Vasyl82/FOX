const changeSubmitState = () => {
    return dispatch => {
        dispatch(updateSubmit())
    }
}

const updateSubmit = () => ({
    type: "UPDATE_SUBMIT"
})

export { changeSubmitState }