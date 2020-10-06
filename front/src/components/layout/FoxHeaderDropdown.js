import React from 'react'
import { connect } from 'react-redux';

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { logoutUser, updateModal } from '../../actions';

const FoxHeaderDropdown = props => {

  const handleClick = event => {
    event.preventDefault();
    props.logoutUser();
  }

  const showPasswordResetModal = () => {
    props.updateModal({
      modalType: "resetPasswordModal",
      email: props.currentUser.email
    })

  }

  return (
    <React.Fragment>
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <CIcon name="cil-settings" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Settings</strong>
          </CDropdownItem>
          <CDropdownItem onClick={showPasswordResetModal}>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Change password
          </CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem onClick={handleClick}>
            <CIcon name="cil-account-logout" className="mfe-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  updateModal: ({ modalType, ...rest }) => dispatch(updateModal({ modalType, ...rest }))
})

export default connect(mapStateToProps, mapDispatchToProps)(FoxHeaderDropdown);
