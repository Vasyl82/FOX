import React, { Component } from 'react'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { getProfileFetch, getDocumentList, clearList } from '../../../actions'
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

class DocumentList extends Component {

  state = {
    loading: true
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => {
        this.props.getDocumentList({
          project_id: this.props.match.params.id,
        }, false, this.props.role, this.abortController.signal);
      })
      .then(() => this.setState({
        loading: false
      }))
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
          tableName='Documents'
          fields={this.props.documentListTable.fields}
          getBadge={getBadge}
          tableData={this.props.documentListTable.tableData}
          updateList={this.props.getDocumentList}
          loading={this.state.loading}
        />
        :
        <FoxEntityListTable
          {...this.props}
          tableName='Documents'
          fields={this.props.documentListTable.fields}
          getBadge={getBadge}
          tableData={this.props.documentListTable.tableData}
          loading={this.state.loading}
        />
    )
  }

}

const mapStateToProps = state => {
  return {
    documentListTable: state.entityListTable,
    role: state.currentUser.role
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getDocumentList: (params, additional, role) => dispatch(getDocumentList(params, additional, role)),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList)