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
} from "@coreui/react";
import { FoxWorkersAssignTable } from "../../tables";
import SafetyDeclarationsCard from "./SafetyDeclarationsCard";
import { getHazardousWorks } from "./utils";

const FilledPTW = (props) => {
  const { workers, reference_id, status, id, ...project } = props.projectInfo;
  const involvedWorkers = workers
    ? props.workerList.filter((worker) => workers.includes(worker.id))
    : [];
  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <CCardTitle>Permit To Work Review</CCardTitle>
          </CCol>
          <CCol className="ml-auto" xs="auto">
            <strong>Project Status: </strong>
            <CBadge size="lg" color="success">
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
            <strong>Applicant name:</strong>
          </CCol>
          <CCol xs="6" md="4" className="mb-3">
            <CCardText>{project.applicant_name}</CCardText>
          </CCol>
          <CCol xs="6" md="2" className="mb-3">
            <strong>Applicant Tel No:</strong>
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
          <CCol xs="6" md="2">
            <strong>Type of Work: </strong>
          </CCol>
          <CCol>
            <div className="filled-ptw__hazardous-works">
              {getHazardousWorks(project)}
            </div>
          </CCol>
        </CRow>
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
                requirement of this application to work and strictly comply with
                the company’s rules and regulation as well as Malaysia’s OSHA
                Act 1994. Intolerable risk subjected to{" "}
                <strong>
                  any violation of this application’s requirement may cause work
                  process being stopped.
                </strong>
              </em>
            </CCardText>
            <CRow>
              <CCol className="ml-auto mr-3" xs="6" md="3" lg="2">
                <CCardText>Signature:</CCardText>
                {project.signature ? (
                  <CImg
                    src={window.URL.createObjectURL(project.signature)}
                    width="80%"
                    // height="auto"
                    className="mb-2"
                    fluid
                  />
                ) : (
                  "No signature attached"
                )}
                <CRow>
                  <CCol>
                    <strong>Name: </strong> {project.applicant_name}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <strong>Date: </strong>
                    {new Date(project.submit_date).toLocaleDateString()}
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

const mapStateToProps = (state) => ({
  workerList: state.entityListTable.tableData,
});

FilledPTW.defaultProps = {
  workerList: [],
};

export default connect(mapStateToProps, null)(FilledPTW);
