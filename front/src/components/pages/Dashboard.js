import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileFetch, getDashboardLayout } from '../../actions'
import {
} from '@coreui/react'
import { FoxSidebar, FoxHeader, FoxContent } from '../layout';
import { matchPath } from 'react-router-dom'
import { WithLoading, WithLoadingSpinner } from '../loadings'

class Dashboard extends Component {

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.getDashboardLayout(this.props.currentUser.role, this.props.match.params.id))
      .then(() => this.props.changeLoadingState())
  }

  componentDidUpdate = (prevProps) => {
    const updatedMatch = matchPath(this.props.location.pathname, {
      path: "/projects/:id",
      exact: true
    });
    if (updatedMatch && (prevProps.location.pathname != this.props.location.pathname)) {
      this.props.getDashboardLayout(this.props.currentUser.role, updatedMatch.params.id);
    }
  }

  render() {
    return (
      <WithLoadingSpinner loading={this.props.loading}>
        {this.props.currentUser.username ?
          <div className="c-app c-default-layout">
            <FoxSidebar />
            <div className="c-wrapper">
              <FoxHeader />
              <div className="c-body">
                <FoxContent />
              </div>
            </div>
          </div>
          : <Redirect to="/login" />}
      </WithLoadingSpinner>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    navigation: state.sidebar
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getDashboardLayout: (userRole, projectId) => dispatch(getDashboardLayout(userRole, projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(Dashboard))
