import React, { Component } from "react";
import { connect } from "react-redux";
import DjangoCSRFToken from "django-react-csrftoken";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardSubtitle,
  CCardFooter,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CButton,
  CTextarea,
  CCardText,
} from "@coreui/react";
import { FoxWorkersAssignTable } from "../../tables";
import { WithLoadingSpinner, SubmitSpinner } from "../../loadings";
import { FoxApiService, ProjectWorkflowService } from "../../../services";
import { handleError } from "../../errors";
import { FoxReactSelectFormGroup } from "../../forms";
import SafetyDeclarationsCard from "./SafetyDeclarationsCard";
import { getHazardousWorks } from "./utils";

const foxApi = new FoxApiService();
const workflow = new ProjectWorkflowService();

class PTWToBeSubmitted extends Component {
  state = {
    ...this.props.projectInfo,
    error: false
  };

  setWorkersOptions = () => {
    const options = [{ value: "", label: "Choose Person in Charge" }];
    this.props.workerList
      ? this.props.workerList.forEach((worker) =>
          options.push({ value: worker.id, label: worker.name })
        )
      : null;
    return options;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    const assignedWorkers = [...this.state.workers];
    const incomingWorker = parseInt(event.target.name);
    assignedWorkers.includes(incomingWorker)
      ? assignedWorkers.splice(assignedWorkers.indexOf(incomingWorker), 1)
      : assignedWorkers.push(incomingWorker);
    this.setState({
      workers: assignedWorkers,
    });
  };

  handleCheckAll = () => {
    const workersIds = this.props.workerList.map((worker) => worker.id);
    JSON.stringify(this.state.workers) === JSON.stringify(workersIds)
      ? this.setState({
          workers: [],
        })
      : this.setState({
          workers: workersIds,
        });
  };

  handleReactSelect = (option, event) => {
    this.setState({
      [event.name]: option.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.changeSubmitState();
    if (!this.state.responsible_person) {
      this.setState({
        error: 'Person in charge was not selected! Please, choose person in charge from the list'
      }, this.props.changeSubmitState())
    } else {

      const { responsible_person, workers, id } = this.state;
      const submit_date = new Date();
      await foxApi
        .patchEntityOf("projects", id, {
          responsible_person,
          workers,
          submit_date: submit_date.toISOString(),
        })
        .then(() => workflow.submitProposal(id))
        .then(() => this.props.history.push(`/projects/${id}`))
        .catch((error) => {
          const errors = handleError({
            error: error,
            validationFields: ["applicant_name", "applicant_phone", "workers"],
            operation: "Application submit",
          });
          this.setState({
            error: errors,
          });
        })
        .finally(this.props.changeSubmitState);
  }};

  render = () => {
    const { ...project } = { ...this.state };
    return (
      <CRow>
        <CCol>
          <CCard>
            <WithLoadingSpinner loading={this.props.loading}>
              <CCardHeader>
                <CRow>
                  <CCol>
                    <CCardTitle>PTW Form</CCardTitle>
                    <CCardSubtitle>
                      Please, fill in this form to submit proposal for this
                      project
                    </CCardSubtitle>
                  </CCol>
                  <CCol sm="auto">
                    <CInput
                      readOnly
                      disabled
                      value={`ID: ${project.reference_id}`}
                    />
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.handleSubmit} id="proposal-form">
                  <DjangoCSRFToken />
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel htmlFor="work_location">Work location</CLabel>
                      <CInput
                        id="location"
                        name="location"
                        value={project.location}
                        disabled={this.props.submitting}
                        readOnly
                      />
                    </CCol>
                    <CCol md="6">
                      <CLabel htmlFor="organization">Organization</CLabel>
                      <CInput
                        id="organization"
                        name="organization"
                        value={project.organization}
                        disabled={this.props.submitting}
                        readOnly
                      />
                    </CCol>
                  </CFormGroup>
                  <CLabel htmlFor="organization">Person in Charge</CLabel>
                  <FoxReactSelectFormGroup
                    placeholder="Choose Person in Charge"
                    options={this.setWorkersOptions()}
                    inputInfo="responsible_person"
                    inputValue={this.state.responsible_person}
                    handleChange={this.handleReactSelect}
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  <CFormGroup row>
                    <CCol md="6">
                      <CLabel htmlFor="start_date">Start Date</CLabel>
                      <CInput
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        onChange={this.handleChange}
                        value={project.start_date}
                        disabled={this.props.submitting}
                        readOnly
                      />
                    </CCol>
                    <CCol md="6">
                      <CLabel htmlFor="end_date">End Date</CLabel>
                      <CInput
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        onChange={this.handleChange}
                        value={project.end_date}
                        disabled={this.props.submitting}
                        readOnly
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Hazardous Works:</CLabel>
                    <CTextarea
                      type="text-area"
                      id="hazardous_works"
                      name="hazardous_works"
                      value={getHazardousWorks(project)}
                      disabled={this.props.submitting}
                      readOnly
                    ></CTextarea>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Activity / Process:</CLabel>
                    <CTextarea
                      type="text-area"
                      id="description"
                      name="description"
                      value={project.description}
                      disabled
                      readOnly
                    ></CTextarea>
                  </CFormGroup>
                  <FoxWorkersAssignTable
                    items={this.props.workerList}
                    projectInfo={{ ...project }}
                    workers={project ? [...project.workers] : []}
                    handleCheck={this.handleCheck}
                    handleCheckAll={this.handleCheckAll}
                    allChecked={
                      this.props.workerList & project
                        ? JSON.stringify(
                            this.props.workerList.map((worker) => worker.id)
                          ) === JSON.stringify(project.workers)
                        : false
                    }
                    {...this.props}
                  />
                </CForm>
                <SafetyDeclarationsCard />
              </CCardBody>
              <CCardFooter>
                <CCardText>
                  I certify that I understand and will comply with all the
                  requirement of this application to work and strictly comply
                  with the company’s rules and regulation as well as Malaysia’s
                  OSHA Act 1994. Intolerable risk subjected to{" "}
                  <strong>
                    any violation of this application’s requirement may cause
                    work process being stopped.
                  </strong>
                </CCardText>
                <CButton
                  form="proposal-form"
                  type="submit"
                  disabled={this.props.submitting || !project.responsible_person || project.workers.length < 1}
                  shape="pill"
                  type="submit"
                  color="dark"
                  variant="outline"
                  block
                >
                  <SubmitSpinner submitting={this.props.submitting} />
                  Submit proposal
                </CButton>
                {this.state.error ? <p>{this.state.error}</p> : null}
              </CCardFooter>
            </WithLoadingSpinner>
          </CCard>
        </CCol>
      </CRow>
    );
  };
}

const mapStateToProps = (state) => ({
  workerList: state.entityListTable.tableData,
});

export default connect(mapStateToProps, null)(PTWToBeSubmitted);
