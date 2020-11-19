import React, { Component } from "react";
import { connect } from "react-redux";
import DjangoCSRFToken from "django-react-csrftoken";
import {
  CForm,
  CFormGroup,
  CInput,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CInputFile,
  CLabel,
  CImg,
  CCardText,
} from "@coreui/react";
import { FoxApiService } from "../../../services";
import { getProfileFetch, updateModal } from "../../../actions";
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from "../../loadings";
import { handleError } from "../../errors";

const foxApi = new FoxApiService();

class ContractorCreate extends Component {
  state = {
    username: "",
    email: "",
    name: "",
    related_company: "",
    company_phone: "",
    company: this.props.company,
    signature: "",
    role: "Contr",
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImageUpload = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.changeSubmitState();
    const { error, ...requestData } = this.state;
    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await foxApi
      .createEntityWithFile("contractors", formData)
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        const errorMessage = handleError({
          error: error,
          validationFields: [
            "username",
            "email",
            "name",
            "related_company",
            "company_phone",
            "company",
            "signature",
          ],
          operation: "Contractor manager creation",
        });
        this.setState({
          error: errorMessage,
        });
      })
      .finally(() => this.props.changeSubmitState());
  };

  componentDidMount = async () => {
    await this.props
      .getProfileFetch()
      .then(() => this.props.changeLoadingState());
  };

  render = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>New Contractor</CCardTitle>
              <CCardSubtitle>
                Fill up the form below to add a new Contractor
              </CCardSubtitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm onSubmit={this.handleSubmit}>
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CInput
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CInput
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CInput
                      id="related_company"
                      name="related_company"
                      placeholder="Company name"
                      value={this.state.related_company}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CInput
                      id="name"
                      type="name"
                      name="name"
                      placeholder="Contact Person Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CInput
                      id="company_phone"
                      name="company_phone"
                      placeholder="Contact phone number"
                      value={this.state.company_phone}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup row className="ml-0 mr-0">
                    <CCol sm="6" md="4">
                      <CFormGroup>
                        <CInputFile
                          id="signature"
                          name="signature"
                          custom
                          required
                          onChange={this.handleImageUpload}
                          disabled={this.props.submitting}
                          readOnly={this.props.submitting}
                        />
                        <CLabel htmlFor="signature" variant="custom-file">
                          Upload signature image...
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                    <CCol sm="6" md="8">
                      {this.state.signature ? (
                        <>
                          <CCardText>Signature Preview:</CCardText>
                          <CImg
                            src={window.URL.createObjectURL(
                              this.state.signature
                            )}
                            width="200px"
                            height="200px"
                            className="mb-2"
                          />
                        </>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CButton
                      shape="pill"
                      type="submit"
                      color="dark"
                      variant="outline"
                      disabled={this.props.submitting}
                      block
                    >
                      <SubmitSpinner submitting={this.props.submitting} />
                      Create contractor
                    </CButton>
                  </CFormGroup>
                  {this.state.error ? (
                    <p className="fox-form-invalid-feedback">
                      {this.state.error}
                    </p>
                  ) : null}
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
    company: state.currentUser.company,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  updateModal: ({ ...kwargs }) => dispatch(updateModal({ ...kwargs })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ContractorCreate));
