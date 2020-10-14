import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { getProfileFetch, getClientManagerList, clearList } from '../../../actions'
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


class ClientManagerList extends Component {

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.getClientManagerList(this.props.role, this.abortController.signal))
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
          tableName='Managers'
          fields={this.props.clientManagerTable.fields}
          getBadge={getBadge}
          tableData={this.props.clientManagerTable.tableData}
          updateList={this.props.getClientManagerList}
          loading={this.props.loading}
        />
        :
        <FoxEntityListTable
          {...this.props}
          updateList={this.props.getClientManagerList}
          tableName='Managers'
          fields={this.props.clientManagerTable.fields}
          getBadge={getBadge}
          tableData={this.props.clientManagerTable.tableData}
          loading={this.props.loading}
        />

    )
  }

}

const mapStateToProps = state => {
  return {
    clientManagerTable: state.entityListTable,
    role: state.currentUser.role
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getClientManagerList: (role) => dispatch(getClientManagerList(role)),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ClientManagerList))