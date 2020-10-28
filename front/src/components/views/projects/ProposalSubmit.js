import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CListGroup,
  CListGroupItem,
  CCardHeader
} from "@coreui/react";
import { getProfileFetch, setProjectId } from '../../../actions'
import { ProjectWorkflowService, FoxApiService } from '../../../services'
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from '../../loadings'

const workflow = new ProjectWorkflowService();
const foxApi = new FoxApiService();

class ProposalSubmit extends Component {

  state = {
    status: "",
    error: ""
  }

  handleSubmit = async () => {
    this.props.changeSubmitState()
    await workflow.submitProposal(this.props.match.params.id)
      .then(() => Promise.resolve(this.props.history.goBack())
      )
      .catch((error) => {
        console.error(error);
        this.setState({
          error: 'Proposal submit failed!' +
            ' Please check your input and try again!' +
            ' In case this problem repeats, please contact your administrator!'
        })
      })
      .finally(() => this.props.changeSubmitState())
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getDetailsOf('projects', this.props.match.params.id))
      .then(data => {
        this.setState({
          status: data.status
        })
      })
      .then(() => this.props.setProjectId(this.props.match.params.id))
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
  }

  componentWillUnmount = () => {
    this.props.setProjectId("")
  }

  render = () => {
    return (
      <WithLoadingSpinner loading={this.props.loading}>
        {['Created', 'Rejected'].includes(this.state.status)
          ?
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <strong>Rules and Regulations to Comply</strong>
                </CCardHeader>
                <CCardBody>
                  <CListGroup>
                    <CListGroupItem>
                      The person in charge/contractor’s supervisor will be wholly responsible and accountable for
                      the behavior and safety of his worker and implement all safety measures.
                  </CListGroupItem>
                    <CListGroupItem>
                      By acknowledging this he/she shall be responsible for any incident or accident
                      and hereby agreed upon all of the above terms and conditions. The University
                      shall have the authority to stop work immediately if the regulations are not met.
                  </CListGroupItem>
                    <CListGroupItem>
                      Please attach this permit with a list of workers’ name & identification number
                      (IC/work permit/passport) as well as risk assessment, method statement,
                      HIRAC or any other relevant document as requested by the university.
                  </CListGroupItem>
                    <CListGroupItem>
                      Contractor shall not plug in any gadget or laptop to the university’s
                      network or power point unless permitted.
                  </CListGroupItem>
                    <CListGroupItem>
                      Contractor's PIC must give instructions to workers and be present
                      at site at all time to supervise the work.
                  </CListGroupItem>
                    <CListGroupItem>
                      Contractor must wear employee pass and suitable PPE at all time whenever they are at site.
                  </CListGroupItem>
                    <CListGroupItem>
                      Work on weekend or public holidays will need approval from the authorizing person
                      from the Client’s department.
                  </CListGroupItem>
                    <CListGroupItem>
                      30km/h speed limits for vehicle should apply and priority to pedestrian.
                  </CListGroupItem>
                    <CListGroupItem>
                      Contractor is forbidden to enter areas in which not stated in the permit.
                  </CListGroupItem>
                    <CListGroupItem>
                      Any usage of fire extinguishing equipment must be report to the university immediately.
                  </CListGroupItem>
                    <CListGroupItem>
                      Any damages done to the university’s property shall be reported immediately and if in
                      any case damages not reported, additional penalty will be imposed to the contractor on top of the rectification cost.
                  </CListGroupItem>
                    <CListGroupItem>
                      Contractor should not store any equipment, machinery or tools within the university’s premises.
                      If there is a need, contractor must clarify and liaise with Head of Engineering Services for temporary storage.
                  </CListGroupItem>
                    <CListGroupItem>
                      Smoking is prohibited unless at the designated area.
                  </CListGroupItem>
                    <CListGroupItem>
                      The workplace must be kept clean and tidy after the work completed or stopped and needs to resume the next day
                  </CListGroupItem>
                    <CListGroupItem>
                      Malaysia’s OSHA 1994 of safety regulation for hot work, working at height,
                      excavation and lock-out, LOTO and confined spaces shall apply.
                  </CListGroupItem>
                    <CListGroupItem>
                      Work must be stopped at 5.30 pm unless permitted by the university. Doors must be locked and lights turned off.
                  </CListGroupItem>
                    <CListGroupItem>
                      All vehicle should park at the designated parking area.
                  </CListGroupItem>
                    <CListGroupItem>
                      The validity of each permit is 7 days from the date of issuance.
                  </CListGroupItem>
                    <CListGroupItem>
                      The university will not be liable for any accident occurred at site after issuing this permit.
                  </CListGroupItem>
                    <CListGroupItem>
                      The permit to work should be submitted 3 working days prior commencement of work.
                  </CListGroupItem>
                  </CListGroup>
                </CCardBody>
              </CCard>
              <CCard>
                <CCardBody>
                  I certify that I understand and will comply with all the requirement of this
                  application to work and strictly comply with the company’s rules and regulation
              as well as Malaysia’s OSHA Act 1994. Intolerable risk subjected to <strong>any violation
              of this application’s requirement may cause work process being stopped</strong>.
            </CCardBody>
                <CCardFooter>
                  <CButton
                    shape="pill"
                    type="submit"
                    color="dark"
                    variant="outline"
                    block
                    onClick={this.handleSubmit}
                  ><SubmitSpinner submitting={this.props.submitting} /> Submit Proposal</CButton>
                  {this.state.error
                    ? <p>{this.state.error}</p>
                    : null
                  }
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow >
          : <Redirect to={`/projects/${this.props.match.params.id}`} />
        }
      </WithLoadingSpinner>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: async () => await dispatch(getProfileFetch()),
  setProjectId: (id) => dispatch(setProjectId(id))
})

export default connect(null, mapDispatchToProps)(WithLoading(ProposalSubmit))
