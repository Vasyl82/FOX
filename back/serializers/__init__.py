from .auth_serializer import UserSerializer, UserSerializerWithToken  # noqa F401
from .dashboard import DashboardSerializer  # noqa F401
from .project import ProjectSerializer, ProjectListSerializer  # noqa F401
from .client_manager import (  # noqa F401
    ClientManagerSerializer,
    ClientManagerListSerializer,
)
from .contractor import ContractorSerializer, ContractorListSerializer  # noqa F401
from .worker import WorkerListSerializer, WorkerSerializer  # noqa F401
from .document import DocumentListSerializer, DocumentSerializer  # noqa F401
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
