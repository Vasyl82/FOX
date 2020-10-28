import React from 'react'
import { connect } from 'react-redux'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { updateModal } from '../../actions'
import { SubmitSpinner, WithLoading } from '../loadings'



const DeleteModal = props => {

  const handleDelete = async () => {
    props.changeSubmitState()
    await props.confirmDelete()
      .then(() => props.changeSubmitState())
  }
  return (
    <CModal
      show={props.modalType === "deleteModal"}
      onClose={props.hideModal}
      color="danger"
      disabled={props.submitting}
    >
      <CModalHeader closeButton>
        <CModalTitle>Confirm Deletion</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {`Are you sure you want to delete this ${props.entity}?`}
      </CModalBody>
      <CModalFooter>
        <CButton disabled={props.submitting} color="danger" onClick={handleDelete}><SubmitSpinner submitting={props.submitting} />Confirm</CButton>{' '}
        <CButton disabled={props.submitting} color="secondary" onClick={props.hideModal}><SubmitSpinner submitting={props.submitting} />Cancel</CButton>
      </CModalFooter>
    </CModal>
  )
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  entity: state.modal.entity,
  confirmDelete: state.modal.confirmDelete
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(updateModal("", {}))
})


export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(DeleteModal))
