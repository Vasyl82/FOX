import React, { Component } from 'react'
import { connect } from 'react-redux'
import DjangoCSRFToken from 'django-react-csrftoken'
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
  CCardSubtitle
} from "@coreui/react";
import { FoxApiService } from '../../../services'
import { getProfileFetch } from '../../../actions'
import { WithLoading, WithLoadingSpinner } from '../../loadings'

const foxApi = new FoxApiService();

class ContractorCreate extends Component {

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
    await foxApi.createEntityOf('contractors', this.formData).then(() => {
      this.props.history.goBack()
    },
      (error) => {
        console.error(error);
        this.setState({
          error: 'Contractor creation failed!' +
            ' Please check your input and try again!' +
            ' In case this problem repeats, please contact your administrator!'
        })
      })
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.changeLoadingState())
  }

  render = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>New Contractor</CCardTitle>
              <CCardSubtitle>Fill up the form below to add a new Contractor</CCardSubtitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm
                  onSubmit={this.handleSubmit}
                >
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CInput
                      id="username"
                      name='username'
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required />
                  </CFormGroup>
                  <CFormGroup>
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
                    <CInput
                      id="related_company"
                      name='related_company'
                      placeholder="Company name"
                      value={this.state.related_company}
                      onChange={this.handleChange}
                      required />
                  </CFormGroup>
                  <CFormGroup>
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
                    <CInput
                      id="company_phone"
                      name='company_phone'
                      placeholder="Contact phone number"
                      value={this.state.company_phone}
                      onChange={this.handleChange}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CButton shape="pill" type="submit" color="dark" variant="outline" block>Create contractor</CButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ContractorCreate))

