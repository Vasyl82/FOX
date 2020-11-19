import React from "react";
const ProjectList = React.lazy(() => import("./views/projects/ProjectList"));
const ApprovalList = React.lazy(() => import("./views/approvals/ApprovalList"));
const ApprovalDetail = React.lazy(() =>
  import("./views/approvals/ApprovalDetail")
);
const ContractorList = React.lazy(() =>
  import("./views/contractors/ContractorList")
);
const CurrentWorksList = React.lazy(() =>
  import("./views/current_works/CurrentWorksList")
);
const ClientManagerList = React.lazy(() =>
  import("./views/managers/ClientManagerList")
);
const ClientManagerCreate = React.lazy(() =>
  import("./views/managers/ClientManagerCreate")
);
const ClientManagerDetail = React.lazy(() =>
  import("./views/managers/ClientManagerDetail")
);
const ClientManagerEdit = React.lazy(() =>
  import("./views/managers/ClientManagerEdit")
);
const WorkerList = React.lazy(() => import("./views/workers/WorkerList"));
const WorkerCreate = React.lazy(() => import("./views/workers/WorkerCreate"));
const WorkerDetail = React.lazy(() => import("./views/workers/WorkerDetail"));
const ProjectCreate = React.lazy(() =>
  import("./views/projects/ProjectCreate")
);
const ProjectDetail = React.lazy(() =>
  import("./views/projects/ProjectDetail")
);
const ProjectEdit = React.lazy(() => import("./views/projects/ProjectEdit"));

const ProjectPTW = React.lazy(() => import("./views/ptw/ProjectPTW"));
const ProjectUploadDocs = React.lazy(() =>
  import("./views/projects/ProjectUploadDocs")
);
const ContractorCreate = React.lazy(() =>
  import("./views/contractors/ContractorCreate")
);
const ContractorDetail = React.lazy(() =>
  import("./views/contractors/ContractorDetail")
);
const ContractorEdit = React.lazy(() =>
  import("./views/contractors/ContractorEdit")
);
const ContractorWorkersReview = React.lazy(() =>
  import("./views/workers/ContractorWorkersReview")
);
const DocumentList = React.lazy(() => import("./views/documents/DocumentList"));
const DocumentCreate = React.lazy(() =>
  import("./views/documents/DocumentCreate")
);
const DocumentDetail = React.lazy(() =>
  import("./views/documents/DocumentDetail")
);
const SafetyVideo = React.lazy(() => import("./views/safety/Video"));
const SafetyPresets = React.lazy(() => import("./views/safety/SafetyPresets"));
const WorkersAssign = React.lazy(() => import("./views/workers/Assign"));
const CompanyDocuments = React.lazy(() =>
  import("./views/company/CompanyDocuments")
);
const ProposalSubmit = React.lazy(() =>
  import("./views/projects/ProposalSubmit")
);
const SpecialCompetencyList = React.lazy(() =>
  import("./views/special_competencies/SpecialCompetencyList")
);
const SpecialCompetencyCreate = React.lazy(() =>
  import("./views/special_competencies/SpecialCompetencyCreate")
);
const SpecialCompetencyDetail = React.lazy(() =>
  import("./views/special_competencies/SpecialCompetencyDetail")
);

const routes = [
  { path: "/", exact: true, name: "Fox" },
  { path: "/projects", name: "Projects", component: ProjectList, exact: true },
  { path: "/projects/new", name: "New", component: ProjectCreate, exact: true },
  {
    path: "/projects/:id/ptw",
    name: "PTW",
    component: ProjectPTW,
    exact: true,
  },
  {
    path: "/projects/:id/documents",
    name: "Documents",
    component: DocumentList,
    exact: true,
  },
  {
    path: "/projects/:id/documents/new",
    name: "New",
    component: DocumentCreate,
    exact: false,
  },
  {
    path: "/projects/:id/documents/:doc_id",
    name: "Document Details",
    component: DocumentDetail,
    exact: false,
  },
  {
    path: "/safety/presets",
    name: "Safety Presets",
    component: SafetyPresets,
    exact: true,
  },
  {
    path: "/safety/video",
    name: "Safety Video",
    component: SafetyVideo,
    exact: true,
  },
  {
    path: "/projects/:id/assign_workers",
    name: "Assign Workers",
    component: WorkersAssign,
    exact: true,
  },
  {
    path: "/projects/:id/submit_proposal",
    name: "Submit Proposal",
    component: ProposalSubmit,
    exact: true,
  },
  {
    path: "/projects/:id/related_documents",
    name: "Related Documents",
    component: ProjectUploadDocs,
    exact: true,
  },
  {
    path: "/projects/:id/edit",
    name: "Edit Project",
    component: ProjectEdit,
    exact: true,
  },
  {
    path: "/projects/:id",
    name: "Project Details",
    component: ProjectDetail,
    exact: false,
  },
  {
    path: "/approvals",
    name: "Approvals",
    component: ApprovalList,
    exact: true,
  },
  {
    path: "/documents",
    name: "Documents",
    component: CompanyDocuments,
    exact: true,
  },
  {
    path: "/approvals/:id",
    name: "Approval Details",
    component: ApprovalDetail,
    exact: true,
  },
  {
    path: "/current-works",
    name: "Current Works",
    component: CurrentWorksList,
    exact: true,
  },
  {
    path: "/contractors",
    name: "Contractors",
    component: ContractorList,
    exact: true,
  },
  {
    path: "/contractors/new",
    name: "New",
    component: ContractorCreate,
    exact: true,
  },
  {
    path: "/contractors/:id",
    name: "Contractor Details",
    component: ContractorDetail,
    exact: true,
  },
  {
    path: "/contractors/:id/edit",
    name: "Contractor Edition",
    component: ContractorEdit,
    exact: true,
  },
  {
    path: "/contractors/:id/workers_review",
    name: "Workers Review",
    component: ContractorWorkersReview,
    exact: true,
  },
  {
    path: "/managers",
    name: "Managers",
    component: ClientManagerList,
    exact: true,
  },
  {
    path: "/managers/new",
    name: "New",
    component: ClientManagerCreate,
    exact: true,
  },
  {
    path: "/managers/:id",
    name: "Manager Details",
    component: ClientManagerDetail,
    exact: true,
  },
  {
    path: "/managers/:id/edit",
    name: "Manager Edition",
    component: ClientManagerEdit,
    exact: true,
  },
  { path: "/workers", name: "Workers", component: WorkerList, exact: true },
  { path: "/workers/new", name: "New", component: WorkerCreate, exact: true },
  {
    path: "/workers/:id",
    name: "Worker Details",
    component: WorkerDetail,
    exact: true,
  },
  {
    path: "/workers/:id/competencies",
    name: "Spec. Competencies",
    component: SpecialCompetencyList,
    exact: true,
  },
  {
    path: "/workers/:id/competencies/new",
    name: "New Competency",
    component: SpecialCompetencyCreate,
    exact: true,
  },
  {
    path: "/workers/:id/competencies/:competency_id",
    name: "Competency Details",
    component: SpecialCompetencyDetail,
    exact: true,
  },
];

export default routes;
