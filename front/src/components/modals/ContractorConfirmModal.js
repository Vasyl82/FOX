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
import { WithLoading, SubmitSpinner } from '../loadings'

const foxApi = new FoxApiService()

class ContractorConfirmModal extends Component {

  state = {
    error: false,
    success: false
  }

  handleSubmit = async () => {
    this.props.changeSubmitState()
    await foxApi.connectContractorToCompany(this.props.contractorId, { company_id: this.props.company })
      .then(() => {
        this.setState({
          success: true,
          error: false
        })
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: 'Could not add contractor!' +
            ' Please try one more time!' +
            ' In case this problem repeats, please contact your administrator!'
        })
      })
      .finally(this.props.changeSubmitState)
  }

  render = () => {
    const { error, success } = this.state
    return (
      <CModal
        show={this.props.modalType === "contractorConfirmModal"}
        onClose={this.props.hideModal}
        color="dark"
      >
        <CModalHeader closeButton>
          <CModalTitle>This contractor already exists</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {success ?
            <p className="fox-form-valid-feedback">Contractor added to your company</p>
            :
            <>
              <p>{this.props.message}</p>
              <p>Do you want to add this contractor to your company?</p>
            </>
          }
          {error
            ? <p className="fox-form-invalid-feedback">{error}</p>
            : null
          }
        </CModalBody>
        <CModalFooter>
          {success ? null :
            <CButton
              disabled={this.props.submitting}
              shape="pill"
              color="primary"
              onClick={this.handleSubmit}><SubmitSpinner submitting={this.props.submitting} />Confirm
            </CButton>}
          {' '}
          <CButton
            disabled={this.props.submitting}
            shape="pill"
            color="dark"
            onClick={this.props.hideModal}>
            <SubmitSpinner submitting={this.props.submitting} />{success ? "Close" : "Cancel"}
          </CButton>
        </CModalFooter>
      </CModal >
    )
  }
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  contractorId: state.modal.contractorId,
  companies: state.modal.companies,
  message: state.modal.message,
  company: state.currentUser.company,
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(updateModal("", {}))
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ContractorConfirmModal))
