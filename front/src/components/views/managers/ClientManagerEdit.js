import React, { Component } from 'react'
import DjangoCSRFToken from 'django-react-csrftoken'
import { connect } from 'react-redux'
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel, CRow,
  CCol,
  CSelect,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle
} from "@coreui/react";
import { FoxApiService } from '../../../services'
import { getProfileFetch } from '../../../actions'
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from '../../loadings'
import { handleError } from '../../errors'

const foxApi = new FoxApiService();

const positions = [
  { id: -1, position: "Choose manager position" },
  { id: "SafeMan", position: "Safety Manager" },
  { id: "SecMan", position: "Security Manager" },
  { id: "SecOff", position: "Security Officer" },
  { id: "SiteOwn", position: "Site Owner" },
  { id: "WorkOwn", position: "Owner of Work" },
  { id: "SecGrd", position: "Security Guards" }
]


class ClientManagerEdit extends Component {

  state = {
    username: "",
    name: "",
    email: "",
    position: -1,
    company: this.props.company,
    role: "CliMan",
    department: "",
    error: false
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.changeSubmitState()
    if (parseInt(this.state.position) < 0) {
      this.setState({
        error: 'Manager Position was not selected! Please, choose position form the list'
      })
    } else {
      this.formData = this.state;
      delete this.formData.error;
      await foxApi.updateEntityOf('managers', this.props.match.params.id, this.formData)
        .then(() => {
          this.props.history.goBack()
        })
        .catch((error) => {
          const errorMessage = handleError(
            {
              error: error,
              validationFields: ["username", "email", "name", "position", "department", "company"],
              operation: "Client manager edition"
            }
          )
          this.setState({
            error: errorMessage
          })
        })
        .finally(() => this.props.changeSubmitState())
    }
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getDetailsOf('managers', this.props.match.params.id))
      .then((data) => this.setState({ ...data }))
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
  }

  render = () => {

    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>Manager details</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm
                  onSubmit={this.handleSubmit}
                >
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CLabel htmlFor="username">Manager username</CLabel>
                    <CInput
                      id="username"
                      name='username'
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="name">Manager name</CLabel>
                    <CInput
                      id="name"
                      name='name'
                      placeholder="Manager name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="email">Manager email</CLabel>
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
                    <CLabel htmlFor="target_type">Manager Position</CLabel>
                    <CSelect
                      id="position"
                      name="position"
                      placeholder="Choose position"
                      value={this.state.position}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    >
                      {positions.map((option) => {
                        return (
                          <option key={option.id} value={option.id}>{option.position}</option>
                        )
                      }
                      )}
                    </CSelect>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="department">Manager department</CLabel>
                    <CInput
                      id="department"
                      name="department"
                      placeholder="Department"
                      value={this.state.department}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CButton
                      disabled={this.props.submitting}
                      shape="pill"
                      type="submit"
                      color="dark"
                      variant="outline"
                      block>
                      <SubmitSpinner submitting={this.props.submitting} />
                      Save changes
                    </CButton>
                  </CFormGroup>
                  {this.state.error
                    ? <p className="fox-form-invalid-feedback">{this.state.error}</p>
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
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ClientManagerEdit))
