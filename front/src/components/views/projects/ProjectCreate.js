import React, { Component } from "react";
import {
  getProfileFetch,
  getContractorList,
  clearList,
} from "../../../actions";

import { connect } from "react-redux";
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCol,
  CContainer,
  CTextarea,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
} from "@coreui/react";
import DjangoCSRFToken from "django-react-csrftoken";
import { FoxApiService } from "../../../services";
import { FoxSwitchGroup, MultipleFileUploadButton } from "../../../utils";
import { FoxReactSelectFormGroup } from "../../forms";
import { permitOptions } from "./optionsLists";
import { WithLoadingSpinner, WithLoading, SubmitSpinner } from "../../loadings";
import { deleteDocumentsFromStore } from "../../../../src/actions/documents";
import { DocumentWidget } from "../../widgets";
import { handleError } from "../../errors";

const foxApi = new FoxApiService();

class ProjectCreate extends Component {
  state = {
    name: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
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

  handleFileUpload = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
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

  handleReactSelect = (option, event) => {
    this.setState({
      [event.name]: option.value,
    });
  };

  silenceSubmit = (event) => {
    event.preventDefault();
  };

  handleCreateProject = async () => {
    await this.handleSubmit()
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        const errors = handleError({
          error: error,
          operation: "Project creation",
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
      });
  };

  handleSubmit = async () => {
    this.props.changeSubmitState();
    if (parseInt(this.state.contractor) < 0) {
      this.setState({
        error:
          "Contractor was not selected! Please, choose contractor form the list",
      });
      this.props.changeSubmitState();
    } else {
      this.formData = this.state;
      delete this.formData.error;
      await foxApi
        .createEntityOf("projects", this.formData)

        .then((newProjectInfo) => {
          const docsFromStore = [...this.props.docs];
          return Promise.all(
            docsFromStore.map((incomeDoc) => {
              const { backend_action, ...doc } = incomeDoc;
              doc.project = newProjectInfo.id;
              const formData = new FormData();
              Object.entries(doc).forEach(([key, value]) => {
                formData.append(key, value);
              });
              if (backend_action !== "None") {
                return foxApi[backend_action]("documents", formData);
              }
            })
          );
        })

        .then(() => {
          this.props.history.goBack();
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            error:
              "Project creation failed!" +
              " Please check your input and try again!" +
              " In case this problem repeats, please contact your administrator!",
          });
        })

        .finally(() => this.props.changeSubmitState());
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFileUpload = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  componentDidMount = async () => {
    await this.props
      .getProfileFetch()
      .then(() =>
        this.props.getContractorList({ signal: this.abortController.signal })
      )
      .then(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.abortController.abort();
    this.props.deleteDocumentsFromStore();
    await this.props.clearList();
  };

  abortController = new window.AbortController();

  render = () => {
    const options = this.props.options
      ? this.props.options.map((option) => {
          return { value: option.id, label: option.username };
        })
      : null;
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>Add New Project</CCardTitle>
              <CCardSubtitle>
                Fill up the form below to add a new Project
              </CCardSubtitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm onSubmit={this.silenceSubmit}>
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Project Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
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
                    <CTextarea
                      id="description"
                      name="description"
                      placeholder="Short Project Description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
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
                          placeholder="Start date"
                          name="start_date"
                          value={this.state.start_date}
                          onChange={this.handleChange}
                          readOnly={this.props.submitting}
                          disabled={this.props.submitting}
                          required
                        />
                      </CCol>
                      <CCol lg="6">
                        <CLabel htmlFor="end_date">End Date</CLabel>
                        <CInput
                          type="datetime-local"
                          id="end_date"
                          name="end_date"
                          placeholder="date"
                          value={this.state.end_date}
                          onChange={this.handleChange}
                          readOnly={this.props.submitting}
                          disabled={this.props.submitting}
                          required
                        />
                      </CCol>
                    </CRow>
                  </CFormGroup>
                  <FoxReactSelectFormGroup
                    options={options}
                    inputInfo="contractor"
                    inputValue={this.state.contractor}
                    handleChange={this.handleReactSelect}
                    readOnly={this.props.submitting}
                    disabled={this.props.submitting}
                  />
                  <FoxSwitchGroup
                    groupLabel="Choose the related hazardous work from the list below:"
                    options={permitOptions}
                    handleCheck={this.handleCheck}
                    parentState={this.state}
                    readOnly={this.props.submitting}
                    disabled={this.props.submitting}
                  />
                </CForm>
                <div className="mb-2 ">
                  <strong>Add documents to this project:</strong>
                </div>
                <MultipleFileUploadButton />
                <CRow>
                  {this.props.docs
                    ? this.props.docs.map((doc, idx) => (
                        <DocumentWidget key={idx} doc={doc} />
                      ))
                    : null}
                </CRow>
                <CButton
                  disabled={this.props.submitting}
                  shape="pill"
                  onClick={this.handleSubmit}
                  color="dark"
                  variant="outline"
                  block
                >
                  <SubmitSpinner submitting={this.props.submitting} />
                  Create Project
                </CButton>
                {this.state.error ? <p>{this.state.error}</p> : null}
              </WithLoadingSpinner>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    company: state.currentUser.company,
    options: state.entityListTable.tableData,
    docs: state.projectDocs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getContractorList: ({ ...params }) =>
    dispatch(getContractorList({ ...params })),
  clearList: () => dispatch(clearList()),
  deleteDocumentsFromStore: () => dispatch(deleteDocumentsFromStore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ProjectCreate));
