import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import {
  CButton,
  CListGroupItem,
} from "@coreui/react";
import { FoxApiService } from '../services'
import { getProfileFetch } from '../actions'
import { WithLoading, WithLoadingSpinner } from '../components/loadings'

const foxApi = new FoxApiService();

class CompetencyReview extends Component {

  state = {
    name: "",
    file: "",
    issued_by: "",
  }

  downloadFile = async () => {
    foxApi.downloadWorkerCompetency(this.props.competencyId)
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        const filename = this.state.file.split('/').pop();
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error('File download failed!');
        console.error(error)
      }
      )
  }

  componentDidMount = async () => {
    await foxApi.getDetailsOf('worker_special_competencies', this.props.competencyId)
      .then((data) => this.setState(
        { ...data }))
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
  }

  render = () => {
    const { name, issued_by } = this.state
    return (
      <WithLoadingSpinner loading={this.props.loading}>
        <CListGroupItem>
          <div>
            <p><strong>Competency name: </strong>{name}</p>
            <CButton
              variant="outline"
              color="success"
              id="file"
              onClick={this.downloadFile}
            >Download scan</CButton>
          </div>
          {/* <p><strong>Competency scan: </strong></p> */}
          <p><strong>Issued_by: </strong>{issued_by}</p>
        </CListGroupItem>
      </WithLoadingSpinner>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(null, mapDispatchToProps)(WithLoading(CompetencyReview))

