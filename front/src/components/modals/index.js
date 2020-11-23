import React from 'react'
import DeleteModal from './DeleteModal'
import ExtendModal from './ExtendModal'
import ForgetPasswordModal from './ForgetPasswordModal'
import ResetPasswordModal from './ResetPasswordModal'
import ContractorConfirmModal from './ContractorConfirmModal'

const FoxEngagedModals = props => {
  return (
    <React.Fragment>
      <DeleteModal {...props} />
      <ExtendModal {...props} />
      <ForgetPasswordModal {...props} />
      <ResetPasswordModal {...props} />
      <ContractorConfirmModal {...props} />
    </React.Fragment>
  )
}

export { DeleteModal, ExtendModal, ForgetPasswordModal, ResetPasswordModal, FoxEngagedModals }