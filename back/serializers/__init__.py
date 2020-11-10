from .auth_serializer import (  # noqa F401
    UserSerializer,
    UserSerializerWithToken,
    FoxJSONWebTokenSerializer,
)
from .dashboard import DashboardSerializer  # noqa F401
from .project import ProjectSerializer, ProjectListSerializer  # noqa F401
from .client_manager import (  # noqa F401
    ClientManagerSerializer,
    ClientManagerListSerializer,
)
from .contractor import (  # noqa F401
    ContractorSerializer,
    ContractorListSerializer,
    # ContractorCreateSerializer,
)  # noqa F401
from .worker import WorkerListSerializer, WorkerSerializer  # noqa F401
from .document import (  # noqa F401
    DocumentListSerializer,
    DocumentSerializer,
    PredefinedDocumentSerializer,
)
from .worker_special_competency import (  # noqa F401
    WorkerSpecialCompetencyListSerializer,
    WorkerSpecialCompetencySerializer,
)
from .approval import ApprovalListSerializer, ApprovalSerializer  # noqa F401
from .company import CompanyDocsSerializer  # noqa F401
from .activity import ActivityListSerializer, ActivitySerializer  # noqa F401
from .notification import (  # noqa F401
    NotificationUpdateSerializer,
    NotificationListSerializer,
)
from .template import TemplateSerializer, TemplateListSerializer  # noqa F401
