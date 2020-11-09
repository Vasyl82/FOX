import React, { Component } from "react";
import { getProfileFetch, updateModal } from "../../../actions";
import { connect } from "react-redux";
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCol,
  CButton,
  CLink,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
} from "@coreui/react";
import DjangoCSRFToken from "django-react-csrftoken";
import { FoxApiService } from "../../../services";
import {
  FoxFormGroupInputDownloadUpload,
  FoxSelectFormGroup,
  FoxReactSelectFormGroup,
  FoxFormGroupDownloadUpload,
  AlternativeInputs,
} from "../../forms";
import { positions, tradeCompetencies } from "./optionLists";
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from "../../loadings";

const foxApi = new FoxApiService();

class WorkerDetail extends Component {
  state = {
    name: "",
    phone_number: "",
    contractor: "",
    birthday: "",
    card_number_id: "",
    card_number_id_scan: "",
    license_number: "",
    license_scan: "",
    passport: "",
    passport_scan: "",
    safety_green_card: "",
    safety_green_card_scan: "",
    position_in_company: "",
    safety_quiz_answer: "",
    personal_declaration: "",
    error: false,
    filename: "",
    doc_type: "",
    upload_files: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileUpload = (event) => {
    const { upload_files } = this.state;
    upload_files[event.target.name] = event.target.files[0];
    this.setState({
      upload_files: upload_files,
      [event.target.name]: "",
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.changeSubmitState();
    this.requestData = this.state;
    const { upload_files } = this.requestData;
    delete this.requestData.upload_files;
    delete this.requestData.error;
    delete this.requestData.filename;
    delete this.requestData.doc_type;
    delete this.requestData.license_scan;
    delete this.requestData.passport_scan;
    delete this.requestData.card_number_id_scan;
    delete this.requestData.safety_green_card_scan;
    delete this.requestData.safety_quiz_answer;
    delete this.requestData.personal_declaration;
    this.formData = new FormData();
    Object.entries(this.requestData).forEach(([key, value]) => {
      this.formData.append(key, value);
    });
    upload_files
      ? Object.entries(upload_files).forEach(([key, value]) => {
        this.formData.append(key, value);
      })
      : null;
    await foxApi
      .patchEntityWithFiles(
        "workers",
        this.props.match.params.id,
        this.formData
      )
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        const errors = handleError(
          {
            error: error,
            operation: "Worker creation",
            validationFields: [
              "name",
              "contractor",
              "birthday",
              "phone_number",
              "card_number_id",
              "card_number_id_scan",
              "license_number",
              "license_scan",
              "passport",
              "passport_scan",
              "safety_green_card",
              "safety_green_card_scan",
              "position_in_company",
              "safety_quiz_answer",
              "personal_declaration",
              "submitCallback",
              "trade_competency",
            ]
          });
        this.setState({
          error: errors
        });
      })
      .finally(this.props.changeSubmitState);
  };

  confirmDelete = async () => {
    await foxApi.deleteEntityOf("workers", this.props.match.params.id).then(
      () => {
        this.props.history.goBack();
        this.props.updateModal("", {});
      },
      (error) => {
        console.error(error);
        this.setState({
          error:
            "Could not delete worker!" +
            " Please check your input and try again!" +
            " In case this problem repeats, please contact your administrator!",
        });
      }
    );
  };

  downloadFile = async (e) => {
    this.setState(
      {
        filename: e.target.value,
        doc_type: e.target.name,
      },
      () => {
        foxApi
          .downloadWorkerDocument(
            this.props.match.params.id,
            this.state.doc_type
          )
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            const filename = this.state.filename.split("/").pop();
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((error) => {
            console.error("File download failed!");
            console.error(error);
          });
      }
    );
  };

  showDeleteModal = () => {
    this.props.updateModal({
      modalType: "deleteModal",
      entity: "worker",
      confirmDelete: () => this.confirmDelete(),
    });
  };

  selectActiveOption = (optionA, optionB) => {
    const { passport } = this.state;
    return passport ? optionB : optionA;
  };

  componentDidMount = async () => {
    await this.props
      .getProfileFetch()
      .then(() => foxApi.getDetailsOf("workers", this.props.match.params.id))
      .then((data) => this.setState({ ...data }))
      .catch((error) => {
        console.log(error);
      })
      .finally(this.props.changeLoadingState);
  };

  render = () => {
    const optionA = (
      <FoxFormGroupInputDownloadUpload
        inputValue={this.state.card_number_id}
        downloadValue={this.state.card_number_id_scan}
        handleChange={this.handleChange}
        handleFileUpload={this.handleFileUpload}
        inputInfo="card_number_id"
        uploadInfo="card_number_id_scan"
        downloadFile={this.downloadFile}
        disabled={this.props.submitting}
        readOnly={this.props.submitting}
      />
    );
    const optionB = (
      <FoxFormGroupInputDownloadUpload
        inputValue={this.state.passport}
        downloadValue={this.state.passport_scan}
        handleChange={this.handleChange}
        handleFileUpload={this.handleFileUpload}
        inputInfo="passport"
        uploadInfo="passport_scan"
        downloadFile={this.downloadFile}
        disabled={this.props.submitting}
        readOnly={this.props.submitting}
      />
    );
    const IDDocOption = this.selectActiveOption(optionA, optionB)

    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>Worker Detail</CCardTitle>
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
                      placeholder="Enter worker name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="birthday">Birthday</CLabel>
                    <CInput
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={this.state.birthday}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="phone_number">Phone number</CLabel>
                    <CInput
                      id="phone_number"
                      name="phone_number"
                      placeholder="Enter phone number"
                      value={this.state.phone_number}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <FoxReactSelectFormGroup
                    options={positions}
                    inputInfo="position_in_company"
                    inputValue={this.state.position_in_company}
                    handleChange={this.handleReactSelect}
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  <FoxSelectFormGroup
                    options={tradeCompetencies}
                    inputInfo="trade_competency"
                    inputValue={this.state.trade_competency}
                    handleChange={this.handleChange}
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  {IDDocOption}
                  <FoxFormGroupInputDownloadUpload
                    inputValue={this.state.license_number}
                    downloadValue={this.state.license_scan}
                    handleChange={this.handleChange}
                    handleFileUpload={this.handleFileUpload}
                    inputInfo="license_number"
                    uploadInfo="license_scan"
                    downloadFile={this.downloadFile}
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  <FoxFormGroupInputDownloadUpload
                    inputValue={this.state.safety_green_card}
                    downloadValue={this.state.safety_green_card_scan}
                    handleChange={this.handleChange}
                    handleFileUpload={this.handleFileUpload}
                    inputInfo="safety_green_card"
                    uploadInfo="safety_green_card_scan"
                    downloadFile={this.downloadFile}
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  <FoxFormGroupDownloadUpload
                    inputValue={this.state.safety_quiz_answer}
                    downloadValue={this.state.safety_quiz_answer_scan}
                    handleChange={this.handleChange}
                    handleFileUpload={this.handleFileUpload}
                    inputInfo="safety_quiz_answer"
                    uploadInfo="safety_quiz_answer_scan"
                    downloadFile={this.downloadFile}
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  <FoxFormGroupDownloadUpload
                    inputValue={this.state.personal_declaration}
                    downloadValue={this.state.personal_declaration_scan}
                    handleChange={this.handleChange}
                    handleFileUpload={this.handleFileUpload}
                    inputInfo="personal_declaration"
                    uploadInfo="personal_declaration_scan"
                    downloadFile={this.downloadFile}
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  {/* <CFormGroup>
                    <CLink className="btn btn-outline-primary" to={`/workers/${this.props.match.params.id}/competencies`}>Special Competencies</CLink>
                  </CFormGroup> */}
                  <CFormGroup>
                    <CButton
                      disabled={this.props.loading || this.props.submitting}
                      shape="pill"
                      type="submit"
                      color="dark"
                      variant="outline"
                      block
                    >
                      <SubmitSpinner submitting={this.props.submitting} />
                      Save changes
                    </CButton>
                  </CFormGroup>
                  <CButton
                    disabled={this.props.loading || this.props.submitting}
                    shape="pill"
                    color="danger"
                    variant="outline"
                    onClick={this.showDeleteModal}
                    block
                  >
                    <SubmitSpinner submitting={this.props.submitting} />
                    Delete Worker
                  </CButton>
                  {this.state.error ? <p>{this.state.error}</p> : null}
                </CForm>
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
    contractor: state.currentUser.id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  updateModal: ({ modalType, ...rest }) =>
    dispatch(updateModal({ modalType, ...rest })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(WorkerDetail));
