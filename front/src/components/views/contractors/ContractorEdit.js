import React, { Component } from 'react'
import DjangoCSRFToken from 'django-react-csrftoken'
import { connect } from 'react-redux'
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel, CRow,
  CCol,
  CButton,
  CLink,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
} from "@coreui/react";
import { FoxApiService } from '../../../services'
import { getProfileFetch } from '../../../actions'
import { WithLoading, WithLoadingSpinner, WitLoadingSpinne } from '../../loadings'

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
    error: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.formData = this.state;
    delete this.formData.error;
    await foxApi.updateEntityOf('contractors', this.props.match.params.id, this.formData).then(() => {
      this.props.history.goBack()
    },
      (error) => {
        console.error(error);
        this.setState({
          error: 'Contractor update failed!' +
            ' Please check your input and try again!' +
            ' In case this problem repeats, please contact your administrator!'
        })
      })
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getDetailsOf('contractors', this.props.match.params.id))
      .then((data) => this.setState({ ...data }))
      .then(() => this.props.changeLoadingState())
  }

  render = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>
                Contractor Details
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm
                  onSubmit={this.handleSubmit}
                >
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CLabel htmlFor="username">Contractor username</CLabel>
                    <CInput
                      id="username"
                      name='username'
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required />
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
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="related_company">Contractor company</CLabel>
                    <CInput
                      id="related_company"
                      name='related_company'
                      placeholder="Company name"
                      value={this.state.related_company}
                      onChange={this.handleChange}
                      required />
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
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="company_phone">Contact phone number</CLabel>
                    <CInput
                      id="company_phone"
                      name='company_phone'
                      placeholder="Contact phone number"
                      value={this.state.company_phone}
                      onChange={this.handleChange}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CLink
                      to={`/contractors/${this.props.match.params.id}/workers_review`}
                    >Browse workers</CLink>
                  </CFormGroup>
                  <CFormGroup>
                    <CButton shape="pill" type="submit" color="dark" variant="outline" block>Save changes</CButton>
                  </CFormGroup>
                  {this.state.error
                    ? <p>{this.state.error}</p>
                    : null
                  }
                </CForm>
              </WithLoadingSpinner>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    )
  }
}

const mapStateToProps = state => {
  return {
    company: state.currentUser.company,
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ContractorEdit))

