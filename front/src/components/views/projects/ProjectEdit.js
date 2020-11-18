import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import DjangoCSRFToken from "django-react-csrftoken";
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCol,
  CTextarea,
  CLink,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
} from "@coreui/react";
import {
  getProfileFetch,
  getContractorList,
  setProjectId,
  clearList,
  getDocuments,
} from "../../../actions";
import { FoxApiService } from "../../../services";
import { permitOptions } from "./optionsLists";
import { WithLoading, WithLoadingSpinner, SubmitSpinner } from "../../loadings";
import { FoxSwitchGroup, MultipleFileUploadButton } from "../../../utils";
import { DocumentWidget } from "../../widgets";
import { deleteDocumentsFromStore } from "../../../../src/actions/documents";
import { handleError } from "../../errors";

const foxApi = new FoxApiService();

class ProjectEdit extends Component {
  state = {
    name: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
    extend_date: "",
    company: this.props.company,
    contractor: "-1",
    work_at_height: false,
    lifting_work: false,
    confined_space: false,
    hot_work: false,
    chemical_handling: false,
    work_alone: false,
    work_at_sensitive_area: false,
    cold_work: false,
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (parseInt(this.state.contractor) < 0) {
      this.setState({
        error:
          "Contractor was not selected! Please, choose contractor form the list",
      });
    } else {
      this.props.changeSubmitState();
      this.formData = this.state;
      delete this.formData.error;
      await foxApi
        .patchEntityOf("projects", this.props.match.params.id, this.formData)
        .then(() => {
          const docsFromStore = [...this.props.docs];
          return Promise.all(
            docsFromStore.map((incomeDoc) => {
              const { backend_action, ...doc } = incomeDoc;
              doc.project = this.props.match.params.id;
              const formData = new FormData();
              if (backend_action !== "None") {
                Object.entries(doc).forEach(([key, value]) => {
                  formData.append(key, value);
                });
                if (doc.id) {
                  return foxApi[backend_action]("documents", doc.id, formData);
                }
                return foxApi[backend_action]("documents", formData);
              }
            })
          );
        })
        .then(() => {
          this.props.history.goBack();
        })
        .catch((error) => {
          const errors = handleError({
            error: error,
            operation: "Project update",
            validationFields: [
              "name",
              "location",
              "description",
              "start_date",
              "end_date",
              "company",
              "contractor",
              "work_at_height",
              "lifting_work",
              "confined_space",
              "hot_work",
              "chemical_handling",
              "work_alone",
              "work_at_sensitive_area",
              "cold_work",
              "file",
              "template",
              "url_to_doc",
            ],
          });
          this.setState({
            error: errors,
          });
        })
        .finally(() => this.props.changeSubmitState());
    }
  };

  componentDidMount = async () => {
    const projectId = this.props.match.params.id;
    this.props.setProjectId(projectId);
    await this.props
      .getProfileFetch()
      .then(() => foxApi.getDetailsOf("projects", projectId))
      .then((data) =>
        this.setState({ ...data }, async () => {
          this.props.getDocuments({
            params: { project_id: projectId },
            signal: this.abortController.signal,
          });
        })
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
    this.props.setProjectId("");
    this.props.deleteDocumentsFromStore();
  };

  abortController = new window.AbortController();

  render = () => {
    const docs = this.props.docs
      ? this.props.docs.filter((doc) => doc.backend_action !== "deleteEntityOf")
      : [];

    return (
      <CRow>
        <CCol>
          {this.props.role === "CliAdm" ? (
            <CCard>
              <CCardHeader>
                <CCardTitle>Project Details</CCardTitle>
              </CCardHeader>
              <CCardBody>
                <WithLoadingSpinner loading={this.props.loading}>
                  <CForm onSubmit={this.handleSubmit}>
                    <DjangoCSRFToken />
                    <CFormGroup>
                      <CLabel htmlFor="name">Name</CLabel>
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Enter project name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        readOnly={this.props.submitting}
                        disabled={this.props.submitting}
                        required
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="location">Location of works</CLabel>
                      <CInput
                        id="location "
                        name="location"
                        placeholder="Project Works Location"
                        value={this.state.location}
                        onChange={this.handleChange}
                        readOnly={this.props.submitting}
                        disabled={this.props.submitting}
                        required
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="description">Description</CLabel>
                      <CTextarea
                        id="descrption"
                        name="description"
                        placeholder="Please, enter short description of the project"
                        value={this.state.description}
                        onChange={this.handleChange}
                        disabled={this.props.submitting}
                        readOnly={this.props.submitting}
                        required
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CRow>
                        <CCol lg="6">
                          <CLabel htmlFor="start_date">Start Date</CLabel>
                          <CInput
                            type="datetime-local"
                            id="start_date"
                            name="start_date"
                            value={this.state.start_date}
                            onChange={this.handleChange}
                            disabled={this.props.submitting}
                            readOnly={this.props.submitting}
                            required
                          />
                        </CCol>
                        <CCol lg="6">
                          <CLabel htmlFor="end_date">End Date</CLabel>
                          <CInput
                            type="datetime-local"
                            id="end_date"
                            name="end_date"
                            value={this.state.end_date}
                            onChange={this.handleChange}
                            disabled={this.props.submitting}
                            readOnly={this.props.submitting}
                            required
                          />
                        </CCol>
                      </CRow>
                    </CFormGroup>
                    <div className="mb-3">
                      <strong>Contractor: </strong>
                      {this.state.contractor_name}
                    </div>
                    {/* <CFormGroup> */}
                    {/* <CLink
                        className="btn btn-outline-dark mr-3"
                        to={`${this.props.match.url}/ptw`}
                      >
                        See Permission To Work
                      </CLink> */}
                    {/* </CFormGroup> */}
                    <FoxSwitchGroup
                      groupLabel="Choose the related hazardous work
                  from the list below:"
                      options={permitOptions}
                      handleCheck={this.handleCheck}
                      parentState={this.state}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                    />
                    <div className="mb-2 ">
                      <strong>Add documents to this project:</strong>
                    </div>
                    <MultipleFileUploadButton />
                    <div className="mb-2 ">
                      <strong>Attached documents:</strong>
                    </div>
                    <CRow>
                      {docs.map((doc, idx) => (
                        <DocumentWidget key={idx} doc={doc} />
                      ))}
                    </CRow>

                    <CButton
                      disabled={this.props.submitting}
                      shape="pill"
                      type="submit"
                      color="dark"
                      variant="outline"
                      block
                    >
                      <SubmitSpinner submitting={this.props.submitting} />
                      Save changes
                    </CButton>
                    {this.state.error ? (
                      <p className="fox-form-invalid-feedback">
                        {this.state.error}
                      </p>
                    ) : null}
                  </CForm>
                </WithLoadingSpinner>
              </CCardBody>
            </CCard>
          ) : (
            <Redirect to="/" />
          )}
        </CCol>
      </CRow>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    company: state.currentUser.company,
    options: state.entityListTable.tableData,
    role: state.currentUser.role,
    docs: state.projectDocs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getContractorList: async ({ ...kwargs }) =>
    await dispatch(getContractorList({ ...kwargs })),
  setProjectId: (id) => dispatch(setProjectId(id)),
  clearList: () => dispatch(clearList()),
  getDocuments: async ({ ...kwargs }) =>
    await dispatch(getDocuments({ ...kwargs })),
  deleteDocumentsFromStore: () => dispatch(deleteDocumentsFromStore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ProjectEdit));
