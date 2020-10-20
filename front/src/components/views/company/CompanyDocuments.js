import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileFetch } from '../../../actions'
import {
  CForm,
  CFormGroup,
  CRow,
  CCol,
  CLabel,
  CInput,
  CInputFile,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardSubtitle
} from "@coreui/react";
import DjangoCSRFToken from 'django-react-csrftoken'
import { FoxApiService } from '../../../services'

const foxApi = new FoxApiService();

// TO BE DELETED????

class CompanyDocuments extends Component {

  state = {
    safetyVideoURL: "",
    personalDeclarationURL: "",
    personalDeclarationFile: "",
    company: this.props.company
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFileUpload = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  }

  downloadFile = async () => {
    await foxApi.downloadDocument(this.props.match.params.doc_id)
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
      })
  }

  componentDidMount = () => {
    this.props.getProfileFetch()
  }

  render = () => {
    return (
      <CRow>
        <CCol>
          <CForm onSubmit={this.handleSubmit} >
            <DjangoCSRFToken />
            <CFormGroup>
              <CLabel htmlFor="safetyVideoURL">Safety Video URL:</CLabel>
              <CInput
                id="safetyVideoURL"
                name="safetyVideoURL"
                placeholder="URL"
                value={this.state.safetyVideoURL}
                onChange={this.handleChange}
                required />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="personalDeclarationURL">Personal Declaration:</CLabel>
              <CButton
                variant="outline"
                color="success"
                onClick={this.downloadFile}
              >
                Download
                  </CButton>
              <CInputFile id="personalDeclarationFile" name="personalDeclarationFile" onChange={this.handleFileUpload} />
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow >
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.currentUser.username,
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDocuments)
