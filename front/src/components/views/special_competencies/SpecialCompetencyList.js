import React, { Component } from 'react'
import { FoxEntityListTable, FoxTableWithDeleteOption } from '../../tables'
import { getProfileFetch, getSpecialCompetencyList, clearList } from '../../../actions'
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


class SpecialCompetencyList extends Component {

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() =>
        this.props.getSpecialCompetencyList({
          worker_id: this.props.match.params.id
        }, this.props.role, this.abortController.signal))
      .then(() => this.props.changeLoadingState())
      .catch(error => {
        console.log(error);
        return this.props.changeLoadingState()
      })
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
          tableName='Worker Special Competencies'
          fields={this.props.specialCompetencyListTable.fields}
          getBadge={getBadge}
          tableData={this.props.specialCompetencyListTable.tableData}
          updateList={this.props.getSpecialCompetencyList}
          loading={this.props.loading}
          showNewButton={true}
        />
        :
        <FoxEntityListTable
          {...this.props}
          tableName='Worker Special Competencies'
          fields={this.props.specialCompetencyListTable.fields}
          getBadge={getBadge}
          tableData={this.props.specialCompetencyListTable.tableData}
          loading={this.props.loading}
        />
    )
  }

}

const mapStateToProps = state => {
  return {
    specialCompetencyListTable: state.entityListTable,
    role: state.currentUser.role
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getSpecialCompetencyList: (params, role) => dispatch(getSpecialCompetencyList(params, role)),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(SpecialCompetencyList))