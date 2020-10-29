import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { NotificationCountBadge } from '../badges'
import { clearNotifications, getNotifications } from '../../actions'
import { NotificationMessage } from '../../utils'

class TheHeaderDropdownMssg extends Component {

  state = {
    timer: ''
  }

  componentDidMount = () => {
    this.props.getNotifications({ signal: this.abortController.signal })
    const timer = setInterval(this.props.getNotifications, 60000)
    this.setState({
      timer: timer
    })
  }

  abortController = new window.AbortController();

  componentWillUnmount = () => {
    this.abortController.abort();
    clearInterval(this.state.timer);
    this.props.clearNotifications()
  }

  render = () => {
    return (
      <CDropdown
        inNav
        className="c-header-nav-item mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <NotificationCountBadge items={this.props.notifications} />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          {this.props.notifications.length > 0 ?
            this.props.notifications.map(notification => {
              return (
                <CDropdownItem key={notification.id} href={notification.forward_link}><NotificationMessage notification={notification} /></CDropdownItem>
              )
            })
            :
            <CDropdownItem href="#">
              <div className="text-muted text-truncate">
                You have no messages yet.
              </div>
            </CDropdownItem>
          }
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
}
)

const mapDispatchToProps = dispatch => ({
  getNotifications: ({ ...kwargs }) => dispatch(getNotifications({ ...kwargs })),
  clearNotifications: () => dispatch(clearNotifications())
})

export default connect(mapStateToProps, mapDispatchToProps)(TheHeaderDropdownMssg)