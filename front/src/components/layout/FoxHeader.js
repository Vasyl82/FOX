import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import {
  CContainer,
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink, CCreateElement
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import {
  FoxHeaderDropdown,
  FoxHeaderDropdownMssg,
  FoxHeaderDropdownNotif,
  FoxHeaderDropdownTasks
} from './index'

import { FoxHeaderNavLink } from '../../utils'

const FoxHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
      </CHeaderBrand>

      <CHeaderNav className="mr-auto">
        <CCreateElement
          items={props.navigation}
          components={{
            CHeaderNavItem,
            CHeaderNavLink,
            FoxHeaderNavLink
          }}
        />
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <FoxHeaderDropdownMssg />
        <FoxHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  )
}

const mapStateToProps = state => {
  return {
    navigation: state.headerNav,
    company: state.company,
  }
}

export default connect(mapStateToProps)(FoxHeader)
