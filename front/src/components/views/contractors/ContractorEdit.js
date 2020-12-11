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
  CLink,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
} from "@coreui/react";
import { FoxApiService } from "../../../services";
import { getProfileFetch } from "../../../actions";
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from "../../loadings";
import { handleError } from "../../errors";

const foxApi = new FoxApiService();

class ContractorEdit extends Component {
  state = {
    username: "",
    email: "",
    name: "",
    related_company: "",
    company_phone: "",
    company: this.props.company,
    role: "Contr",
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.changeSubmitState();
    const { error, ...requestData } = this.state;
    await foxApi
      .patchEntityOf("contractors", this.props.match.params.id, requestData)
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
          ],
          operation: "The contractor with this username or email already exists, so editing of the contractor data",
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
      .then(() =>
        foxApi.getDetailsOf("contractors", this.props.match.params.id)
      )
      .then((data) => this.setState({ ...data }))
      .catch((error) => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  render = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>Contractor Details</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm onSubmit={this.handleSubmit}>
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CLabel htmlFor="username">Contractor username</CLabel>
                    <CInput
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="email">Contractor email</CLabel>
                    <CInput
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="related_company">
                      Contractor company
                    </CLabel>
                    <CInput
                      id="related_company"
                      name="related_company"
                      placeholder="Company name"
                      value={this.state.related_company}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="name">Contact person name</CLabel>
                    <CInput
                      id="name"
                      type="name"
                      name="name"
                      placeholder="Contact Person Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="company_phone">
                      Contact phone number
                    </CLabel>
                    <CInput
                      id="company_phone"
                      name="company_phone"
                      placeholder="Contact phone number"
                      value={this.state.company_phone}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLink
                      to={`/contractors/${this.props.match.params.id}/workers_review`}
                      disabled={this.props.submitting}
                    >
                      Browse workers
                    </CLink>
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
                      Save changes
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ContractorEdit));
