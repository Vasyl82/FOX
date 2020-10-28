import { RepresentationService } from '../services'


const repr = new RepresentationService();
const getApprovalList = ({ params = null, additional = false, signal = null }) => {
    return repr.displaySimpleList('approvals', params, additional, signal);
}

export {
    getApprovalList
}
