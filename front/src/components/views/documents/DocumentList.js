import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { getProfileFetch, getDocumentList, clearList } from '../../../actions'
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

class DocumentList extends Component {

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() =>
        this.props.getDocumentList({
          params: {
            project_id: this.props.match.params.id,
          },
          additional: false,
          role: this.props.role,
          signal: this.abortController.signal
        }))
      .catch(error => {
        console.log(error);
      })
      .finally(() => this.props.changeLoadingState())
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
          loading={this.props.loading}
          showNewButton={true}
        />
        :
        <FoxEntityListTable
          {...this.props}
          tableName='Documents'
          fields={this.props.documentListTable.fields}
          getBadge={getBadge}
          tableData={this.props.documentListTable.tableData}
          loading={this.props.loading}
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
  getDocumentList: ({ ...kwargs }) => dispatch(getDocumentList({ ...kwargs })),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(DocumentList))