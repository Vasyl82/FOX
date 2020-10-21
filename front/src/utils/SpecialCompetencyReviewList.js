import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileFetch, clearList } from '../actions'
import {
  CButton,
  CCollapse,
  CListGroup
} from "@coreui/react";
import CompetencyReview from './CompetencyReview'
import { FoxApiService } from '../services'
import { WithLoading, WithLoadingSpinner } from '../components/loadings'

const foxApi = new FoxApiService();


class SpecialCompetencyReviewList extends Component {

  state = {
    showCompetencies: false,
    competencies: []
  }


  handleShowCompetencies = () => {
    const prevShow = this.state.showCompetencies
    this.setState({
      showCompetencies: !prevShow
    })
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getEntityList('worker_special_competencies', { worker_id: this.props.workerId }, this.abortController.signal))
      .then((data) => {
        this.setState({
          competencies: data
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(this.props.changeLoadingState)
  }

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
  }

  abortController = new window.AbortController();

  render = () => {
    const { showCompetencies, competencies } = this.state
    return (
      <WithLoadingSpinner loading={this.props.loading}>
        {this.state.competencies.length > 0 ?
          <React.Fragment>
            <p><strong>Special competencies:</strong></p>
            <CButton
              block
              color="link"
              className="text-left m-0 p-0"
              name={showCompetencies}
              onClick={this.handleShowCompetencies}
            >Display Details</CButton>
            <CCollapse show={showCompetencies}>
              <CListGroup >
                {competencies.map((competency, idx) => {
                  return (
                    <CompetencyReview key={`cbody-${idx}`} competencyId={competency.id} />
                  )
                })}
              </CListGroup>
            </CCollapse>
          </React.Fragment>
          :
          <p>The contractor hasn't attached any competencies yet.</p>}
      </WithLoadingSpinner>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  clearList: () => dispatch(clearList())
})

export default connect(null, mapDispatchToProps)(WithLoading(SpecialCompetencyReviewList))
