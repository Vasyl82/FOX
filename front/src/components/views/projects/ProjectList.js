import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { clearList, getProfileFetch, getProjectList, setProjectId } from '../../../actions'
import { WithLoading } from '../../loadings'

const getBadge = status => {
  switch (status) {
    case 'Created': return 'secondary'
    case 'Submitted': return 'warning'
    case 'Approved': return 'success'
    case 'Rejected': return 'danger'
    case 'Application processing': return 'secondary'
    case 'Ready to start': return 'success'
    case 'Works started': return 'info'
    case 'Works finished': return 'warning'
    case 'Extended': return 'primary'
    case 'Closed': return 'dark'
    default: return 'primary'
  }
}


class ProjectList extends Component {

  componentDidMount = async () => {
    this.props.setProjectId(this.props.match.params.id)
    await this.props.getProfileFetch()
      .then(() => this.props.getProjectList({ role: this.props.role, signal: this.abortController.signal }))
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
  }

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
  }

  abortController = new window.AbortController();

  render = () => {
    return (
      this.props.role == 'CliAdm' ?
        <FoxTableWithDeleteOption
          {...this.props}
          tableName='Projects'
          fields={this.props.projectTable.fields}
          getBadge={getBadge}
          tableData={this.props.projectTable.tableData}
          updateList={async ({ ...kwargs }) => await this.props.getProjectList({
            signal: this.abortController.signal,
            ...kwargs
          })}
          loading={this.props.loading}
          showNewButton={true}
        /> :
        <FoxEntityListTable
          {...this.props}
          tableName='Projects'
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
    projectTable: state.entityListTable,
    role: state.currentUser.role
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getProjectList: async ({ ...kwargs }) => await dispatch(getProjectList({ ...kwargs })),
  setProjectId: () => dispatch(setProjectId()),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ProjectList))
