import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileFetch } from '../../../actions'
import {
  CRow,
  CCol,
  CEmbed
} from "@coreui/react";
import { ActivityLog } from '../../activity_log'
import { WithLoading, WithLoadingSpinner } from '../../loadings'

class ProjectPTW extends Component {

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.changeLoadingState())
  }

  render = () => {
    return (
      <React.Fragment>
        <CRow>
          <CCol>
            <ActivityLog projectId={this.props.match.params.id} />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <WithLoadingSpinner loading={this.props.loading}>
              <CEmbed
                ratio="16by9"
              >
                <iframe src={`${window.location.origin}/api/ptw/${this.props.match.params.id}`} />
              </CEmbed>
            </WithLoadingSpinner>
          </CCol>
        </CRow >
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.currentUser.username,
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ProjectPTW))
