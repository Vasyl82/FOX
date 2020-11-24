from django.urls import path
from . import views

# from rest_framework_jwt.views import obtain_jwt_token
from django_rest_passwordreset.views import (
    reset_password_request_token,
    reset_password_confirm,
    reset_password_validate_token,
)

urlpatterns = [
    path("token-auth/", views.ObtainFoxJWTToken.as_view(), name="login"),
    path("current_user/", views.current_user),
    path("users/", views.UserList.as_view()),
    path(
        r"validate_register_token/",
        reset_password_validate_token,
        name="reset-password-validate",
    ),
    path(
        r"password_reset_confirm/",
        reset_password_confirm,
        name="reset-password-confirm",
    ),
    path(
        r"password_reset/", reset_password_request_token, name="reset-password-request"
    ),
    path("projects/", views.ProjectList.as_view()),
    path("projects/new/", views.ProjectCreate.as_view(), name="project-create"),
    path("projects/<int:pk>/", views.ProjectDetail.as_view()),
    path("projects/<int:pk>/workflow/submit_proposal/", views.ProposalSubmit.as_view()),
    path("managers/", views.ClientManagerList.as_view()),
    path("managers/new/", views.ClientManagerCreate.as_view()),
    path("managers/<int:pk>/", views.ClientManagerDetail.as_view()),
    path("contractors/", views.ContractorList.as_view()),
    path("contractors/new/", views.ContractorCreate.as_view()),
    path("contractors/<int:pk>/", views.ContractorDetail.as_view()),
    path("workers/", views.WorkerList.as_view()),
    path("workers/new/", views.WorkerCreate.as_view()),
    path("workers/<int:pk>/", views.WorkerDetail.as_view()),
    path(
        "workers/download_doc/<int:pk>/<str:doctype>/",
        views.WorkerDocDownload.as_view(),
    ),
    path("ptw/<int:pk>", views.ptw),
    path("documents/", views.DocumentList.as_view()),
    path("documents/new/", views.DocumentCreate.as_view()),
    path("documents/predefined/", views.PredefinedDocumentCreate.as_view()),
    path("documents/<int:pk>/", views.DocumentDetail.as_view()),
    path("documents/downloads/<int:pk>/", views.DocumentDownload.as_view()),
    path(
        "documents/downloads/filled/<int:pk>/",
        views.FilledDocumentFileDownload.as_view(),
    ),
    path(
        "documents/display/permission/<int:pk>/",
        views.DocumentDisplayPermission.as_view(),
    ),
    path(
        "documents/display/<str:part1>/<str:part2>/<str:part3>/",
        views.download_file_to_display,
    ),
    path("worker_special_competencies/", views.WorkerSpecialCompetencyList.as_view()),
    path(
        "worker_special_competencies/new/",
        views.WorkerSpecialCompetencyCreate.as_view(),
    ),
    path(
        "worker_special_competencies/<int:pk>/",
        views.WorkerSpecialCompetencyDetail.as_view(),
    ),
    path(
        "worker_special_competencies/downloads/<int:pk>/",
        views.WorkerSpecialCompetencyDownload.as_view(),
    ),
    path("approvals/", views.ApprovalList.as_view()),
    path("approvals/<int:pk>/", views.ApprovalDetail.as_view()),
    path("safety_templates/<int:pk>/", views.CompanyDocUpload.as_view()),
    path("download_template/<str:doctype>/", views.CompanyDocDownload.as_view()),
    path("activities/", views.ActivityList.as_view()),
    path("notifications/", views.NotificationList.as_view()),
    path("notifications/<int:pk>/", views.NotificationUpdate.as_view()),
    path(
        "permits/verification/<str:part1>/<str:part2>/<str:part3>/",
        views.PermitVerification.as_view(),
    ),
    path("templates/", views.TemplateListView.as_view()),
    path("templates/<int:pk>/", views.SingleTemplateView.as_view()),
    path("templates/new/", views.TemplateCreateView.as_view()),
]
