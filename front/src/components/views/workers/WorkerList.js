import React, { Component } from 'react'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { getProfileFetch, getWorkerList, setProjectId, clearList } from '../../../actions'
import { connect } from 'react-redux'
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

class WorkerList extends Component {

  state = {
    loading: true
  }

  componentDidMount = async () => {
    this.props.setProjectId(this.props.match.params.id)
    await this.props.getProfileFetch()
      .then(() => this.props.getWorkerList({ role: this.props.role, signal: this.abortController.signal }))
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
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
          loading={this.props.loading}
          showNewButton={true}
        />
        :
        <FoxEntityListTable
          {...this.props}
          updateList={this.props.getWorkerList}
          tableName='Workers'
          fields={this.props.workerTable.fields}
          getBadge={getBadge}
          tableData={this.props.workerTable.tableData}
          loading={this.props.loading}
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
  getWorkerList: ({ ...kwargs }) => dispatch(getWorkerList({ ...kwargs })),
  setProjectId: () => dispatch(setProjectId()),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(WorkerList))
