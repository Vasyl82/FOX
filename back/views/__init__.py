from .login import (  # noqa F401
    current_user,
    UserList,
    ObtainFoxJWTToken,
)  # noqa F401
from .dashboard import Dashboard  # noqa F401
from .projects import ProjectList, ProjectCreate, ProjectDetail  # noqa F401
from .client_managers import (  # noqa F401
    ClientManagerList,
    ClientManagerDetail,
    ClientManagerCreate,
)  # noqa F401
from .contractors import (  # noqa F401
    ContractorList,
    ContractorDetail,
    ContractorCreate,
    ContractorSignature,
    # ContractorAddCompany,
)
from .workers import (  # noqa F401
    WorkerList,
    WorkerDetail,
    WorkerCreate,
    WorkerDocDownload,
)  # noqa F401
from .ptw import ptw  # noqa F401
from .documents import (  # noqa F401
    DocumentList,
    DocumentDetail,
    DocumentCreate,
    PredefinedDocumentCreate,
    DocumentDownload,
    DocumentDisplayPermission,
    download_file_to_display,
    FilledDocumentFileDownload
)  # noqa F401
from .worker_special_competencies import (  # noqa F401
    WorkerSpecialCompetencyList,
    WorkerSpecialCompetencyCreate,
    WorkerSpecialCompetencyDetail,
    WorkerSpecialCompetencyDownload,
)  # noqa F401
from .workflow import ProposalSubmit  # noqa F401
from .approvals import ApprovalList, ApprovalDetail  # noqa F401
from .company_doc_templates import CompanyDocUpload, CompanyDocDownload  # noqa F401
from .activities import ActivityList  # noqa F401
from .notifications import NotificationList, NotificationUpdate  # noqa F401
from .permits import PermitVerification  # noqa F401
from .template import (  # noqa F401
    TemplateListView,
    SingleTemplateView,
    TemplateCreateView,
)
