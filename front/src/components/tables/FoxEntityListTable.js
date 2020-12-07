import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CDataTable,
  CRow,
  CLink,
} from '@coreui/react'
import WorkStatusDropdown from './WorkStatusDropdown'

class FoxEntityListTable extends Component {

  alertOnClick = (id, e) => {
    this.props.history.push(`${this.props.match.url}/${id}`)
  }

  render = () => {
    const linkName = this.props.fields ? this.props.fields[0] : "username"
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader
              className="d-flex justify-content-between">
              <CCardTitle>
                {this.props.tableName}
              </CCardTitle>
              {this.props.showNewButton ?
                <CLink
                  className="btn btn-pill btn-outline-success"
                  to={`${this.props.match.url}/new`}
                >
                  Add new
          </CLink>
                : null
              }
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={this.props.tableData ? this.props.tableData : []}
                fields={this.props.fields ? this.props.fields : []}
                loading={this.props.loading}
                clickableRows
                hover
                striped
                bordered
                sorter
                tableFilter={{ placeholder: "Search..." }}
                columnFilter
                size="sm"
                itemsPerPage={10}
                itemsPerPageSelect
                pagination
                scopedSlots={{
                  [linkName]:
                    (item) => (
                      <td>
                        <CLink
                          to={`${this.props.match.url}/${item.id}`}
                        >
                          {item[linkName]}
                        </CLink>
                      </td>
                    ),
                  'application_status':
                    (item) => (
                      <td>
                        <CBadge shape="pill" color={this.props.getBadge(item.application_status)}>
                          {item.application_status}
                        </CBadge>
                      </td>
                    ),
                  'project_status':
                    (item) => (
                      <td className="d-flex align-items-center">
                        <CBadge shape="pill" color={this.props.getBadge(item.project_status)}>
                          {item.project_status}
                        </CBadge>
                        <WorkStatusDropdown key={item.id} item={item} {...this.props} />
                      </td>
                    )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    )
  }
}

const mapStateToProps = state => ({
  role: state.currentUser.role
})

export default connect(mapStateToProps, null)(FoxEntityListTable)
