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


const DeleteModal = props => {
  return (
    <CModal
      show={props.modalType === "deleteModal"}
      onClose={props.hideModal}
      color="danger"
    >
      <CModalHeader closeButton>
        <CModalTitle>Confirm Deletion</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {`Are you sure you want to delete this ${props.entity}?`}
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={props.confirmDelete}>Confirm</CButton>{' '}
        <CButton color="secondary" onClick={props.hideModal}>Cancel</CButton>
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


export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)
