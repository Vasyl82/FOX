import React, { Component } from 'react'
import { connect } from 'react-redux'
import FoxEntityListTable from '../../tables/FoxEntityListTable'
import { getProfileFetch, getApprovalList, clearList } from '../../../actions'
import { WithLoading } from '../../loadings'

const getBadge = status => {
  switch (status) {
    case 'Pending': return 'primary'
    case 'Approved': return 'success'
    case 'Rejected': return 'danger'
    default: return 'primary'
  }
}

class ApprovalList extends Component {

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.getApprovalList({ signal: this.abortController.signal }))
      .then(() => this.props.changeLoadingState())
  }

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
  }

  abortController = new window.AbortController();

  render = () => {
    return (
      <FoxEntityListTable
        {...this.props}
        tableName='Approvals'
        fields={this.props.projectTable.fields}
        getBadge={getBadge}
        tableData={this.props.projectTable.tableData}
        loading={this.props.loading}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    projectTable: state.entityListTable
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getApprovalList: ({ ...kwargs }) => dispatch(getApprovalList({ ...kwargs })),
  setApprovalId: () => dispatch(setApprovalId()),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ApprovalList))
