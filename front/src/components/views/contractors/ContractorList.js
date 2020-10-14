import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { getProfileFetch, getContractorList, clearList } from '../../../actions'
import { WithLoading } from '../../loadings'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

class ContractorList extends Component {

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.getContractorList({ role: this.props.role, signal: this.abortController.signal }))
      .then(() => this.props.changeLoadingState())
  }

  abortController = new window.AbortController();

  componentWillUnmount = () => {
    this.abortController.abort()
    this.props.clearList()
  }

  render = () => {
    return (
      this.props.role == 'CliAdm' ?
        <FoxTableWithDeleteOption
          {...this.props}
          tableName='Contractors'
          fields={this.props.contractorTable.fields}
          getBadge={getBadge}
          tableData={this.props.contractorTable.tableData}
          updateList={this.props.getContractorList}
          loading={this.props.loading}
        />
        :
        <FoxEntityListTable
          {...this.props}
          tableName='Contractors'
          fields={this.props.contractorTable.fields}
          getBadge={getBadge}
          tableData={this.props.contractorTable.tableData}
          loading={this.props.loading}
        />
    )
  }
}

const mapStateToProps = state => {
  return {
    contractorTable: state.entityListTable,
    role: state.currentUser.role
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getContractorList: ({ ...params }) => dispatch(getContractorList({ ...params })),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ContractorList))