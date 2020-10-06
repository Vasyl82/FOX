import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { FoxApiService } from '../../services'
import { updateModal } from '../../actions'

const foxApi = new FoxApiService()

class ResetPasswordModal extends Component {

  state = {
    email: this.props.email,
    error: false,
    success: false
  }

  handleSubmit = async () => {
    const requestData = this.state;
    delete requestData.success;
    delete requestData.error;
    await foxApi.resetPassword({ email: this.props.email })
      .then(() => {
        this.setState({
          success: true,
          error: false
        })
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: 'Could not reset your password!' +
            ' Please check your the email you entered and try again!' +
            ' In case this problem repeats, please contact your administrator!'
        })
      })
  }

  render = () => {
    const { error, success } = this.state
    return (
      <CModal
        show={this.props.modalType === "resetPasswordModal"}
        onClose={this.props.hideModal}
        color="dark"
      >
        <CModalHeader closeButton>
          <CModalTitle>Request password reset</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {success ?
            <p className="fox-form-valid-feedback">Password reset application was successful. Please check your email for further instructions</p>
            :
            <p>Are you sure you want to reset your password?</p>
          }
          {error
            ? <p className="fox-form-invalid-feedback">{error}</p>
            : null
          }
        </CModalBody>
        <CModalFooter>
          {success ? null : <CButton shape="pill" color="primary" onClick={this.handleSubmit}>Confirm</CButton>}
          {' '}<CButton shape="pill" color="dark" onClick={this.props.hideModal}>{success ? "Close" : "Cancel"}</CButton>
        </CModalFooter>
      </CModal >
    )
  }
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  email: state.modal.email
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(updateModal("", {}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModal)
