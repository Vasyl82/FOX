import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CRow,
  CCol,
} from "@coreui/react";
import { FoxApiService } from '../../../services'
import { getProfileFetch } from '../../../actions'
import { UserDetailCard } from '../../cards'
import { WithLoading, WithLoadingSpinner } from '../../loadings'

const foxApi = new FoxApiService();

const positions = {
  SafeMan: "Safety Manager",
  SecMan: "Security Manager",
  SecOff: "Security Officer",
  SiteOwn: "Site Owner",
  WorkOwn: "Owner of Work",
  SecGrd: "Security Guards"
}


class ClientManagerDetail extends Component {

  state = {
    username: "",
    name: "",
    email: "",
    position: "",
    company: this.props.company,
    role: "CliMan",
    department: "",
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getDetailsOf('managers', this.props.match.params.id))
      .then((data) => {
        data.position = positions[data.position]
        this.setState({ ...data })
      })
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
  }
  render = () => {
    const details = this.state;
    ["id", "company", "role"].forEach(option => {
      delete details[option]
    })
    return (
      <CRow>
        <CCol>
          <WithLoadingSpinner loading={this.props.loading}>
            <UserDetailCard
              userRole="Manager"
              details={details}
              {...this.props}
            />
          </WithLoadingSpinner>
        </CCol>
      </CRow >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(null, mapDispatchToProps)(WithLoading(ClientManagerDetail))
