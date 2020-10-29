import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CForm, CFormGroup, CContainer, CRow, CCol, CImg, CButton, CPopover } from "@coreui/react";
import DjangoCSRFToken from 'django-react-csrftoken'
import { userRegisterFetch, registerError, allowRegistration } from '../../actions'
import { FoxPasswordInput } from './inputs'

class FoxRegisterForm extends Component {

  state = {
    username: this.props.username,
    password: "",
    password2: "",
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      if (this.state.password !== this.state.password2) {
        this.props.registerError();
      }
      else {
        this.props.allowRegistration(this.props.registrationToken);
      };
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.userRegisterFetch({
      password: this.state.password,
      token: this.props.registrationToken,
      is_active: true
    })
  }

  render() {
    const { username, password, password2 } = this.state
    return (
      <CRow alignHorizontal="center">
        <CCol md="6">
          <CContainer fluid>
            <CRow className="mb-2">
              <CCol md="8" className="mx-auto">
                <CImg
                  width="100%"
                  src='/static/front/images/signed-logo.png'
                  className="mb-2"
                />
              </CCol>
            </CRow>
            <CRow className="mt-2 mb-2" alignHorizontal="center">
              <CCol className="mx-auto">
                <h1 className="fox-login-welcome">Welcome to FOX!</h1>
                <p className="fox-login-welcome"> You are trying to register as <strong>{username}</strong>.  Please, fill this form to finish your registration.</p>
              </CCol>
            </CRow>
            <CRow className="mt-2 mb-2">
              <CCol className="mx-auto">
                <CForm
                  onSubmit={this.handleSubmit}
                >
                  <DjangoCSRFToken />

                  <CPopover content={<><p>Your password must contain at least 8 characters.</p><p> Your password can’t be a commonly used password.</p><p> "Your password can’t be too similar to your other personal information.</p></>}>
                    <CFormGroup>
                      <FoxPasswordInput
                        inputName="password"
                        password={password}
                        placeholder="Password"
                        submitError={this.props.registerErrorFlag}
                        handleChange={this.handleChange}
                      />
                      <FoxPasswordInput
                        inputName="password2"
                        password={password2}
                        placeholder="Confirm password"
                        submitError={this.props.registerErrorFlag}
                        handleChange={this.handleChange}
                      />
                      {this.props.registerErrorFlag
                        ? <p className={"fox-form-invalid-feedback"}>The suggested password is inappropriate. Please, Try to choose more sophisticated password and try again.</p>
                        : null
                      }
                    </CFormGroup>
                  </CPopover>
                  <CFormGroup>
                    <CButton shape="pill" block type="submit" color="dark" disabled={this.state.password !== this.state.password2} >Register</CButton>
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CContainer >
        </CCol>
      </CRow >
    )
  }
}

const mapStateToProps = state => {
  return {
    registerErrorFlag: state.registerError,
    registrationToken: state.registrationToken,
    errorMessage: state.errorMessage
  }
}

const mapDispatchToProps = dispatch => ({
  userRegisterFetch: credentials => dispatch(userRegisterFetch(credentials)),
  registerError: () => dispatch(registerError()),
  allowRegistration: (token) => dispatch(allowRegistration(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(FoxRegisterForm)