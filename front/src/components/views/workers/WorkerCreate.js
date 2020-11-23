import React, { Component } from "react";
import DjangoCSRFToken from "django-react-csrftoken";
import { connect } from "react-redux";
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCol,
  CButton,
  CInputFile,
  CCard,
  CCardTitle,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
} from "@coreui/react";
import { getProfileFetch } from "../../../actions";
import { FoxApiService } from "../../../services";
import {
  FoxFormGroupWithUpload,
  FoxSelectFormGroup,
  FoxReactSelectFormGroup,
  AlternativeInputs,
} from "../../forms";
import { positions, tradeCompetencies } from "./optionLists";
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from "../../loadings";
import { handleError } from '../../errors'

const foxApi = new FoxApiService();

class WorkerCreate extends Component {
  state = {
    name: "",
    contractor: this.props.contractor,
    birthday: "",
    phone_number: "",
    card_number_id: "",
    card_number_id_scan: "",
    license_number: "",
    license_scan: "",
    passport: "",
    passport_scan: "",
    safety_green_card: "",
    safety_green_card_scan: "",
    position_in_company: -1,
    safety_quiz_answer: "",
    personal_declaration: "",
    submitCallback: "",
    trade_competency: -1,
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleReactSelect = (option, event) => {
    this.setState({
      [event.name]: option.value,
    });
  };

  handleFileUpload = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.position_in_company === -1) {
      this.setState({
        error:
          "Worker position in company was not selected! Please, choose position form the list",
      });
    } else if (this.state.trade_competency === -1) {
      this.setState({
        error:
          "Trade competency was not selected! Please, choose competency form the list",
      });
    } else {
      this.props.changeSubmitState();
      this.requestData = this.state;
      delete this.requestData.error;
      this.formData = new FormData();
      Object.entries(this.requestData).forEach(([key, value]) => {
        this.formData.append(key, value);
      });
      await foxApi
        .createEntityWithFile("workers", this.formData)
        .then((data) => {
          this.state.submitCallback(data.id);
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
    }
  };

  handleSimpleSubmit = () => {
    this.setState({
      submitCallback: () => {
        return this.props.history.goBack();
      },
    });
  };

  handleSubmitWithCompetencies = () => {
    this.setState({
      submitCallback: (id) =>
        this.props.history.push(`/workers/${id}/competencies/new`),
    });
  };

  componentDidMount = async () => {
    await this.props
      .getProfileFetch()
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  render = () => {
    const optionA = (
      <FoxFormGroupWithUpload
        inputValue={this.state.card_number_id}
        handleChange={this.handleChange}
        handleFileUpload={this.handleFileUpload}
        inputInfo="card_number_id"
        uploadInfo="card_number_id_scan"
        disabled={this.props.submitting}
        readOnly={this.props.submitting}
      />
    );
    const optionB = (
      <FoxFormGroupWithUpload
        inputValue={this.state.passport}
        handleChange={this.handleChange}
        handleFileUpload={this.handleFileUpload}
        inputInfo="passport"
        uploadInfo="passport_scan"
        disabled={this.props.submitting}
        readOnly={this.props.submitting}
      />
    );
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>New Worker</CCardTitle>
              <CCardSubtitle>
                Fill up the form below to add a new Worker
              </CCardSubtitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm onSubmit={this.handleSubmit}>
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="birthday">Date of birth</CLabel>
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
                    <CInput
                      id="phone_number"
                      name="phone_number"
                      placeholder="Phone number"
                      value={this.state.phone_number}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
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
                  <AlternativeInputs
                    optionA={optionA}
                    optionB={optionB}
                    submitting={this.props.submitting}
                  />
                  <FoxFormGroupWithUpload
                    inputValue={this.state.license_number}
                    handleChange={this.handleChange}
                    handleFileUpload={this.handleFileUpload}
                    inputInfo="license_number"
                    uploadInfo="license_scan"
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  <FoxFormGroupWithUpload
                    inputValue={this.state.safety_green_card}
                    handleChange={this.handleChange}
                    handleFileUpload={this.handleFileUpload}
                    inputInfo="safety_green_card"
                    uploadInfo="safety_green_card_scan"
                    disabled={this.props.submitting}
                    readOnly={this.props.submitting}
                  />
                  <CFormGroup>
                    <CLabel htmlFor="safety_quiz_answer">
                      Safety quiz answer
                    </CLabel>
                    <CInputFile
                      id="safety_quiz_answer"
                      name="safety_quiz_answer"
                      onChange={this.handleFileUpload}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="personal_declaration">
                      Personal declaration
                    </CLabel>
                    <CInputFile
                      id="personal_declaration"
                      name="personal_declaration"
                      onChange={this.handleFileUpload}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CButton
                      disabled={this.props.submitting}
                      onClick={this.handleSimpleSubmit}
                      shape="pill"
                      type="submit"
                      color="dark"
                      variant="outline"
                      block>
                      <SubmitSpinner submitting={this.props.submitting} />Create Worker</CButton>
                  </CFormGroup>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(WorkerCreate));
