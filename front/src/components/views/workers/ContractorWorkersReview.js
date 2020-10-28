import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileFetch, getWorkerList, clearList } from '../../../actions'
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse
} from "@coreui/react";
import { WorkerReview } from '../../../utils'
import { WithLoading, WithLoadingSpinner } from '../../loadings'

class ContractorWorkersReview extends Component {

  state = {
    current_worker_id: "",
    current_worker_info: ""
  }


  handleWorkerSelect = event => {
    this.state.current_worker_id === event.target.name ?
      this.setState({
        current_worker_id: ""
      })
      :
      this.setState({
        current_worker_id: event.target.name
      })
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.getWorkerList({ params: { contractor_id: this.props.match.params.id }, additional: false, signal: this.abortController.signal }))
      .then(() => this.props.changeLoadingState())
  }

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
  }

  abortController = new window.AbortController();

  render = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Workers</strong>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                {this.props.workers ?
                  this.props.workers.map((worker, idx) => {
                    return (
                      <CCard key={`card-${idx}`} className="mb-0">
                        <CCardHeader key={`ch-${idx}`} id={worker.id}>
                          <h5 key={`h5-${idx}`} className="m-0 p-0">{worker.name}</h5>
                          <h6 key={`h6-${idx}`} className="m-0 p-0">{worker.position_in_company}</h6>
                          <CButton
                            key={`btn-${idx}`}
                            block
                            color="link"
                            className="text-left m-0 p-0"
                            id={worker.id}
                            value={worker.id}
                            name={worker.id}
                            onClick={this.handleWorkerSelect}
                          >Display Details</CButton>
                        </CCardHeader>
                        <CCollapse key={`clps-${idx}`} show={this.state.current_worker_id === worker.id.toString()}>
                          <CCardBody key={`cbody-${idx}`}>
                            <WorkerReview workerId={worker.id} />
                          </CCardBody>
                        </CCollapse>
                      </CCard>
                    )
                  })
                  :
                  <strong>The contractor hasn't attached any workers yet.</strong>
                }
              </WithLoadingSpinner>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

const mapStateToProps = state => {
  return {
    workers: state.entityListTable.tableData
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getWorkerList: ({ ...params }) => dispatch(getWorkerList({ ...params })),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ContractorWorkersReview))