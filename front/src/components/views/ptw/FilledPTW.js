import React from "react";
import { connect } from "react-redux";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardText,
  CBadge,
  CImg,
  CFormText,
} from "@coreui/react";
import { FoxWorkersAssignTable } from "../../tables";
import { ActivityLog } from "../../activity_log";
import SafetyDeclarationsCard from "./SafetyDeclarationsCard";
import { getHazardousWorks } from "./utils";

const getBadge = (status) => {
  switch (status) {
    case "Created":
      return "secondary";
    case "Submitted":
      return "warning";
    case "Approved":
      return "success";
    case "Rejected":
      return "danger";
    case "Application processing":
      return "secondary";
    case "Ready to start":
      return "success";
    case "Started":
      return "info";
    case "Completed":
      return "warning";
    case "Extended":
      return "primary";
    case "Closed":
      return "dark";
    default:
      return "primary";
  }
};

const FilledPTW = (props) => {
  const { workers, reference_id, status, id, ...project } = props.projectInfo;
  const involvedWorkers = workers
    ? props.workerList.filter((worker) => workers.includes(worker.id))
    : [];
  return (
    <>
      <ActivityLog projectId={props.match.params.id} />
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <CCardTitle>Permit To Work Review</CCardTitle>
            </CCol>
            <CCol className="ml-auto" xs="auto">
              <strong>Project Status: </strong>
              <CBadge size="lg" color={getBadge(status)}>
                {status}
              </CBadge>
            </CCol>
            <CCol xs="auto">
              <strong>ID: </strong>
              {reference_id}
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="6" md="2" className="mb-3">
              <strong>Work Location:</strong>
            </CCol>
            <CCol xs="6" md="4" className="mb-3">
              <CCardText>{project.location}</CCardText>
            </CCol>
            <CCol xs="6" md="2" className="mb-3">
              <strong>Organization:</strong>
            </CCol>
            <CCol xs="6" md="4" className="mb-3">
              <CCardText>{project.organization}</CCardText>
            </CCol>
            <CCol xs="6" md="2" className="mb-3">
              <strong>Person in Charge name:</strong>
            </CCol>
            <CCol xs="6" md="4" className="mb-3">
              <CCardText>{project.applicant_name}</CCardText>
            </CCol>
            <CCol xs="6" md="2" className="mb-3">
              <strong>Person in Charge Tel No:</strong>
            </CCol>
            <CCol xs="6" md="4" className="mb-3">
              <CCardText>{project.applicant_phone}</CCardText>
            </CCol>
            <CCol xs="6" md="2" className="mb-3">
              <strong>Start date:</strong>
            </CCol>
            <CCol xs="6" md="4" className="mb-3">
              <CCardText>
                {new Date(project.start_date).toLocaleDateString()}
              </CCardText>
            </CCol>
            <CCol className="mb-3">
              <strong>End Date:</strong>
            </CCol>
            <CCol xs="6" md="4" className="mb-3">
              <CCardText>
                {new Date(project.end_date).toLocaleDateString()}
              </CCardText>
            </CCol>
          </CRow>
          <CRow>
          <CCol xs="6" md="2" className="xs-3">
              <strong>Extended date:</strong>
            </CCol>
            <CCol xs="6" md="4" className="mb-3">
              <CCardText>
                {project.extend_date ? new Date(project.extend_date).toLocaleDateString() : "The project is not extended yet."}
              </CCardText>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="6" md="2">
              <strong>Type of Work: </strong>
            </CCol>
            <CCol>
              <div className="filled-ptw__hazardous-works">
                {getHazardousWorks(project)}
              </div>
            </CCol>
          </CRow>
          {["Created", "Rejected"].includes(status) ? (
            <CRow alignHorizontal="center" className="pt-3 mb-3">
              <CCol xs="auto">
                <strong>
                  The contractor hasn't applied for this project yet
                </strong>
              </CCol>
            </CRow>
          ) : (
            <>
              <CRow>
                <CCol>
                  <FoxWorkersAssignTable
                    items={involvedWorkers}
                    projectInfo={{ ...project }}
                    noCheckBoxes
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <SafetyDeclarationsCard />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CCardText>
                    <em>
                      I certify that I understand and will comply with all the
                      requirement of this application to work and strictly
                      comply with the company’s rules and regulation as well as
                      Malaysia’s OSHA Act 1994. Intolerable risk subjected to{" "}
                      <strong>
                        any violation of this application’s requirement may
                        cause work process being stopped.
                      </strong>
                    </em>
                  </CCardText>
                </CCol>
              </CRow>
            </>
          )}
          <CRow form className="pt-3">
            <CCol md="6" lg="4">
              <CCardText>
                <strong>Issued by:</strong>
              </CCardText>
              <div className="ptw-signatures">{project.issued_by.name}</div>
              <CFormText>{project.issued_by.email}</CFormText>
              <CFormText>{project.creation_date.date}</CFormText>
              <CFormText>{project.creation_date.time}</CFormText>
            </CCol>
            <CCol md="6" lg="4">
              <CCardText>
                <strong>Approved by:</strong>
              </CCardText>
              {project.approved_by.length > 0 ? (
                project.approved_by.map((approve) => (
                  <>
                    <div className="ptw-signatures">{approve.name}</div>
                    <CFormText>{approve.position}</CFormText>
                    <CFormText>{approve.email}</CFormText>
                    <CFormText>{approve.last_resolved_date}</CFormText>
                    <CFormText>{approve.last_resolved_time}</CFormText>
                    <div className="mb-3"></div>
                  </>
                 ))
              ) : (
                <div>No managers have approved this project yet.</div>
              )}
            </CCol>
            <CCol md="6" lg="4">
              <CCardText>
                <strong>Submitted by:</strong>
              </CCardText>
              { project.submitted_by ?
               <>
                <div className="ptw-signatures">{project.submitted_by.name}</div>
                <CFormText>{project.submitted_by.email}</CFormText>
                <CFormText>{project.submitted_by.position}</CFormText>
                <CFormText>{project.submitted_by.phone}</CFormText>
                <CFormText>{project.submitted_by.submitted_date}</CFormText>
                <CFormText>{project.submitted_by.submitted_time}</CFormText>
              </>
             :  <div>The contractor has not submitted the PTW.</div>
            }
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

const mapStateToProps = (state) => ({
  workerList: state.entityListTable.tableData,
});

FilledPTW.defaultProps = {
  workerList: [],
};

export default connect(mapStateToProps, null)(FilledPTW);
