import React from 'react'
import DeleteModal from './DeleteModal'
import ExtendModal from './ExtendModal'
import ForgetPasswordModal from './ForgetPasswordModal'
import ResetPasswordModal from './ResetPasswordModal'

const FoxEngagedModals = props => {
  return (
    <React.Fragment>
      <DeleteModal {...props} />
      <ExtendModal {...props} />
      <ForgetPasswordModal {...props} />
      <ResetPasswordModal {...props} />
    </React.Fragment>
  )
}

export { DeleteModal, ExtendModal, ForgetPasswordModal, ResetPasswordModal, FoxEngagedModals }