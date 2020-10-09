import React, { Component } from 'react'
import { getProfileFetch } from '../../../actions'
import { connect } from 'react-redux'
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
import DjangoCSRFToken from 'django-react-csrftoken'
import { FoxApiService } from '../../../services'

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

  componentDidMount = () => {
    this.props.getProfileFetch()
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

export default connect(mapStateToProps, mapDispatchToProps)(ContractorCreate)

