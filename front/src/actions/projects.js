import { RepresentationService } from '../services'

const repr = new RepresentationService
const getProjectList = (role, signal = null) => {
    if (role === "CliAdm") {
        return repr.displayDeleteListWithoutStatus('projects', null, false, signal);
    } else {
        return repr.displaySimpleListWithoutStatus('projects', null, false, signal);
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