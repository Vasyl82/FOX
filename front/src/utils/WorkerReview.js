import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import {
  CButton,
  CListGroup,
  CListGroupItem,
  CSpinner
} from "@coreui/react";

import { FoxApiService } from '../services'
import { getProfileFetch } from '../actions'
import SpecialCompetencyReviewList from './SpecialCompetencyReviewList'

const foxApi = new FoxApiService();

class WorkerReview extends Component {

  state = {
    name: "",
    contractor: this.props.contractor,
    birthday: "",
    card_number_id: "",
    license_number: "",
    license_scan: "",
    passport: "",
    passport_scan: "",
    safety_green_card: "",
    safety_green_card_scan: "",
    position_in_company: "",
    safety_quiz_answer: "",
    personal_declaration: "",
    special_competency: "",
    special_competency_scan: "",
    registration_number: "",
    filename: "",
    doc_type: "",
  }

  downloadFile = async (e) => {
    this.setState({
      filename: e.target.value,
      doc_type: e.target.name
    }
      , () => {
        foxApi.downloadWorkerDocument(this.props.workerId, this.state.doc_type)
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            const filename = this.state.filename.split('/').pop();
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((error) => {
            console.error('File download failed!');
            console.error(error)
          })
      }
    )
  }

  componentDidMount = async () => {
    await foxApi.getDetailsOf('workers', this.props.workerId)
      .then((data) => this.setState(
        { ...data }))
      .catch(error => console.log(error))
  }

  render = () => {
    return (
      <CListGroup flush>
        <CListGroupItem>
          <p><strong>Birthday: </strong>{this.state.birthday}</p>
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>Card number ID: </strong>{this.state.card_number_id}</p>
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>License Number: </strong>{this.state.license_number}</p>
          <CButton
            variant="outline"
            color="success"
            id="license_scan"
            name="license_scan"
            value={this.state.license_scan}
            onClick={this.downloadFile}
          >Download</CButton>
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>Passport: </strong>{this.state.passport}</p>
          <CButton
            variant="outline"
            color="success"
            id="passport_scan"
            name="passport_scan"
            value={this.state.passport_scan}
            onClick={this.downloadFile}
          >Download</CButton>
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>Safety Green Card: </strong>{this.state.safety_green_card}</p>
          <CButton
            variant="outline"
            color="success"
            id="safety_green_card_scan"
            name="safety_green_card_scan"
            value={this.state.safety_green_card_scan}
            onClick={this.downloadFile}
          >Download</CButton>
        </CListGroupItem>
        <CListGroupItem>
          <SpecialCompetencyReviewList workerId={this.props.workerId} />
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>Registration number: </strong>{this.state.registration_number}</p>
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>Position in Company: </strong>{this.state.position_in_company}</p>
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>Safety quiz answer: </strong></p>
          <CButton
            variant="outline"
            color="success"
            id="safety_quiz_answer"
            name="safety_quiz_answer"
            value={this.state.safety_quiz_answer}
            onClick={this.downloadFile}
          >Download</CButton>
        </CListGroupItem>
        <CListGroupItem>
          <p><strong>Personal declaration: </strong></p>
          <CButton
            variant="outline"
            color="success"
            id="personal_declaration"
            name="personal_declaration"
            value={this.state.personal_declaration}
            onClick={this.downloadFile}
          >Download</CButton>
        </CListGroupItem>
      </CListGroup>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(null, mapDispatchToProps)(WorkerReview)

