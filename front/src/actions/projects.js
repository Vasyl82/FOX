import { RepresentationService } from '../services'

const repr = new RepresentationService
const getProjectList = ({ role = null, params = null, additional = false, signal = null }) => {
    if (role === "CliAdm") {
        return repr.displayDeleteListWithoutStatus('projects', params, additional, signal);
    } else {
        return repr.displaySimpleListWithoutStatus('projects', params, additional, signal);
    }

}

const setProjectId = (projectId) => {
    return dispatch => {
        dispatch(_setProjectId(projectId))
    }
}

const _setProjectId = (projectId) => ({
    type: 'SET_PROJECT_ID',
    projectId: projectId,
}
);

export {
    getProjectList, setProjectId
}