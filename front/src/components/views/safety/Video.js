import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getProfileFetch } from '../../../actions'
import {
  CRow,
  CCol,
  CEmbed,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardHeader
} from "@coreui/react";
import { FoxApiService } from '../../../services';
import { WithLoading, WithLoadingSpinner } from '../../loadings'

const foxApi = new FoxApiService();


class SafetyVideo extends Component {

  state = {
    name: "",
    file: "",
    personal_declaration_template: "",
    safety_quiz_template: "",
    safety_video_url: "",
  }

  downloadFile = async (e) => {
    this.setState({
      filename: e.target.value,
      doc_type: e.target.name
    }
      , () => {
        foxApi.downloadSafetyTemplate(this.state.doc_type)
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
          .then(() => { console.log('file downloaded') })
          .catch((error) => {
            console.error('File download failed!');
            console.error(error)
          })
      }
    )
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getCompanySafetyInfo(this.props.company))
      .then((data) => {
        this.setState({ ...data })
      })
      .then(() => this.props.changeLoadingState())
  }

  render = () => {
    const { personal_declaration_template, safety_quiz_template, safety_video_url } = this.state
    return (
      this.props.username ?
        <CCard>
          <CCardHeader>
            <CCardTitle>
              Safety info
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <WithLoadingSpinner loading={this.props.loading}>
              <CRow>
                <CCol >
                  {personal_declaration_template ?
                    <CButton
                      shape="pill"
                      className='mr-3 mb-3'
                      variant="outline"
                      color="info"
                      id={personal_declaration_template}
                      name="personal_declaration_template"
                      value={personal_declaration_template}
                      onClick={this.downloadFile}
                    >Personal Declaration</CButton>
                    :
                    <p>The company hasn't added personal declaration template yet.</p>
                  }
                  {safety_quiz_template ?

                    <CButton
                      shape="pill"
                      className='mr-3 mb-3'
                      variant="outline"
                      color="info"
                      id={safety_quiz_template}
                      name="safety_quiz_template"
                      value={safety_quiz_template}
                      onClick={this.downloadFile}
                    >Safety Quiz</CButton>
                    : <p>The company hasn't added safety quiz template yet.</p>}
                </CCol>
              </CRow>
              <CRow alignHorizontal="center">
                <CCol md="9">
                  <CEmbed
                    ratio="16by9"
                  >
                    <iframe src={safety_video_url}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>
                  </CEmbed>
                </CCol>
              </CRow >
            </WithLoadingSpinner>
          </CCardBody>
        </CCard>
        : <Redirect to="" />
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.currentUser.username,
    company: state.currentUser.company
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(SafetyVideo))
