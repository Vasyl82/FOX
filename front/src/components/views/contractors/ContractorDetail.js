import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CRow,
  CCol,
} from "@coreui/react";
import { getProfileFetch } from '../../../actions'
import { FoxApiService } from '../../../services'
import { UserDetailCard } from '../../cards'
import { WithLoading, WithLoadingSpinner } from '../../loadings'

const foxApi = new FoxApiService();

class ContractorDetail extends Component {

  state = {
    username: "",
    email: "",
    name: "",
    related_company: "",
    company_phone: "",
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getDetailsOf('contractors', this.props.match.params.id))
      .then((data) => {
        this.setState({ ...data })
      })
      .then(() => this.props.changeLoadingState())

  }
  render = () => {
    const details = this.state;
    ["id", "company", "companies", "role"].forEach(option => {
      delete details[option]
    })
    return (
      <CRow>
        <CCol>
          <WithLoadingSpinner loading={this.props.loading}>
            <UserDetailCard
              userRole="Contractor"
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

export default connect(null, mapDispatchToProps)(WithLoading(ContractorDetail))
