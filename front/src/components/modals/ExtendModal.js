import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CInvalidFeedback
} from '@coreui/react'

import { FoxApiService } from '../../services'
import { updateModal } from '../../actions'
import { WithLoading, SubmitSpinner } from '../loadings'

const foxApi = new FoxApiService()

class ExtendModal extends Component {

  state = {
    extend_date: "",
    status: "Extended",
    error: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async () => {
    const requestData = this.state;
    if (requestData.extend_date === "") {
      this.setState({
        error: "Extension date was not provided, please, choose extension date before confirmation"
      })
    }
    else {
      this.props.changeSubmitState()
      delete requestData.error;
      await foxApi.patchEntityOf("projects", this.props.projectId, requestData)
        .then(async () => {
          await this.props.updateList({ role: "CliAdm" })
        })
        .then(() => this.props.hideModal())
        .catch((error) => {
          console.error(error);
          this.setState({
            error: 'Could not extend project!' +
              ' Please check your input and try again!' +
              ' In case this problem repeats, please contact your administrator!'
          })
        })
        .finally(this.props.changeSubmitState)
    }
  }


  render = () => {
    const { extend_date, error } = this.state
    return (
      <CModal
        show={this.props.modalType === "extendModal"}
        onClose={this.props.hideModal}
        color="dark"
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirm Project Extension</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormGroup>
              <CLabel htmlFor="extend_date">Extend this project till:</CLabel>
              <CInput invalid={error} type="datetime-local" name="extend_date" value={extend_date} onChange={this.handleChange} required />
              <CInvalidFeedback>{error}</CInvalidFeedback>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton disabled={this.props.submitting} shape="pill" color="primary" onClick={this.handleSubmit}><SubmitSpinner submitting={this.props.submitting} />Confirm</CButton>{' '}
          <CButton disabled={this.props.submitting} shape="pill" color="dark" onClick={this.props.hideModal}><SubmitSpinner submitting={this.props.submitting} />Cancel</CButton>
        </CModalFooter>
      </CModal>
    )
  }
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  projectId: state.modal.projectId,
  updateList: state.modal.updateList
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(updateModal("", {}))
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ExtendModal))
