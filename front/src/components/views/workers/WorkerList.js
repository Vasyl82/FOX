import React, { Component } from 'react'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { getProfileFetch, getWorkerList, setProjectId, clearList } from '../../../actions'
import { connect } from 'react-redux'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

class WorkerList extends Component {

  state = {
    loading: true
  }

  componentDidMount = async () => {
    this.props.setProjectId(this.props.match.params.id)
    await this.props.getProfileFetch()
      .then(() => this.props.getWorkerList(this.props.role, this.abortController.signal))
      .then(() => this.setState({ loading: false }))
  }

  abortController = new window.AbortController();

  componentWillUnmount = () => {
    this.abortController.abort()
    this.props.clearList()
  }

  render = () => {
    return (
      this.props.role == 'Contr' ?
        <FoxTableWithDeleteOption
          {...this.props}
          tableName='Workers'
          fields={this.props.workerTable.fields}
          getBadge={getBadge}
          tableData={this.props.workerTable.tableData}
          updateList={this.props.getWorkerList}
          loading={this.state.loading}
          showNewButton
        />
        :
        <FoxEntityListTable
          {...this.props}
          updateList={this.props.getWorkerList}
          tableName='Workers'
          fields={this.props.workerTable.fields}
          getBadge={getBadge}
          tableData={this.props.workerTable.tableData}
          loading={this.state.loading}
        />
    )
  }

}

const mapStateToProps = state => {
  return {
    workerTable: state.entityListTable,
    role: state.currentUser.role
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getWorkerList: (role) => dispatch(getWorkerList(role)),
  setProjectId: () => dispatch(setProjectId()),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerList)
